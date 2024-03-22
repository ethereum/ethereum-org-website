---
title: Introducción a los nodos de arranque de Ethereum
description: La información básica que necesita para entender los nodos de arranque
lang: es
---

Cuando un nuevo nodo se une a la red Ethereum, este necesita conectarse a nodos que ya están en la red para luego descubrir nuevos pares. Estos puntos de entrada en la red Ethereum se llaman nodos de arranque. Los clientes suelen tener una lista de nodos de arranque codificados en ellos. De estos nodos de arranque se suele encargar el equipo de desarrolladores de Ethereum Foundation o los propios equipos de los clientes. Tenga en cuenta que los nodos de arranque no son los mismos que los nodos estáticos. Los nodos estáticos se solicitan una y otra vez, mientras que los nodos de arranque sólo se solicitan si no hay suficientes pares para conectarse y un nodo necesita para arrancar algunas conexiones nuevas.

## Cómo conectarse a un nodo de arranque {#connect-to-a-bootnode}

La mayoría de los clientes tienen una lista de nodos de arranque incorporados, aunque si quisiera ejecutar su propio nodo de arranque, o utilizar uno que no forme parte de la lista de codificados del cliente, tambien puede hacerlo. En este caso, puede especificarlos cuando empiece con su cliente, de la forma siguiente (el ejemplo es para Geth, por favor revise la documentación de su cliente):

```
geth --bootnodes "enode://<node ID>@<IP address>:<port>"
```

## Ejecutar un nodo de arranque {#run-a-bootnode}

Los nodos de arranque son nodos completos que no están detrás de una NAT ([Network Address Translation (traducción de dirección de red)](https://www.geeksforgeeks.org/network-address-translation-nat/)). Cada nodo completo puede actuar como un nodo de arranque siempre y cuando esté disponible públicamente.

Cuando inicie un nodo deberá registrar su [«enodo»](/developers/docs/networking-layer/network-addresses/#enode), que es el identificador público que otros pueden usar para conectarse a su nodo.

El enodo usualmente se regenera en cada reinicio, así que asegúrese de mirar la documentación de su cliente sobre cómo generar un enodo persistente para su nodo de arranque.

Para que un nodo de arranque sea eficiente es buena idea aumentar el número máximo de pares que pueden conectarse a él. Ejecutar un nodo de arranque con muchos pares incrementará significativamente el requerimiento de la banda ancha.

## Nodos de arranque disponibles {#available-bootnodes}

Puede encontrar una lista de nodos de arranque incorporados en go-ethereum [aquí](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23). Estos nodos de arranque los mantiene Ethereum Foundation y el equipo de go-ethereum.

Hay disponibles otras listas de nodos de arranque mantenidas por voluntarios. Por favor, asegúrese de incluir siempre al menos un nodo de arranque oficial, de lo contrario podría ser ofuscado por un eclipse.
