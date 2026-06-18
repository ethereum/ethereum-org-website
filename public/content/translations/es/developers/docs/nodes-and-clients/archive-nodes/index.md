---
title: Nodo de archivo de Ethereum
description: Una descripción general de los nodos de archivo
lang: es
sidebarDepth: 2
---

Un nodo de archivo es una instancia de un cliente de [Ethereum](/) configurado para construir un archivo de todos los estados históricos. Es una herramienta útil para ciertos casos de uso, pero puede ser más complicado de ejecutar que un nodo completo.

## Requisitos previos {#prerequisites}

Debería comprender el concepto de un [nodo de Ethereum](/developers/docs/nodes-and-clients/), [su arquitectura](/developers/docs/nodes-and-clients/node-architecture/), las [estrategias de sincronización](/developers/docs/nodes-and-clients/#sync-modes) y las prácticas para [ejecutarlos](/developers/docs/nodes-and-clients/run-a-node/) y [usarlos](/developers/docs/apis/json-rpc/).

## Qué es un nodo de archivo {#what-is-an-archive-node}

Para comprender la importancia de un nodo de archivo, aclaremos el concepto de "estado". Ethereum puede denominarse una _máquina de estado basada en transacciones_. Consiste en cuentas y aplicaciones que ejecutan transacciones que cambian su estado. Los datos globales con información sobre cada cuenta y contrato se almacenan en una base de datos trie llamada estado. Esto es manejado por el cliente de la capa de ejecución (EL) e incluye:

- Saldos de cuentas y nonces
- Código y almacenamiento de contratos
- Datos relacionados con el consenso, por ejemplo, el contrato de depósito de staking

Para interactuar con la red, verificar y producir nuevos bloques, los clientes de Ethereum tienen que mantenerse al día con los cambios más recientes (la punta de la cadena) y, por lo tanto, con el estado actual. Un cliente de la capa de ejecución configurado como un nodo completo verifica y sigue el último estado de la red, pero solo almacena en caché los últimos estados, por ejemplo, el estado asociado con los últimos 128 bloques, para que pueda manejar reorganizaciones de la cadena y proporcionar un acceso rápido a los datos recientes. El estado reciente es lo que todos los clientes necesitan para verificar las transacciones entrantes y usar la red.

Puede imaginar el estado como una instantánea momentánea de la red en un bloque determinado y el archivo como una repetición del historial.

Los estados históricos se pueden podar de forma segura porque no son necesarios para que la red funcione y sería inútilmente redundante para el cliente mantener todos los datos desactualizados. Los estados que existían antes de algún bloque reciente (por ejemplo, 128 bloques antes de la cabeza) se descartan de manera efectiva. Los nodos completos solo mantienen datos históricos de la cadena de bloques (bloques y transacciones) y ocasionales instantáneas históricas que pueden usar para regenerar estados más antiguos a pedido. Hacen esto volviendo a ejecutar transacciones pasadas en la EVM, lo que puede ser computacionalmente exigente cuando el estado deseado está lejos de la instantánea más cercana.

Sin embargo, esto significa que acceder a un estado histórico en un nodo completo consume mucha computación. Es posible que el cliente necesite ejecutar todas las transacciones pasadas y calcular un estado histórico desde el bloque génesis. Los nodos de archivo resuelven esto almacenando no solo los estados más recientes, sino todos los estados históricos creados después de cada bloque. Básicamente, hace una compensación con un mayor requisito de espacio en disco.

Es importante tener en cuenta que la red no depende de los nodos de archivo para mantener y proporcionar todos los datos históricos. Como se mencionó anteriormente, todos los estados provisionales históricos se pueden derivar en un nodo completo. Las transacciones son almacenadas por cualquier nodo completo (actualmente menos de 400G) y se pueden reproducir para construir todo el archivo.

### Casos de uso {#use-cases}

El uso regular de Ethereum, como enviar transacciones, implementar contratos, verificar el consenso, etc., no requiere acceso a estados históricos. Los usuarios nunca necesitan un nodo de archivo para una interacción estándar con la red.

El principal beneficio del archivo de estado es un acceso rápido a las consultas sobre estados históricos. Por ejemplo, el nodo de archivo devolvería rápidamente resultados como:

- _¿Cuál era el saldo de ETH de la cuenta 0x1337... en el bloque 15537393?_
- _¿Cuál es el saldo del token 0x en el contrato 0x en el bloque 1920000?_

Como se explicó anteriormente, un nodo completo necesitaría generar estos datos mediante la ejecución de la EVM, lo que usa la CPU y lleva tiempo. Los nodos de archivo acceden a ellos en el disco y sirven las respuestas de inmediato. Esta es una característica útil para ciertas partes de la infraestructura, por ejemplo:

- Proveedores de servicios como exploradores de bloques
- Investigadores
- Analistas de seguridad
- Desarrolladores de aplicaciones descentralizadas (dapps)
- Auditoría y cumplimiento

Hay varios [servicios](/developers/docs/nodes-and-clients/nodes-as-a-service/) gratuitos que también permiten el acceso a datos históricos. Como es más exigente ejecutar un nodo de archivo, este acceso es en su mayoría limitado y funciona solo para acceso ocasional. Si su proyecto requiere acceso constante a datos históricos, debería considerar ejecutar uno usted mismo.

## Implementaciones y uso {#implementations-and-usage}

El nodo de archivo en este contexto significa datos servidos por clientes de la capa de ejecución orientados al usuario, ya que manejan la base de datos de estado y proporcionan puntos de conexión JSON-RPC. Las opciones de configuración, el tiempo de sincronización y el tamaño de la base de datos pueden variar según el cliente. Para obtener más detalles, consulte la documentación proporcionada por su cliente.

Antes de iniciar su propio nodo de archivo, conozca las diferencias entre los clientes y especialmente los diversos [requisitos de hardware](/developers/docs/nodes-and-clients/run-a-node/#requirements). La mayoría de los clientes no están optimizados para esta función y sus archivos requieren más de 12 TB de espacio. Por el contrario, implementaciones como Erigon pueden almacenar los mismos datos en menos de 3 TB, lo que las convierte en la forma más efectiva de ejecutar un nodo de archivo.

## Prácticas recomendadas {#recommended-practices}

Aparte de las [recomendaciones generales para ejecutar un nodo](/developers/docs/nodes-and-clients/run-a-node/), un nodo de archivo puede ser más exigente en cuanto a hardware y mantenimiento. Teniendo en cuenta las [características clave](https://github.com/ledgerwatch/erigon#key-features) de Erigon, el enfoque más práctico es utilizar la implementación del cliente [Erigon](/developers/docs/nodes-and-clients/#erigon).

### Hardware {#hardware}

Asegúrese siempre de verificar los requisitos de hardware para un modo determinado en la documentación de un cliente.
El mayor requisito para los nodos de archivo es el espacio en disco. Dependiendo del cliente, varía de 3 TB a 12 TB. Incluso si el HDD podría considerarse una mejor solución para grandes cantidades de datos, sincronizarlo y actualizar constantemente la cabeza de la cadena requerirá unidades SSD. Las unidades [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) son lo suficientemente buenas, pero deben ser de una calidad confiable, al menos [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences). Los discos se pueden instalar en una computadora de escritorio o en un servidor con suficientes ranuras. Dichos dispositivos dedicados son ideales para ejecutar un nodo de alto tiempo de actividad. Es totalmente posible ejecutarlo en una computadora portátil, pero la portabilidad tendrá un costo adicional.

Todos los datos deben caber en un volumen, por lo tanto, los discos deben unirse, por ejemplo, con [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) o LVM. También podría valer la pena considerar el uso de [ZFS](https://en.wikipedia.org/wiki/ZFS), ya que admite "Copy-on-write" (copia en escritura), lo que garantiza que los datos se escriban correctamente en el disco sin errores de bajo nivel.

Para mayor estabilidad y seguridad en la prevención de la corrupción accidental de la base de datos, especialmente en una configuración profesional, considere usar [memoria ECC](https://en.wikipedia.org/wiki/ECC_memory) si su sistema lo admite. Por lo general, se recomienda que el tamaño de la RAM sea el mismo que para un nodo completo, pero más RAM puede ayudar a acelerar la sincronización.

Durante la sincronización inicial, los clientes en modo de archivo ejecutarán cada transacción desde el bloque génesis. La velocidad de ejecución está limitada principalmente por la CPU, por lo que una CPU más rápida puede ayudar con el tiempo de sincronización inicial. En una computadora de consumo promedio, la sincronización inicial puede demorar hasta un mes.

## Lecturas adicionales {#further-reading}

- [Nodo completo de Ethereum frente a nodo de archivo](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) - _QuickNode, septiembre de 2022_
- [Construyendo su propio nodo de archivo de Ethereum](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) - _Thomas Jay Rush, agosto de 2021_
- [Cómo configurar Erigon, el RPC de Erigon y TrueBlocks (extracción y API) como servicios](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson, actualizado en septiembre de 2022_

## Temas relacionados {#related-topics}

- [Nodos y clientes](/developers/docs/nodes-and-clients/)
- [Ejecutar un nodo](/developers/docs/nodes-and-clients/run-a-node/)