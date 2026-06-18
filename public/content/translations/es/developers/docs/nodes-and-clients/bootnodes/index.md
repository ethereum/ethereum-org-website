---
title: "Introducción a los nodos de arranque de Ethereum"
description: "La información básica que necesita para entender los nodos de arranque"
lang: es
---

Cuando un nuevo nodo se une a la red Ethereum, necesita conectarse a nodos que ya están en la red para luego descubrir nuevos pares. Estos puntos de entrada a la red Ethereum se denominan nodos de arranque. Los clientes suelen tener una lista de nodos de arranque codificada en ellos. Estos nodos de arranque suelen ser administrados por el equipo de operaciones de desarrollo (devops) de la Fundación Ethereum o por los propios equipos de clientes. Tenga en cuenta que los nodos de arranque no son lo mismo que los nodos estáticos. Los nodos estáticos se llaman una y otra vez, mientras que los nodos de arranque solo se llaman si no hay suficientes pares a los que conectarse y un nodo necesita iniciar (bootstrap) algunas conexiones nuevas.

## Conectarse a un nodo de arranque {#connect-to-a-bootnode}

La mayoría de los clientes tienen una lista de nodos de arranque incorporada, pero es posible que también desee ejecutar su propio nodo de arranque o usar uno que no forme parte de la lista codificada del cliente. En este caso, puede especificarlos al iniciar su cliente, de la siguiente manera (el ejemplo es para Geth, consulte la documentación de su cliente):

```
geth --bootnodes "enode://<node ID>@<IP address>:<port>"
```

## Ejecutar un nodo de arranque {#run-a-bootnode}

Los nodos de arranque son nodos completos que no están detrás de una NAT ([Traducción de direcciones de red](https://www.geeksforgeeks.org/network-address-translation-nat/)). Todo nodo completo puede actuar como un nodo de arranque siempre que esté disponible públicamente.

Cuando inicia un nodo, debería mostrar en el registro su [enode](/developers/docs/networking-layer/network-addresses/#enode), que es un identificador público que otros pueden usar para conectarse a su nodo.

El enode generalmente se regenera en cada reinicio, así que asegúrese de consultar la documentación de su cliente sobre cómo generar un enode persistente para su nodo de arranque.

Para ser un buen nodo de arranque, es una buena idea aumentar el número máximo de pares que pueden conectarse a él. Ejecutar un nodo de arranque con muchos pares aumentará significativamente el requisito de ancho de banda.

## Nodos de arranque disponibles {#available-bootnodes}

Puede encontrar una lista de nodos de arranque incorporados en go-ethereum [aquí](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23). Estos nodos de arranque son mantenidos por la Fundación Ethereum y el equipo de go-ethereum.

Hay otras listas de nodos de arranque mantenidas por voluntarios disponibles. Asegúrese de incluir siempre al menos un nodo de arranque oficial; de lo contrario, podría sufrir un ataque de eclipse.