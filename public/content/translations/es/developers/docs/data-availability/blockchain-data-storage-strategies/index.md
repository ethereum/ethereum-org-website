---
title: Estrategias para el almacenamiento de datos en la cadena de bloques
description: Existen varias formas de guardar datos utilizando la cadena de bloques. En este artículo compararemos las distintas estrategias, sus costos y desventajas, como también los requerimientos para el uso de forma segura.
lang: es
---

Existen varias formas para guardar información ya sea directamente en la cadena o de una forma asegurada por la cadena:

- Blobs EIP-4844
- Calldata
- Fuera de la cadena con mecanismos L1
- "Código" de contrato
- Eventos
- Almacenamiento en la EVM

La elección de qué mecanismos usar está basada en diversos criterios:

- La fuente de la información. La información en calldata no puede provenir directamente de la cadena de bloques.
- El destino de la información. El Calldata solo está disponible en la transacción que inicia. Los eventos no son accesibles en la cadena.
- ¿Cuánto inconveniente es aceptable? Las computadoras que ejecuta un nodo de plena escala tienen la capacidad de procesar más que un cliente ligero en una aplicación que está siendo ejecutada desde un navegador.
- ¿Es necesario que todos los nodos puedan fácilmente acceder a la información?
- Requerimientos de seguridad.

## Los requerimientos de seguridad {#security-requirements}

En general, la seguridad de la información abarca tres atributos:

- _Confidencialidad_: Las entidades no autorizadas no tienen permitido leer la información. Esto importa en muchos casos, pero no aquí. _No hay secretos en la cadena de bloques_. Las cadenas de bloques funcionan porque cualquiera puede verificar las transiciones de estado, entonces resulta imposible utilizarlas para guardar secretos directamente. Existen formas de guardar confidencialmente la información en la cadena de bloques, pero todas dependen de algún componente offchain para guardar aunque sea una clave.

- _Integridad_: La información es correcta, no puede ser modificada por entidades no autorizadas o de formas que no hayan sido autorizadas (por ejemplo, transferir [tokens ERC-20](https://eips.ethereum.org/EIPS/eip-20#events) sin un evento Transfer). En la cadena de bloques, cada nodo verifica cada cambio de estado, lo cual garantiza la integridad de la información.

- _Disponibilidad_: La información está disponible para toda entidad autorizada. En la cadena de bloques, esto se suele lograr teniendo a disposición la información en cada [nodo completo](https://ethereum.org/es/developers/docs/nodes-and-clients#full-node).

Las soluciones diferentes presentadas tienen todas una excelente integridad, dado que los hashes se publican en L1. Sin embargo, tienen guarantías de disponibilidad distintas.

## Requisitos previos {#prerequisites}

Para continuar leyendo, debería tener un buen entendimiento de [los fundamentos de la cadena de bloques](/developers/docs/intro-to-ethereum/). Esta página asume también que el lector tiene familiaridad con los [bloques](/developers/docs/blocks/), las [transacciones](/developers/docs/transactions/) y otros temas relevantes.

## Blobs EIP-4844 {#eip-4844-blobs}

Comenzando con la [bifuración dura de Dencun](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/beacon-chain.md), la cadena de bloques de Ethereum incluye [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), que agrega blobs de datos en Ethereum con un tiempo de vida limitado (de incialmente unos [18 días](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration)). Los precios de estos blobs de datos se calculan aparte del [gas de ejecución](/developers/docs/gas), aunque utilizando un mecanismo similar. Son una forma más económica de publicar datos temporales.

El caso de uso principal para los blobs EIP-4844 es la publicación de las transacciones por parte de los rollups. Los [rollups optimistas](/developers/docs/scaling/optimistic-rollups) nenecesitan publicar las transacciones en sus cadenas de bloques. Esas transacciones deben estar disponibles para que cualquier persona pueda desafiarlas (cuestionarlas) durante el [período de desafío](https://docs.optimism.io/connect/resources/glossary#challenge-period) para permitir que los [validadores](https://docs.optimism.io/connect/resources/glossary#validator)
puedan resolver errores en caso de que el [secuenciador](https://docs.optimism.io/connect/resources/glossary#sequencer) de los rollups publique incorrectamente la raíz de estado.

Sin embargo, una vez que se termina el período de desafío y la raíz de estado se encuentre finalizada, el propósito restante para conocer estas transacciones es replicar el estado actual de la cadena. Este estado también se encuentra disponible en los nodos que forman parte de la cadena, con menor cantidad de procesamiento requerido. Así, la información de las transacciones debe preservarse en algunos lugares, como los [exploradores de bloques](/developers/docs/data-and-analytics/block-explorers), pero no es necesario pagar por el nivel de resistencia a la censura que proporciona Ethereum.

Los [rollups de conocimiento cero](/developers/docs/scaling/zk-rollups/#data-availability) también publican los datos de sus transacciones para permitir que otros nodos puedan replicar el estado existente y verificar pruebas de validez, pero, de nuevo, ese requerimiento es de corto plazo.

Al escribir este artículo, publicar en EIP-4844 cuesta un wei (10<sup>-18</sup> ETH) por byte, lo cual es insignificante en comparación con [el gas de ejecución de 21.000 que cuesta cualquier transacción, incluida una que publique blobs](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index). Puede consultar el precio actualizado de EIP-4844 en [blobscan.com](https://blobscan.com/blocks).

Para consultar los blobs publicados por rollups conocidos, puede utilizar las siguientes direcciones.

| Rollup                               | Dirección de buzón                                                                                                      |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Calldata {#calldata}

Calldata se refiere a los bytes enviados como parte de las transacciones. Se guardan como parte del registro permanente de la cadena de bloques en el bloque que contiene aquella transacción.

Este es el método más económico para lograr almacenar datos en la cadena de bloques de forma permanente. El costo per byte es 4 gas de ejecución (en caso de que el byte sea 0) o 16 gas (para cualquier otro valor). Si los datos están comprimidos, práctica estándar, entonces cada byte tiene igual probabilidad, por lo que el costo promedio es de aproximadamente 15,95 gas por byte.

Al momento de la escritura de este artículo, los precios son 12 gwei/gas y 2300 $/ETH, esto es, un costo aproximado de 45 centavos por kilobyte. Dado que esta era la forma más económica previo a la implementación de EIP-4844, este es el método que los rollups utilizaban para guardan información de las transacciones, que debe estar disponible para los [desafíos de falla](https://docs.optimism.io/stack/protocol/overview#fault-proofs), pero no necesita ser directamente accesible en la cadena.

Estas son las direcciones para ver las transacciones publicadas por algunos rollups reconocidos.

| Rollup                               | Dirección de buzón                                                                                                            |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## Fuera de la cadena con mecanismos L1 {#offchain-with-l1-mechs}

Dependiendo en sus preferencias de seguridad, puede resultar aceptable poner la información en otro lugar y utilizar mecanismos que aseguren que los datos se encuentren disponibles cuando se los necesite. Hay dos requerimientos para que esto funcione:

1. Publicar un [hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) de los datos en la cadena de bloques, lo que se conoce como _input commitment_. Puede tratarse de una única palabra de 32 bytes, así que no resulta costoso. Mientras el input commitment esté disponible, se asegura la integridad de la información porque no es viable encontrar otros datos que puedan resultar en un mismo hash. De esta forma, si se proporcionan datos incorrectos, se podrán detectar.

2. Tener un mecanismo que asegure la disponibilidad. Por ejemplo, en [Redstone](https://redstone.xyz/docs/what-is-redstone) cualquier nodo puede desafiar la disponibilidad de los datos. Si el secuenciador no responde en la cadena antes del límite de tiempo establecido, el input commitment se descarta. Al descartarla, la información se considera como si nunca hubiera sido publicada.

Esto es aceptable para un rollup optimista porque ya dependemos en la existencia de aunque sea un verificador honesto que verifique el estado de la raíz. Un verificador honesto también se asegurará de tener los datos para procesar bloques y emitirá un desafío de disponibilidad si la información no está disponible fuera de la cadena. Este tipo de rollup optimista se llama [plasma](/developers/docs/scaling/plasma/).

## Código de contrato {#contract-code}

La información que solo necesita escribirse una única vez nunca se sobreescribe y necesita estar disponible en la cadena para almacenarse como código de contrato. Esto significa que creamos un "contrato inteligente" con los datos y, luego, utilizamos [EXTCODECOPY](https://www.evm.codes/#3c?fork=shanghai) para leer la información. La ventaja es que copiar código es relativamente económico.

Salvando el costo de expandir la memoria, EXTCODECOPY cuesta 2600 gas por la primera vez que se accede a un contrato (cuando está "frío") y 100 gas por copias subsiguientes del mismo contrado, más 3 gas por cada palabra de 32 bytes. Comparado con calldata, que cuesta 15,95 por byte, este método es más económico comenzando en unos 200 bytes. Con base en [la fórmula de costo de expansión de memoria](https://www.evm.codes/about#memoryexpansion), mientras no precise más de 4 MB de memoria, el costo de expansión de memoria es menor que el costo de añadir calldata.

Por supuesto, esto es solo el costo de _leer_ los datos. Crear el contrato cuesta aproximadamente 32.000 gas + 200 gas/byte. Este método es económico únicamente cuando la misma información debe leerse múltiples veces en distintas transacciones.

El código de contrato puede carecer de sentido, siempre y cuando no comience con `0xEF`. Los contratos que comienzan con `0xEF` se interpretan como [formato de objeto de ethereum](https://notes.ethereum.org/@ipsilon/evm-object-format-overview), que tiene requisitos más estrictos.

## Eventos {#events}

Los [eventos](https://docs.alchemy.com/docs/solidity-events) son emitidos por contratos inteligentes y leídos por software fuera de la cadena.
Su ventaja es que el código fuera de la cadena puede escuchar eventos. El costo es [gas](https://www.evm.codes/#a0?fork=cancun), 375 sumado a 8 gas por byte de datos. Con los precios a 12 gwei/gas y 2300 $/ETH, esto se traduce en un centavo más 22 centavos por kilobyte.

## Almacenamiento {#storage}

Los contratos inteligentes tienen acceso a [almacenamiento persistente](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory). Sin embargo, es muy costoso. Escribir una palabra de 32 bytes en una ranura de almacenamiento previamente vacía puede [costar 22.100 gas](https://www.evm.codes/#55?fork=cancun). Con los precios a 12 gwei/gas y 2300 $/ETH, esto es aproximadamente 61 centavos por operación de escritura, o $19,5 por kilobyte.

Esta es la forma de almacenamiento más cara en Ethereum.

## Resumen {#summary}

Esta tabla resume las diferentes opciones, sus ventajas y desventajas.

| Tipos de almacenamiento              | Fuente de datos           | Garantía de disponibilidad                                                                                                                            | Disponibilidad en la cadena                                        | Limitaciones adicionales                                                          |
| ------------------------------------ | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| Blobs EIP-4844                       | Fuera de la cadena        | Garantiza de Ethereum por [~18 días](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration) | Solo el hash está disponible                                       |                                                                                   |
| Calldata                             | Fuera de la cadena        | Garantía de Ethereum para siempre (parte de la cadena de bloques)                                                                  | Solo disponible si se escribe en un contrato, y en esa transacción |                                                                                   |
| Fuera de la cadena con mecanismos L1 | Fuera de la cadena        | Garantía de "un verificador honesto" durante el período de desafío                                                                                    | Hash solamente                                                     | Garantizado por el mecanismo de desafío, únicamente durante el período de desafío |
| Código de contrato                   | En cadena o fuera de ella | Garantía de Ethereum para siempre (parte de la cadena de bloques)                                                                  | Sí                                                                 | Escrito en una dirección aleatoria, no puede comenzar con `0xEF`                  |
| Eventos                              | En cadena                 | Garantía de Ethereum para siempre (parte de la cadena de bloques)                                                                  | No                                                                 |                                                                                   |
| Almacenamiento                       | En cadena                 | Garantía de Ethereum para siempre (parte de la cadena de bloques y el estado actual hasta que se sobrescriba)                      | Sí                                                                 |                                                                                   |
