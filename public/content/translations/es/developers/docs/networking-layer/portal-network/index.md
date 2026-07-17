---
title: Portal Network
description: "Una descripción general de Portal Network: una red en desarrollo diseñada para admitir clientes de bajos recursos."
lang: es
---

[Ethereum](/) es una red compuesta por computadoras que ejecutan el software de cliente de Ethereum. Cada una de estas computadoras se denomina «nodo». El software de cliente permite a un nodo enviar y recibir datos en la red Ethereum, y verifica los datos según las reglas del protocolo de Ethereum. Los nodos guardan una gran cantidad de datos históricos en su almacenamiento de disco y los amplían cuando reciben nuevos paquetes de información, conocidos como bloques, de otros nodos de la red. Esto es necesario para comprobar siempre que un nodo tiene información coherente con el resto de la red. Esto significa que ejecutar un nodo puede requerir mucho espacio en disco. Algunas operaciones de los nodos también pueden requerir mucha memoria RAM.

Para solucionar este problema de almacenamiento en disco, se han desarrollado nodos «ligeros» que solicitan información a los nodos completos en lugar de almacenarla toda ellos mismos. Sin embargo, esto significa que el nodo ligero no verifica la información de forma independiente y, en su lugar, confía en otro nodo. También significa que los nodos completos deben asumir trabajo adicional para atender a esos nodos ligeros.

Portal Network es un nuevo diseño de red para Ethereum que tiene como objetivo resolver el problema de disponibilidad de datos para los nodos «ligeros» sin tener que confiar ni ejercer una presión adicional sobre los nodos completos, compartiendo los datos necesarios en pequeños fragmentos a través de la red.

Más sobre [nodos y clientes](/developers/docs/nodes-and-clients/)

## ¿Por qué necesitamos Portal Network? {#why-do-we-need-portal-network}

Los nodos de Ethereum almacenan su propia copia total o parcial de la cadena de bloques de Ethereum. Esta copia local se utiliza para validar transacciones y garantizar que el nodo siga la cadena correcta. Estos datos almacenados localmente permiten a los nodos verificar de forma independiente que los datos entrantes sean válidos y correctos sin necesidad de confiar en ninguna otra entidad.

Esta copia local de la cadena de bloques y los datos de estado y recibos asociados ocupan mucho espacio en el disco duro del nodo. Por ejemplo, se recomienda un disco duro de 2 TB para ejecutar un nodo utilizando [Geth](https://geth.ethereum.org) emparejado con un cliente de consenso. Al usar la sincronización rápida (snap sync), que solo almacena datos de la cadena de un conjunto de bloques relativamente reciente, Geth suele ocupar unos 650 GB de espacio en disco, pero crece a un ritmo de unos 14 GB por semana (se puede podar el nodo para que vuelva a los 650 GB periódicamente).

Esto significa que ejecutar nodos puede ser costoso, ya que se debe dedicar una gran cantidad de espacio en disco a Ethereum. Existen varias soluciones a este problema en la hoja de ruta de Ethereum, que incluyen la [expiración del historial](/roadmap/statelessness/#history-expiry), la [caducidad del estado](/roadmap/statelessness/#state-expiry) y la [ausencia de estado](/roadmap/statelessness/). Sin embargo, es probable que falten varios años para que se implementen. También existen [nodos ligeros](/developers/docs/nodes-and-clients/light-clients/) que no guardan su propia copia de los datos de la cadena, sino que solicitan los datos que necesitan a los nodos completos. Sin embargo, esto significa que los nodos ligeros tienen que confiar en que los nodos completos proporcionen datos honestos y también sobrecarga a los nodos completos que tienen que servir los datos que necesitan los nodos ligeros.

## ¿Cómo funciona Portal Network? {#how-does-portal-network-work}

Los nodos de Ethereum tienen protocolos estrictos que definen cómo se comunican entre sí. Los clientes de ejecución se comunican mediante un conjunto de subprotocolos conocidos como [devp2p](/developers/docs/networking-layer/#devp2p), mientras que los clientes de consenso utilizan una pila diferente de subprotocolos llamada [libp2p](/developers/docs/networking-layer/#libp2p). Estos definen los tipos de datos que se pueden transmitir entre los nodos.

![devP2P and libP2P](portal-network-devp2p-libp2p.png)

Los nodos también pueden servir datos específicos a través de la [API JSON-RPC](/developers/docs/apis/json-rpc/), que es la forma en que las aplicaciones y las billeteras intercambian información con los nodos de Ethereum. Sin embargo, ninguno de estos son protocolos ideales para servir datos a clientes ligeros.

Actualmente, los clientes ligeros no pueden solicitar fragmentos específicos de datos de la cadena a través de devp2p o libp2p porque esos protocolos solo están diseñados para permitir la sincronización de la cadena y la propagación de bloques y transacciones. Los clientes ligeros no quieren descargar esta información porque eso dejaría de hacerlos «ligeros».

La API JSON-RPC tampoco es una opción ideal para las solicitudes de datos de clientes ligeros, porque depende de una conexión a un nodo completo específico o a un proveedor de RPC centralizado que pueda servir los datos. Esto significa que el cliente ligero tiene que confiar en que ese nodo o proveedor específico sea honesto, y además el nodo completo podría tener que manejar muchas solicitudes de muchos clientes ligeros, lo que aumenta sus requisitos de ancho de banda.

El objetivo de Portal Network es repensar todo el diseño, construyendo específicamente para la ligereza, fuera de las limitaciones de diseño de los clientes de Ethereum existentes.

La idea central de Portal Network es tomar las mejores partes de la pila de red actual al permitir que la información que necesitan los clientes ligeros, como los datos históricos y la identidad de la cabecera actual de la cadena, se sirva a través de una red descentralizada entre pares de estilo devp2p ligero utilizando una [DHT](https://en.wikipedia.org/wiki/Distributed_hash_table) (similar a BitTorrent).

La idea es agregar pequeñas partes del total de los datos históricos de Ethereum y algunas responsabilidades específicas de nodo a cada nodo. Luego, las solicitudes se atienden buscando los nodos que almacenan los datos específicos que se solicitaron y recuperándolos de ellos.

Esto invierte el modelo normal de los nodos ligeros que encuentran un solo nodo y le solicitan que filtre y sirva grandes volúmenes de datos; en su lugar, filtran rápidamente una gran red de nodos que manejan cada uno pequeñas cantidades de datos.

El objetivo es permitir que una red descentralizada de clientes ligeros de Portal pueda:

- rastrear la cabecera de la cadena
- sincronizar datos recientes e históricos de la cadena
- recuperar datos de estado
- transmitir transacciones
- ejecutar transacciones utilizando la [EVM](/developers/docs/evm/)

Los beneficios de este diseño de red son:

- Reducir la dependencia de proveedores centralizados
- Reducir el uso de ancho de banda de Internet
- Sincronización minimizada o nula
- Accesible para dispositivos con recursos limitados (\<1 GB de RAM, \<100 MB de espacio en disco, 1 CPU)

La siguiente tabla muestra las funciones de los clientes existentes que pueden ser proporcionadas por Portal Network, lo que permite a los usuarios acceder a estas funciones en dispositivos de muy bajos recursos.

### Las redes de Portal {#the-portal-networks}

| Cliente ligero de Beacon | Red de estado                | Propagación de transacciones  | Red de historial | Índice de transacciones canónicas  |
| ------------------- | ---------------------------- | ------------------- | --------------- | -------------------  |
| Ligero de Beacon chain  | Almacenamiento de cuentas y contratos | Mempool ligero | Encabezados         | TxHash > Hash, Índice |
| Datos del protocolo       |                              |                     | Cuerpos de bloques    |                      |
|                     |                              |                     | Recibos        |                      |

## Diversidad de clientes por defecto {#client-diversity-as-default}

Los desarrolladores de Portal Network también tomaron la decisión de diseño de construir cuatro clientes de Portal Network separados desde el primer día.

Los clientes de Portal Network son:

- [Trin](https://github.com/ethereum/trin): escrito en Rust
- [Fluffy](https://fluffy.guide): escrito en Nim
- [Ultralight](https://github.com/ethereumjs/ultralight): escrito en TypeScript
- [Shisui](https://github.com/zen-eth/shisui): escrito en Go

Tener múltiples implementaciones de clientes independientes mejora la resiliencia y la descentralización de la red Ethereum.

Si un cliente experimenta problemas o vulnerabilidades, otros clientes pueden continuar operando sin problemas, evitando un único punto de falla. Además, las diversas implementaciones de clientes fomentan la innovación y la competencia, impulsando mejoras y reduciendo el riesgo de monocultivo dentro del ecosistema.

## Más información {#further-reading}

- [Portal Network (Piper Merriam en Devcon Bogotá)](https://www.youtube.com/watch?v=0stc9jnQLXA).
- [Discord de Portal Network](https://discord.gg/CFFnmE7Hbs)
- [Sitio web de Portal Network](https://www.ethportal.net/)