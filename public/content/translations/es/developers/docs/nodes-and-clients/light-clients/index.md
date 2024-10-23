---
title: Clientes ligeros
description: Introducción a los clientes ligeros de Ethereum.
lang: es
---

Ejecutar un nodo completo es la forma mas fiable, privada, descentralizada y resistente a censura de interactuar con Ethereum. Con los nodos completos usted mantiene su propia copia de la cadena de bloques la cual puede consultar instantáneamente y conseguir acceso directo a la red P2P de Ethereum. De igual forma, ejecutar un nodo completo requiere una significante cantidad de memoria, espacio y CPU. Esto significa que ejecutar su propio nodo no es factible para todo el mundo. Hay varias soluciones a esto en la hoja de ruta de Ethereum, incluida la opción «sin estado», aunque aún están lejos de implementarse. La respuesta a corto plazo es el intercambio de algunos de los beneficios que conlleva el ejecutar un nodo completo para lograr grandes mejoras de rendimiento y permitir que los nodos se ejecuten en dispositivos con pocos requisitos. A los nodos que hacen esta compensación se les denomina nodos ligeros.

## ¿Qué es un cliente ligero? {#what-is-a-light-client}

Un nodo ligero es un nodo que ejecuta un software de cliente ligero. En vez de guardar localmente las copias de los datos de la cadena de bloques y de comprobar de forma independiente todos los cambios realizados, solicitan los datos necesarios a algún proveedor. El proveedor puede ser una conexión directa a un nodo completo o a través de un servidor RPC centralizado. Seguidamente, el nodo ligero comprueba los datos, lo que le permite mantenerse sincronizado con la cabeza de la cadena. Los nodos ligeros solo procesan los encabezados de los bloques, descargando solo ocasionalmente el contenido actual del bloque. Los nodos pueden variar en su ligereza, dependiendo de las combinaciones de software de cliente ligero y completo que ejecuten. Por ejemplo, la configuración más ligera sería la ejecución de un cliente de ejecución ligero y un cliente de consenso ligero. También es probable que varios nodos opten por ejecutar clientes de consenso ligeros con clientes de ejecución completos, o viceversa.

## ¿Cómo funcionan los clientes ligeros? {#how-do-light-clients-work}

Cuando Ethereum comenzó a utilizar un mecanismo de consenso basado en la prueba de participación, se introdujeron nuevas infraestructuras, especialmente para brindar apoyo a clientes ligeros. Un subconjunto de 512 validadores selecciona aleatoriamente su manera de funcionamiento cada 1,1 días para que actúen como **comité de sincronización**. El comité de sincronización firma los encabezado de los recientes bloques. Cada encabezado de los bloques contiene la firma agregada de los validadores que están en el comité de sincronización y un «campo de bits» que permite mostrar qué validadores firmaron y quiénes no lo hicieron. Cada encabezado tambien incluye la lista de los validadores que esperan poder participar en la siguiente firma de bloque. Esto significa que un cliente ligero puede ver rapidamente que el comité de sincronización ha firmado en los datos que ellos reciben, y ellos tambien pueden revisar que el comité de sincronizacion es genuino comparando el bloque que recibieron, con el que les fue dicho que esperaban en el bloque anterior. De esta manera, el cliente ligero puede seguir informándose de los últimos bloques de Ethereum sin la necesidad de descargar el bloque en sí, sólo el encabezado que contiene la información resumida.

En la capa de ejecución no hay ninguna especificación para los clientes de ejecución ligeros. El alcance de un cliente de ejecución ligero puede variar desde un «modo ligero» a uno de cliente de ejecución completa que contiene toda las funcionalidades de la EVM y de las redes de un nodo completo, pero que solo verifica los encabezados de los bloques, sin descargar ningún dato asociado, o puede ser mas un cliente despojado que solo gestione los pedidos de un proveedor RPC para interactuar con Ethereum.

## ¿Por qué son importantes los clientes ligeros? {#why-are-light-clients-important}

Los clientes ligeros importan porque ellos le permiten a los usuarios verificar los datos entrantes, en lugar de confiar ciegamente en que los datos de un proveedor sean correctos y honestos, mientras solo usan una pequeña fracción del poder computacional de un nodo completo. Los datos que un cliente ligero recibe se pueden comprobar cotejándolos con los encabezados de los bloques que sepan a ciencia cierta que han firmado por al menos 2/3 partes del conjunto aleatorio de 512 validadores de Ethereum. Esto corrobora poderosamente que los datos son correctos.

Los clientes ligeros solo usan una pequeña cantidad de poder computacional, memoria y espacio para que puedan ejecutarse en teléfonos móviles, incorporarse en una aplicación o formar parte de un navegador. Los clientes ligeros son una forma de hacer que el acceso a Ethereum con una mínima confianza sea tan sencillo como si se tratara de un proveedor tercero de confianza.

Tomemos un sencillo ejemplo. Imagine que quiere revisar el saldo de su cuenta. Para ello, tiene que enviar una solicitud a un nodo en Ethereum. Ese nodo comprobará en su copia local en Ethereum el estado de su saldo y se lo devolverá. Si no tiene acceso directo a un nodo, hay operadores centralizados que proporcionan estos datos como servicio. Puede enviarle una solicitud y ellos revisarán su nodo y le enviarán el resultado de vuelta. El problema que surge es que tiene que confiar en que el proveedor le esté dando una información correcta. Si no la puede verificar usted mismo, nunca sabrá si la información es realmente correcta.

Un cliente ligero aborda este problema. Usted aún solicita datos de un proveedor externo, pero cuando los recibe, vienen con una prueba de que su cliente ligero puede comparar la información recibida en el encabezado del bloque. Esto significa que Ethereum está verificando que sus datos son correctos en vez de hacerlo otro operador de confianza.

## ¿Qué innovaciones traen consigo los clientes ligeros? {#what-innovations-do-light-clients-enable}

El principal beneficio de los clientes ligeros es permitir el acceso a Ethereum a más personas independientemente de que tengan un hardware que no cumpla con los requisitos y una dependencia mínima de terceros. Esto es bueno para los usuarios porque ellos pueden verificar sus propios datos y es bueno para la red porque incrementa el número y diversidad de nodos que están verificando la cadena.

La capacidad de ejecutar nodos Ethereum en dispositivos con muy poco espacio, memoria y poder de procesamiento es una de las mayores áreas de innovación desbloqueadas gracias a los clientes ligeros. Mientras hoy en día los nodos de Ethereum precisan muchos recursos computacionales, los clientes ligeros podrían integrarse en los navegadores, ejecutarse en teléfonos móviles y tal vez incluso en dispositivos más pequeños como relojes inteligentes. Esto significa que carteras de Ethereum con clientes integrados podrían ejecutarse en teléfonos móviles. También significa que las carteras móviles podrían estar mucho más descentralizadas, dado que ellas no tendrían que confiar sus datos a proveedores de datos centralizados.

Una extensión de esto se consigue habilitando dispositivos del tipo **Internet de las cosas (IoT)**. Un cliente ligero podría utilizarse para demostrar rápidamente la propiedad del saldo de algunos tókenes o NFT, con toda la seguridad garantizada proporcionada por los comités de sincronización, propiciando alguna acción en una red IoT. Imagine un [servicio de alquiler de bicicletas](https://youtu.be/ZHNrAXf3RDE?t=929) que use una aplicación con un cliente ligero integrado para verificar rápidamente que posee usted el NFT del servicio de alquiler y, de ser así, desbloquear la bicicleta para su uso.

Los rollups (o acumulaciones) también podrían beneficiarse de los clientes ligeros. Uno de los grandes problemas para los rollups han sido hackeos dirigidos a puentes que permiten mover los fondos desde la red principal de Ethereum hacia una acumulación. Uno de los puntos débiles son los oráculos que los rollups usan para detectar que los usuarios han hecho un depósito dentro del puente. Si el oráculo se alimenta de una información errónea, ellos podrían engañar al rollup para que piense que había un depósito en el puente y que de forma incorrecta libere los fondos. Un cliente ligero integrado en un rollup podría utilizarse para proteger contra de oráculos corruptos, porque el depósito dentro del puente podría venir con una prueba que el rollup puede comprobar antes de emitir tókenes. El mismo concepto también podría aplicarse hacia otros puentes entre cadenas.

Los clientes ligeros también pueden servir para actualizar carteras de Ethereum. En vez de confiar en la información proporcionada por un proveedor RPC, su cartera podría comprobar directamente la información que se le presenta a través de un cliente ligero incorporado. Además, esto añadiría seguridad a su cartera. Si su proveedor RPC actuara fraudulentamente y le proporcionara datos incorrectos, el cliente ligero incorporado podría avisarle de ello.

## ¿Cúal es el estado actual de desarrollo de clientes ligeros? {#current-state-of-development}

Se está desarrollando una cantidad considerable de clientes ligeros, incluidos los clientes de ejecución y de consenso, junto con los clientes ligeros de ejecución y consenso combinados. Estas son las implementaciones de clientes ligeros que conocemos al cierre de edición de esta página:

- [Lodestar](https://github.com/ChainSafe/lodestar/tree/unstable/packages/light-client): cliente ligero de consenso escrito en TypeScript
- [Helios](https://github.com/a16z/helios): cliente ligero de consenso y ejecución combinados escrito en Rust
- [Geth](https://github.com/ethereum/go-ethereum/tree/master/light): modo ligero para el cliente de ejecución (en desarrollo) escrito en Go
- [Nimbus](https://nimbus.guide/el-light-client.html): cliente ligero de consenso escrito en Nim

A nuestro entender, ninguna de estas implementaciones se considera lista para entrar aún en la fase de producción.

También se ha realizado un inmenso esfuerzo por mejorar la manera en que los clientes ligeros acceden a los datos en Ethereum. Actualmente, los clientes ligeros confían en las solicitudes que hacen los RPC a los nodos completos usando un modelo cliente/servidor, pero en el futuro se podrían solicitar los datos de una forma más descentralizada, utilizando redes dedicadas como las de la [Portal Network](https://www.ethportal.net/) la cual puede suministrar datos a los clientes ligeros usando un protocolo de intercambio de información P2P.

Otros elementos en la [hoja de ruta](/roadmap/) como [árbol de Verkle](/roadmap/verkle-trees/) y [sin estado](/roadmap/statelessness/) aportarán con el tiempo la misma garantía de seguridad de los clientes ligeros a los clientes completos.

## Más información {#further-reading}

- [Cliente ligero Geth con Zsolt Felfodhi](https://www.youtube.com/watch?v=EPZeFXau-RE)
- [Esteblecimiento de redes de clientes ligeros con Etan Kissling](https://www.youtube.com/watch?v=85MeiMA4dD8)
- [Clientes ligeros después del Merge con Etan Kissling](https://www.youtube.com/watch?v=ZHNrAXf3RDE)
- [Piper Merriam: Clientes ligeros y su curioso camino hacia lo funcional](https://snakecharmers.ethereum.org/the-winding-road-to-functional-light-clients/)
