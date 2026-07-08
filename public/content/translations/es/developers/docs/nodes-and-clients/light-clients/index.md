---
title: Clientes ligeros
description: "Introducción a los clientes ligeros de Ethereum."
lang: es
---

Ejecutar un nodo completo es la forma más privada, descentralizada, resistente a la censura y sin necesidad de confianza de interactuar con [Ethereum](/). Con un nodo completo, mantienes tu propia copia de la cadena de bloques que puedes consultar al instante y obtienes acceso directo a la red entre pares de Ethereum. Sin embargo, ejecutar un nodo completo requiere una cantidad significativa de memoria, almacenamiento y CPU. Esto significa que no es factible para todos ejecutar su propio nodo. Existen varias soluciones para esto en la hoja de ruta de Ethereum, incluyendo la ausencia de estado, pero faltan varios años para que se implementen. La respuesta a corto plazo es sacrificar algunos de los beneficios de ejecutar un nodo completo a cambio de grandes mejoras de rendimiento que permitan a los nodos funcionar con requisitos de hardware muy bajos. Los nodos que hacen este intercambio se conocen como nodos ligeros.

## ¿Qué es un cliente ligero? {#what-is-a-light-client}

Un nodo ligero es un nodo que ejecuta software de cliente ligero. En lugar de mantener copias locales de los datos de la cadena de bloques y verificar de forma independiente todos los cambios, solicitan los datos necesarios a algún proveedor. El proveedor podría ser una conexión directa a un nodo completo o a través de algún servidor RPC centralizado. Luego, el nodo ligero verifica los datos, lo que le permite mantenerse al día con la cabeza de la cadena. El nodo ligero solo procesa los encabezados del bloque, descargando solo ocasionalmente el contenido real del bloque. Los nodos pueden variar en su ligereza, dependiendo de las combinaciones de software de cliente ligero y completo que ejecuten. Por ejemplo, la configuración más ligera sería ejecutar un cliente de ejecución ligero y un cliente de consenso ligero. También es probable que muchos nodos elijan ejecutar clientes de consenso ligeros con clientes de ejecución completos, o viceversa.

## ¿Cómo funcionan los clientes ligeros? {#how-do-light-clients-work}

Cuando Ethereum comenzó a usar un mecanismo de consenso basado en prueba de participación (PoS), se introdujo una nueva infraestructura específicamente para admitir clientes ligeros. La forma en que funciona es seleccionando aleatoriamente un subconjunto de 512 validadores cada 1,1 días para que actúen como un **comité de sincronización**. El comité de sincronización firma el encabezado de los bloques recientes. Cada encabezado del bloque contiene la firma agregada de los validadores en el comité de sincronización y un "campo de bits" que muestra qué validadores firmaron y cuáles no. Cada encabezado también incluye una lista de validadores que se espera que participen en la firma del siguiente bloque. Esto significa que un cliente ligero puede ver rápidamente que el comité de sincronización ha aprobado los datos que recibe, y también puede comprobar que el comité de sincronización es el genuino comparando el que recibe con el que se le dijo que esperara en el bloque anterior. De esta manera, el cliente ligero puede seguir actualizando su conocimiento del último bloque de Ethereum sin descargar realmente el bloque en sí, solo el encabezado que contiene información resumida.

En la capa de ejecución no hay una especificación única para un cliente de ejecución ligero. El alcance de un cliente de ejecución ligero puede variar desde un "modo ligero" de un cliente de ejecución completo que tiene toda la funcionalidad de red y de la EVM de un nodo completo pero solo verifica los encabezados del bloque, sin descargar los datos asociados, o puede ser un cliente más simplificado que depende en gran medida de reenviar solicitudes a un proveedor de RPC para interactuar con Ethereum.

## ¿Por qué son importantes los clientes ligeros? {#why-are-light-clients-important}

Los clientes ligeros son importantes porque permiten a los usuarios verificar los datos entrantes en lugar de confiar ciegamente en que su proveedor de datos es correcto y honesto, mientras usan solo una pequeña fracción de los recursos computacionales de un nodo completo. Los datos que reciben los clientes ligeros se pueden comprobar con los encabezados del bloque que saben que han sido firmados por al menos 2/3 de un conjunto aleatorio de 512 validadores de Ethereum. Esta es una evidencia muy sólida de que los datos son correctos.

El cliente ligero solo usa una pequeña cantidad de potencia informática, memoria y almacenamiento, por lo que puede ejecutarse en un teléfono móvil, integrarse en una aplicación o como parte de un navegador. Los clientes ligeros son una forma de hacer que el acceso de confianza minimizada a Ethereum sea tan fluido como confiar en un proveedor externo.

Tomemos un ejemplo sencillo. Imagina que quieres comprobar el saldo de tu cuenta. Para hacer esto, tienes que hacer una solicitud a un nodo de Ethereum. Ese nodo comprobará su copia local del estado de Ethereum para ver tu saldo y te lo devolverá. Si no tienes acceso directo a un nodo, hay operadores centralizados que proporcionan estos datos como un servicio. Puedes enviarles una solicitud, ellos comprueban su nodo y te envían el resultado. El problema con esto es que entonces tienes que confiar en que el proveedor te está dando la información correcta. Nunca puedes saber realmente si la información es correcta si no puedes verificarla por ti mismo.

Un cliente ligero aborda este problema. Sigues solicitando datos a algún proveedor externo, pero cuando recibes los datos de vuelta, vienen con una prueba que tu nodo ligero puede comprobar con la información que recibió en el encabezado del bloque. Esto significa que Ethereum está verificando la exactitud de tus datos en lugar de algún operador de confianza.

## ¿Qué innovaciones permiten los clientes ligeros? {#what-innovations-do-light-clients-enable}

El beneficio principal de los clientes ligeros es permitir que más personas accedan a Ethereum de forma independiente con requisitos de hardware insignificantes y una dependencia mínima de terceros. Esto es bueno para los usuarios porque pueden verificar sus propios datos y es bueno para la red porque aumenta el número y la diversidad de nodos que están verificando la cadena.

La capacidad de ejecutar nodos de Ethereum en dispositivos con muy poco almacenamiento, memoria y potencia de procesamiento es una de las principales áreas de innovación que desbloquean los clientes ligeros. Mientras que hoy en día los nodos de Ethereum requieren muchos recursos informáticos, los clientes ligeros podrían integrarse en navegadores, ejecutarse en teléfonos móviles y tal vez incluso en dispositivos más pequeños como relojes inteligentes. Esto significa que las billeteras de Ethereum con clientes integrados podrían ejecutarse en un teléfono móvil. Esto significa que las billeteras móviles podrían ser mucho más descentralizadas, ya que no tendrían que confiar en proveedores de datos centralizados para obtener sus datos.

Una extensión de esto es habilitar dispositivos del **internet de las cosas (IoT)**. Un cliente ligero podría usarse para demostrar rápidamente la propiedad de algún saldo de token o NFT, con todas las garantías de seguridad proporcionadas por los comités de sincronización, desencadenando alguna acción en una red IoT. Imagina un [servicio de alquiler de bicicletas](https://youtu.be/ZHNrAXf3RDE?t=929) que usa una aplicación con un cliente ligero integrado para verificar rápidamente que posees el NFT del servicio de alquiler y, de ser así, ¡desbloquea una bicicleta para que te la lleves!

Los rollup de Ethereum también se beneficiarían de los clientes ligeros. Uno de los grandes problemas para los rollup han sido los hackeos dirigidos a los puentes que permiten transferir fondos desde la red principal de Ethereum a un rollup. Una vulnerabilidad son los oráculos que usan los rollup para detectar que un usuario ha hecho un depósito en el puente. Si un oráculo proporciona datos incorrectos, podrían engañar al rollup para que piense que hubo un depósito en el puente y libere fondos incorrectamente. Un cliente ligero integrado en el rollup podría usarse para protegerse contra oráculos corruptos porque el depósito en el puente podría venir con una prueba que el rollup puede verificar antes de liberar cualquier token. El mismo concepto también podría aplicarse a otros puentes entre cadenas.

Los clientes ligeros también podrían usarse para actualizar las billeteras de Ethereum. En lugar de confiar en los datos proporcionados por un proveedor de RPC, tu billetera podría verificar directamente los datos que se te presentan usando un cliente ligero integrado. Esto añadiría seguridad a tu billetera. Si tu proveedor de RPC fuera deshonesto y te proporcionara datos incorrectos, ¡el cliente ligero integrado podría decírtelo!

## ¿Cuál es el estado actual del desarrollo de clientes ligeros? {#current-state-of-development}

Hay varios clientes ligeros en desarrollo, incluyendo clientes ligeros de ejecución, de consenso y combinados de ejecución/consenso. Estas son las implementaciones de clientes ligeros que conocemos en el momento de escribir esta página:

- [Lodestar](https://github.com/ChainSafe/lodestar/tree/unstable/packages/light-client): cliente de consenso ligero en TypeScript
- [Helios](https://github.com/a16z/helios): cliente ligero combinado de ejecución y consenso en Rust
- [Geth](https://github.com/ethereum/go-ethereum/tree/master/beacon/light): modo ligero para cliente de ejecución (en desarrollo) en Go
- [Nimbus](https://nimbus.guide/el-light-client.html): cliente de consenso ligero en Nim

Hasta donde sabemos, ninguno de estos se considera listo para producción todavía.

También se está trabajando mucho para mejorar las formas en que los clientes ligeros pueden acceder a los datos de Ethereum. Actualmente, los clientes ligeros dependen de solicitudes RPC a nodos completos usando un modelo cliente/servidor, pero en el futuro los datos podrían solicitarse de una manera más descentralizada usando una red dedicada como la [Portal Network](https://www.ethportal.net/) que podría servir los datos a los clientes ligeros usando un protocolo gossip entre pares.

Otros elementos de la [hoja de ruta](/roadmap/) como los [árboles Verkle](/roadmap/verkle-trees/) y la [ausencia de estado](/roadmap/statelessness/) eventualmente igualarán las garantías de seguridad de los clientes ligeros a las de los clientes completos.

## Lecturas adicionales {#further-reading}

- [Zsolt Felfodhi sobre los clientes ligeros de Geth](https://www.youtube.com/watch?v=EPZeFXau-RE)
- [Etan Kissling sobre las redes de clientes ligeros](https://www.youtube.com/watch?v=85MeiMA4dD8)
- [Etan Kissling sobre los clientes ligeros después de La Fusión](https://www.youtube.com/watch?v=ZHNrAXf3RDE)
- [Piper Merriam: El sinuoso camino hacia clientes ligeros funcionales](https://snakecharmers.ethereum.org/the-winding-road-to-functional-light-clients/)