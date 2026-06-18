---
title: Estrategias de almacenamiento de datos en la cadena de bloques
description: "Existen varias formas de almacenar datos utilizando la cadena de bloques. Este artículo comparará las diferentes estrategias, sus costos y compensaciones, así como los requisitos para usarlas de manera segura."
lang: es
---

Existen múltiples formas de almacenar información, ya sea directamente en la cadena de bloques o de una manera que esté asegurada por la cadena de bloques:

- Blobs de EIP-4844
- Datos de llamada (calldata)
- Fuera de la cadena con mecanismos de capa 1 (L1)
- "Código" de contrato
- Eventos
- Almacenamiento de la EVM

La elección de qué método utilizar se basa en varios criterios:

- La fuente de la información. La información en los datos de llamada no puede provenir directamente de la propia cadena de bloques.
- El destino de la información. Los datos de llamada solo están disponibles en la transacción que los incluye. Los eventos no son accesibles en cadena en absoluto.
- ¿Cuánta complicación es aceptable? Las computadoras que ejecutan un nodo completo pueden realizar más procesamiento que un cliente ligero en una aplicación que se ejecuta en un navegador.
- ¿Es necesario facilitar el acceso sencillo a la información desde cada nodo?
- Los requisitos de seguridad.

## Los requisitos de seguridad {#security-requirements}

En general, la seguridad de la información consta de tres atributos:

- _Confidencialidad_: las entidades no autorizadas no pueden leer la información. Esto es importante en muchos casos, pero no aquí. _No hay secretos en la cadena de bloques_. Las cadenas de bloques funcionan porque cualquiera puede verificar las transiciones de estado, por lo que es imposible usarlas para almacenar secretos directamente. Hay formas de almacenar información confidencial en la cadena de bloques, pero todas dependen de algún componente fuera de la cadena para almacenar al menos una clave.

- _Integridad_: la información es correcta, no puede ser modificada por entidades no autorizadas ni de formas no autorizadas (por ejemplo, transferir [tokens ERC-20](https://eips.ethereum.org/EIPS/eip-20#events) sin un evento `Transfer`). En la cadena de bloques, cada nodo verifica cada cambio de estado, lo que garantiza la integridad.

- _Disponibilidad_: la información está disponible para cualquier entidad autorizada. En la cadena de bloques, esto generalmente se logra al tener la información disponible en cada [nodo completo](https://ethereum.org/developers/docs/nodes-and-clients/#full-node).

Las diferentes soluciones aquí presentadas tienen una integridad excelente, porque los hashes se publican en la capa 1 (L1). Sin embargo, tienen diferentes garantías de disponibilidad.

## Requisitos previos {#prerequisites}

Debería tener una buena comprensión de los [conceptos básicos de la cadena de bloques](/developers/docs/intro-to-ethereum/). Esta página también asume que el lector está familiarizado con los [bloques](/developers/docs/blocks/), las [transacciones](/developers/docs/transactions/) y otros temas relevantes.

## Blobs de EIP-4844 {#eip-4844-blobs}

A partir de [la bifurcación dura Dencun](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/beacon-chain.md), la cadena de bloques de Ethereum incluye [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), que añade a Ethereum blobs de datos con una vida útil limitada (inicialmente unos [18 días](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/p2p-interface.md#configuration)). Estos blobs se cotizan por separado del [gas de ejecución](/developers/docs/gas), aunque utilizan un mecanismo similar. Son una forma económica de publicar datos temporales.

El caso de uso principal de los blobs de EIP-4844 es que los rollups publiquen sus transacciones. Los [rollups optimistas](/developers/docs/scaling/optimistic-rollups) necesitan publicar las transacciones en sus cadenas de bloques. Esas transacciones deben estar disponibles para cualquiera durante el [período de desafío](https://docs.optimism.io/connect/resources/glossary#challenge-period) para permitir a los [validadores](https://docs.optimism.io/connect/resources/glossary#validator) corregir el error si el [secuenciador](https://docs.optimism.io/connect/resources/glossary#sequencer) del rollup publica una raíz de estado incorrecta.

Sin embargo, una vez que ha pasado el período de desafío y la raíz de estado se ha finalizado, el propósito restante de conocer estas transacciones es replicar el estado actual de la cadena. Este estado también está disponible en los nodos de la cadena, requiriendo mucho menos procesamiento. Por lo tanto, la información de las transacciones aún debe conservarse en algunos lugares, como los [exploradores de bloques](/developers/docs/data-and-analytics/block-explorers), pero no hay necesidad de pagar por el nivel de resistencia a la censura que proporciona Ethereum.

Los [rollups de conocimiento cero](/developers/docs/scaling/zk-rollups/#data-availability) también publican los datos de sus transacciones para permitir que otros nodos repliquen el estado existente y verifiquen las pruebas de validez, pero nuevamente, ese es un requisito a corto plazo.

Al momento de escribir este artículo, publicar en EIP-4844 cuesta un Wei (10<sup>-18</sup> ETH) por byte, lo cual es insignificante en comparación con [los 21.000 de gas de ejecución que cuesta cualquier transacción, incluida una que publica blobs](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index). Puede ver el precio actual de EIP-4844 en [blobscan.com](https://blobscan.com/blocks).

Aquí están las direcciones para ver los blobs publicados por algunos rollups famosos.

| Rollup                               | Dirección del buzón (Mailbox)                                                                                                         |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Datos de llamada (Calldata) {#calldata}

Los datos de llamada (calldata) se refieren a los bytes enviados como parte de la transacción. Se almacenan como parte del registro permanente de la cadena de bloques en el bloque que incluye esa transacción.

Este es el método más económico para colocar datos de forma permanente en la cadena de bloques. El costo por byte es de 4 de gas de ejecución (si el byte es cero) o 16 de gas (cualquier otro valor). Si los datos están comprimidos, lo cual es una práctica estándar, entonces cada valor de byte tiene la misma probabilidad, por lo que el costo promedio es de aproximadamente 15,95 de gas por byte.

Al momento de escribir este artículo, los precios son de 12 Gwei/gas y 2300 $/ETH, lo que significa que el costo es de aproximadamente 45 centavos por kilobyte. Debido a que este era el método más barato antes de EIP-4844, este es el método que usaban los rollups para almacenar la información de las transacciones, la cual debe estar disponible para los [desafíos de fallas](https://docs.optimism.io/stack/protocol/overview#fault-proofs), pero no necesita ser accesible directamente en cadena.

Aquí están las direcciones para ver las transacciones publicadas por algunos rollups famosos.

| Rollup                               | Dirección del buzón (Mailbox)                                                                                                               |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## Fuera de la cadena con mecanismos de capa 1 (L1) {#offchain-with-l1-mechs}

Dependiendo de sus compensaciones de seguridad, podría ser aceptable colocar la información en otro lugar y usar un mecanismo que garantice que los datos estén disponibles cuando se necesiten. Hay dos requisitos para que esto funcione:

1. Publicar un [hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) de los datos en la cadena de bloques, llamado _compromiso de entrada_ (input commitment). Esto puede ser una sola palabra de 32 bytes, por lo que no es costoso. Mientras el compromiso de entrada esté disponible, la integridad está asegurada porque no es factible encontrar otros datos que den como resultado el mismo valor hash. Por lo tanto, si se proporcionan datos incorrectos, se puede detectar.

2. Tener un mecanismo que garantice la disponibilidad. Por ejemplo, en [Redstone](https://redstone.xyz/docs/what-is-redstone), cualquier nodo puede enviar un desafío de disponibilidad. Si el secuenciador no responde en cadena antes de la fecha límite, el compromiso de entrada se descarta, por lo que se considera que la información nunca se publicó.

Esto es aceptable para un rollup optimista porque ya dependemos de tener al menos un verificador honesto para la raíz de estado. Dicho verificador honesto también se asegurará de tener los datos para procesar bloques y emitirá un desafío de disponibilidad si la información no está disponible fuera de la cadena. Este tipo de rollup optimista se llama [Plasma](/developers/docs/scaling/plasma/).

## Código de contrato {#contract-code}

La información que solo necesita escribirse una vez, nunca se sobrescribe y necesita estar disponible en cadena se puede almacenar como código de contrato. Esto significa que creamos un "contrato inteligente" con los datos y luego usamos [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) para leer la información. La ventaja es que copiar código es relativamente barato.

Aparte del costo de expansión de memoria, `EXTCODECOPY` cuesta 2600 de gas para el primer acceso a un contrato (cuando está "frío") y 100 de gas para copias posteriores del mismo contrato, más 3 de gas por palabra de 32 bytes. En comparación con los datos de llamada (calldata), que cuestan 15,95 por byte, esto es más barato a partir de unos 200 bytes. Según [la fórmula para los costos de expansión de memoria](https://www.evm.codes/about#memoryexpansion), siempre que no necesite más de 4 MB de memoria, el costo de expansión de memoria es menor que el costo de agregar datos de llamada.

Por supuesto, este es solo el costo de _leer_ los datos. Crear el contrato cuesta aproximadamente 32.000 de gas + 200 de gas/byte. Este método solo es económico cuando la misma información necesita ser leída muchas veces en diferentes transacciones.

El código del contrato puede no tener sentido, siempre y cuando no comience con `0xEF`. Los contratos que comienzan con `0xEF` se interpretan como [formato de objeto de Ethereum (EOF)](https://notes.ethereum.org/@ipsilon/evm-object-format-overview), que tiene requisitos mucho más estrictos.

## Eventos {#events}

[Los eventos](https://docs.alchemy.com/docs/solidity-events) son emitidos por contratos inteligentes y leídos por software fuera de la cadena.
Su ventaja es que el código fuera de la cadena puede escuchar los eventos. El costo es en [gas](https://www.evm.codes/#a0?fork=cancun), 375 más 8 de gas por byte de datos. A 12 Gwei/gas y 2300 $/ETH, esto se traduce en un centavo más 22 centavos por kilobyte.

## Almacenamiento {#storage}

Los contratos inteligentes tienen acceso a [almacenamiento persistente](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory). Sin embargo, es muy costoso. Escribir una palabra de 32 bytes en un slot de almacenamiento previamente vacío puede [costar 22.100 de gas](https://www.evm.codes/#55?fork=cancun). A 12 Gwei/gas y 2300 $/ETH, esto es aproximadamente 61 centavos por operación de escritura, o $19,5 por kilobyte.

Esta es la forma de almacenamiento más cara en Ethereum.

## Resumen {#summary}

Esta tabla resume las diferentes opciones, sus ventajas y desventajas.

| Tipo de almacenamiento      | Fuente de datos     | Garantía de disponibilidad                                                                                                         | Disponibilidad en cadena                                         | Limitaciones adicionales                                                |
| --------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Blobs de EIP-4844           | Fuera de la cadena  | Garantía de Ethereum por [\~18 días](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/p2p-interface.md#configuration) | Solo el hash está disponible                                     |                                                                         |
| Datos de llamada (Calldata) | Fuera de la cadena  | Garantía de Ethereum para siempre (parte de la cadena de bloques)                                                                  | Solo disponible si se escribe en un contrato, y en esa transacción |                                                                         |
| Fuera de la cadena con mecanismos de capa 1 (L1) | Fuera de la cadena  | Garantía de "un verificador honesto" durante el período de desafío                                                                 | Solo el hash                                                     | Garantizado por el mecanismo de desafío, solo durante el período de desafío |
| Código de contrato          | En cadena o fuera de la cadena | Garantía de Ethereum para siempre (parte de la cadena de bloques)                                                                  | Sí                                                               | Escrito en una dirección "aleatoria", no puede comenzar con `0xEF` |
| Eventos                     | En cadena           | Garantía de Ethereum para siempre (parte de la cadena de bloques)                                                                  | No                                                               |                                                                         |
| Almacenamiento              | En cadena           | Garantía de Ethereum para siempre (parte de la cadena de bloques y el estado actual hasta que se sobrescriba)                      | Sí                                                               |                                                                         |