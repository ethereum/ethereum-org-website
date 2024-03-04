---
title: Nodo de archivo Ethereum
description: Una visión general de los nodos de archivo
lang: es
sidebarDepth: 2
---

Un nodo de archivo es una instancia de un cliente Ethereum configurado para construir un archivo de todos los estados históricos. Es una herramienta útil para ciertos casos de uso, pero podría ser más difícil de ejecutar que un nodo completo.

## Requisitos previos {#prerequisites}

Debería entender el concepto de un [nodo en Ethereum](/developers/docs/nodes-and-clients/), [su arquitectura](/developers/docs/nodes-and-clients/node-architecture/), [estrategias de sincronización](/developers/docs/nodes-and-clients/#sync-modes), prácticas de [ejecución](/developers/docs/nodes-and-clients/run-a-node/) y [usarlas](/developers/docs/apis/json-rpc/).

## ¿Qué es un nodo de archivo?

Para comprender la importancia de un nodo de archivo, aclaremos el concepto de «estado». Se puede definir a Ethereum como _máquina de estado basada en transacciones_. Consiste en cuentas y aplicaciones que ejecutan transacciones que están cambiando su estado. Los datos globales con información sobre cada cuenta y contrato se almacenan en una base de datos de verificación llamada estado. La gestiona el cliente a través de la capa de ejecución (EL) e incluye:

- Saldos de cuentas y nonces
- Código de contrato y almacenamiento
- Datos relacionados con el consenso, por ejemplo, contrato de depósito de participación

Para interactuar con la red, verificar y producir nuevos bloques, los clientes de Ethereum tienen que mantenerse al día con los cambios más recientes (la punta de la cadena) y, por lo tanto, con el estado actual. Un cliente de capa de ejecución configurado como un nodo completo verifica y sigue el estado más reciente de la red, pero solo almacena en caché los últimos estados, por ejemplo, el estado asociado con los últimos 128 bloques, para que pueda manejar la reorganización de la cadena y proporcionar un acceso rápido a los datos recientes. El estado reciente es lo que todos los clientes necesitan para verificar las transacciones entrantes y usar la red.

Puede imaginar el estado como una captura momentánea de la red en un bloque determinado y el archivo como una repetición de la historia.

Los estados históricos se pueden «podar» o limpiar de forma segura, porque no son necesarios para que la red funcione y sería inútilmente redundante que el cliente mantuviera todos los datos desactualizado. Los estados que existían antes de algún bloque reciente (por ejemplo, 128 bloques antes de la cabeza) se tiran efectivamente. Los nodos completos solo guardan los datos históricos de la cadena de bloques (bloques y transacciones) y las capturas históricas ocasionales que pueden usar para regenerar estados más antiguos a petición. Lo hacen volviendo a ejecutar transacciones pasadas en la EVM, lo que puede ser computacionalmente exigente cuando el estado deseado está lejos de la captura más cercana.

No obstante, esto significa que el acceso a un estado histórico en un nodo completo consume mucho cálculo. Es posible que el cliente tenga que ejecutar todas las transacciones pasadas y calcular un estado histórico desde el origen. Los nodos de archivo resuelven esto almacenando no solo los estados más recientes, sino también todos los estados históricos creados después de cada bloque. Básicamente hace una compensación con un mayor requisito de espacio en disco.

Es importante tener en cuenta que la red no depende de los nodos de archivo para mantener y proporcionar todos los datos históricos. Como se mencionó anteriormente, todos los estados provisionales históricos se pueden derivar en un nodo completo. Las transacciones se almacenan en cualquier nodo completo (actualmente menos de 400G) y se pueden reproducir para construir todo el archivo.

### Casos de uso

El uso regular de Ethereum, como el envío de transacciones, el despliegue de contratos, la verificación del consenso, etc., no requiere acceso a estados históricos. Los usuarios nunca necesitan un nodo de archivo para una interacción estándar con la red.

El principal beneficio del archivo de estado es un acceso rápido a las consultas sobre estados históricos. Por ejemplo, el nodo de archivo devolvería rápidamente resultados como:

- _¿Cuál era el saldo ETH de la cuenta 0x1337... en el bloque 15537393?_
- _¿Cuál es el saldo del token 0x en el contrato 0x en el bloque 1920000?_

Como se explicó anteriormente, un nodo completo tendría que generar estos datos mediante la ejecución de EVM, que utiliza la CPU y lleva tiempo. Los nodos de archivo acceden a ellos en el disco y dan las respuestas inmediatamente. Esta es una característica útil para ciertas partes de la infraestructura, por ejemplo:

- Proveedores de servicios como los exploradores de bloques
- Investigadores
- Analistas de seguridad
- Desarrolladores de DApps
- Auditoría y cumplimiento

Hay varios [servicios gratuitos](/developers/docs/nodes-and-clients/nodes-as-a-service/) que también permiten el acceso a los datos históricos. Como es más exigente ejecutar un nodo de archivo, este acceso es en su mayoría limitado y solo funciona para el acceso ocasional. Si su proyecto requiere acceso constante a datos históricos, debería considerar ejecutar uno usted mismo.

## Implementaciones y uso

Nodo de archivo en este contexto significa datos servidos por los clientes de la capa de ejecución del usuario, mientras maneja la base de datos de estado y proporciona terminales JSON-RPC. Las opciones de configuración, el tiempo de sincronización y el tamaño de la base de datos pueden variar según el cliente. Para obtener más información, consulte la documentación proporcionada por su cliente.

Antes de iniciar su propio nodo de archivo, conozca bien las diferencias entre los clientes y especialmente los diversos [requisitos de hardware](/developers/docs/nodes-and-clients/run-a-node/#requirements). La mayoría de los clientes no están optimizados para esta función y sus archivos requieren más de 12 TB de espacio. Por el contrario, implementaciones como Erigon pueden almacenar los mismos datos en menos de 3 Tb, lo que los convierte en la forma más efectiva de ejecutar un nodo de archivo.

## Prácticas recomendadas

Aparte de las [recomendaciones generales para ejecutar un nodo](/developers/docs/nodes-and-clients/run-a-node/), el hardware y el mantenimiento de un nodo de archivo pueden ser más exigentes. Teniendo en cuenta las características clave [de Erigons](https://github.com/ledgerwatch/erigon#key-features), el enfoque más práctico es utilizar la implementación del cliente [Erigon](/developers/docs/nodes-and-clients/#erigon).

### Hardware

Asegúrese siempre de verificar los requisitos de hardware para un modo determinado en la documentación de un cliente. El mayor requisito para los nodos de archivo es el espacio en el disco. Dependiendo del cliente, varía de 3 TB a 12 TB. Incluso si el disco duro (HDD) podría considerarse una mejor solución para grandes cantidades de datos, sincronizarlo y actualizar constantemente la cabeza de la cadena requerirá unidades SSD de estado sólido. Las unidades [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) son lo suficientemente buenas, pero deben ser de una calidad considerable, al menos [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences). Los discos se pueden instalar en un ordenador de escritorio o en un servidor con suficientes ranuras. Estos dispositivos dedicados son ideales para ejecutar un nodo de elevado tiempo de actividad. Es perfectamente posible ejecutarlo en un ordenador portátil, pero la portabilidad tendrá un coste adicional.

Todos los datos deben encajar en un solo volumen, por lo tanto, los discos deben unirse, por ejemplo, con [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) o [LVM](https://web.mit.edu/rhel-doc/5/RHEL-5-manual/Deployment_Guide-en-US/ch-lvm.html). También podría valer la pena considerar el uso de [ZFS](https://en.wikipedia.org/wiki/ZFS), ya que es compatible con «Copiar en escritura», lo que garantiza que los datos se escriban correctamente en el disco sin ningún error de bajo nivel.

Para una mayor estabilidad y seguridad en la prevención de la corrupción accidental de la base de datos, especialmente en una configuración profesional, considere el uso de [memoria ECC](https://en.wikipedia.org/wiki/ECC_memory) si su sistema lo admite. Por lo general, se recomienda que el tamaño de la RAM sea el mismo que para un nodo completo, aunque cuanta más RAM, más le ayudará a acelerar la sincronización.

Durante la sincronización inicial, los clientes en modo de archivo ejecutarán todas las transacciones desde el origen. La velocidad de ejecución está limitada principalmente por la CPU, por lo que una CPU más rápida puede ayudar con el tiempo de sincronización inicial. En un ordenador de usuario normal, la sincronización inicial puede tardar hasta un mes.

## Más información {#further-reading}

- [Nodo completo de Ethereum frente a nodo de archivo](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node), _QuickNode, septiembre de 2022_
- [Construya su propio nodo de archivo de Ethereum](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09), _Thomas Jay Rush, agosto de 2021_
- [Cómo configurar Erigon, el RPC de Erigon y TrueBlocks (scrape y API) como servicios](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson, actualizado en septiembre de 2022_

## Temas relacionados {#related-topics}

- [ Nodos y clientes](/developers/docs/nodes-and-clients/)
- [Ejecución de un nodo](/developers/docs/nodes-and-clients/run-a-node/)
