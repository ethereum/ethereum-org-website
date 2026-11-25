---
title: Portal Network
description: "Una descripción general de Portal Network, una red entre pares que mantiene disponible el historial de Ethereum a medida que los clientes dejan de almacenarlo por completo."
lang: es
---

[Ethereum](/) es una red compuesta por computadoras que ejecutan el software de cliente de Ethereum. Cada una de estas computadoras se denomina "nodo". El software de cliente permite a un nodo enviar y recibir datos en la red Ethereum, y verifica los datos según las reglas del protocolo de Ethereum. Los nodos guardan una gran cantidad de datos históricos en su almacenamiento en disco y los amplían cuando reciben nuevos paquetes de información, conocidos como bloques, de otros nodos de la red. Esto es necesario para comprobar siempre que un nodo tiene información coherente con el resto de la red. Esto significa que ejecutar un nodo puede requerir mucho espacio en disco. Algunas operaciones de los nodos también pueden requerir mucha memoria RAM.

Los clientes de ejecución ya no tienen que conservar todos esos datos. Desde julio de 2025, pueden descartar los cuerpos y recibos de los bloques anteriores a [La Fusión](/roadmap/merge/), y la hoja de ruta de Ethereum incluye descartar más historial de la cadena con el tiempo. Ese historial aún debe permanecer disponible para cualquiera que lo necesite, como exploradores de bloques, indexadores o una billetera que busque una transacción antigua.

Portal Network mantiene este historial disponible compartiéndolo en pequeños fragmentos a través de muchos nodos. Ningún nodo tiene que almacenarlo todo, y un nodo puede obtener cualquier fragmento y verificarlo con los datos que ya posee, sin confiar en el nodo que lo envió.

Más sobre [nodos y clientes](/developers/docs/nodes-and-clients/)

## ¿Por qué necesitamos Portal Network? {#why-do-we-need-portal-network}

Los nodos de Ethereum almacenan su propia copia total o parcial de la cadena de bloques de Ethereum. Esta copia local se utiliza para validar transacciones y garantizar que el nodo siga la cadena correcta. Estos datos almacenados localmente permiten a los nodos verificar de forma independiente que los datos entrantes sean válidos y correctos sin necesidad de confiar en ninguna otra entidad.

Esta copia local de la cadena de bloques y los datos de estado y recibos asociados ocupan mucho espacio en el disco duro del nodo. Por ejemplo, se recomienda un SSD de 4 TB para ejecutar un nodo usando [Geth](https://geth.ethereum.org) emparejado con un cliente de consenso. Con el historial completo de la cadena, Geth ocupa más de 1,8 TB de espacio en disco (a partir de septiembre de 2026), y eso sigue creciendo con la cadena.

Esto significa que ejecutar nodos puede ser costoso, porque se debe dedicar una gran cantidad de espacio en disco a Ethereum. La [expiración del historial](/roadmap/statelessness/#history-expiry) lo reduce al permitir que los clientes eliminen datos de bloques antiguos que no necesitan para seguir la cadena: desde la [expiración parcial del historial](https://blog.ethereum.org/2025/07/08/partial-history-exp) en julio de 2025, los clientes de ejecución pueden descartar los cuerpos y recibos de cada bloque anterior a La Fusión. La [caducidad del estado](/roadmap/statelessness/#state-expiry) y la [ausencia de estado](/roadmap/statelessness/) son otras soluciones que aún se están investigando.

Una vez que los nodos dejan de almacenar el historial antiguo, ya no pueden proporcionarlo a otros. Los archivos, torrents y proveedores guardan copias de él; Portal Network lo distribuye a través de muchos nodos, por lo que permanece disponible sin depender de ninguno de ellos.

## ¿Cómo funciona Portal Network? {#how-does-portal-network-work}

Los nodos de Ethereum tienen protocolos estrictos que definen cómo se comunican entre sí. Los clientes de ejecución se comunican utilizando un conjunto de subprotocolos conocidos como [devp2p](/developers/docs/networking-layer/#devp2p), mientras que los clientes de consenso utilizan una pila diferente de subprotocolos llamada [libp2p](/developers/docs/networking-layer/#libp2p). devp2p permite a un nodo solicitar cuerpos de bloques y recibos a sus pares, pero un par que ha descartado el historial antiguo no puede proporcionarlo. Las aplicaciones y billeteras también pueden obtener datos de un nodo a través de la [interfaz de programación de aplicaciones (API) JSON-RPC](/developers/docs/apis/json-rpc/), pero eso depende de que un nodo o proveedor almacene los datos y de confiar en que sea honesto.

Portal Network es una red entre pares separada construida para compartir el historial. Se ejecuta en [discv5](https://github.com/ethereum/devp2p/blob/master/discv5/discv5.md), el protocolo de descubrimiento de nodos que los clientes de consenso también utilizan para encontrar pares, y organiza sus nodos como una [tabla hash distribuida (DHT)](https://en.wikipedia.org/wiki/Distributed_hash_table), similar a la de BitTorrent. Cada nodo tiene un ID de nodo, y cada fragmento de contenido, como los recibos de un bloque, tiene un ID de contenido en el mismo espacio de ID, derivado de su número de bloque. Cada nodo almacena el contenido cuyos ID son más cercanos a su propio ID, hasta una distancia que elige, llamada su radio. Para obtener un fragmento de contenido, un nodo pregunta a los pares que conoce que están más cerca del ID del contenido. Los pares que no lo tienen responden con nodos que están aún más cerca, hasta que la solicitud llega a un nodo que lo almacena.

<PortalHistoryDiagram />

Un nodo nunca tiene que confiar en los datos que recibe. Conserva cada encabezado del bloque, y cada encabezado se compromete con las transacciones y recibos de su bloque a través de raíces como `transactionsRoot` y `receiptsRoot`. El nodo verifica el cuerpo de un bloque o los recibos de un bloque contra esas raíces antes de usarlos.

### Las redes de Portal Network {#the-portal-networks}

Portal Network se diseñó inicialmente como varias subredes que permitirían a los clientes ligeros seguir la cadena sin confiar en un nodo completo: una red de clientes ligeros de la cadena de balizas, una red de estado, una red de propagación de transacciones y una red de historial. En 2025, las especificaciones de todas menos una de ellas se marcaron como obsoletas, y el desarrollo ahora se centra en la **red de historial**, que almacena los cuerpos y recibos de bloques pasados para los clientes de ejecución que conservan cada encabezado del bloque pero han descartado el resto del historial.

## Clientes de Portal Network {#client-diversity-as-default}

Varios equipos desarrollaron clientes de Portal Network:

- [Cliente Portal de Nimbus](https://fluffy.guide) (anteriormente Fluffy): escrito en Nim, y el único que sigue en desarrollo activo
- [Trin](https://github.com/ethereum/trin): escrito en Rust, ya no se mantiene
- [Ultralight](https://github.com/ethereumjs/ultralight): escrito en TypeScript, sin actualizaciones desde mediados de 2025
- [Shisui](https://github.com/zen-eth/shisui): escrito en Go, sin actualizaciones desde mediados de 2025

## Más información {#further-reading}

- [Especificaciones de Portal Network](https://github.com/ethereum/portal-network-specs)
- [Uso del protocolo de Portal Network para la expiración del historial](https://ethresear.ch/t/using-portal-network-protocol-for-history-expiry/22658)
- [Expiración parcial del historial](https://blog.ethereum.org/2025/07/08/partial-history-exp)
- [Portal Network (Piper Merriam en Devcon Bogotá)](https://www.youtube.com/watch?v=0stc9jnQLXA)
- [Discord de Portal Network](https://discord.gg/CFFnmE7Hbs)
- [Sitio web de Portal Network](https://www.ethportal.net/)
