---
title: Pectra
metaTitle: Prague-Electra (Pectra)
description: Aprenda sobre la actualización del protocolo Pectra
lang: es
authors: ["Nixo", "Mario Havel"]
---

La actualización de la red Pectra siguió a [Dencun](/roadmap/dencun/) y trajo cambios tanto a la capa de ejecución como a la capa de consenso de Ethereum. El nombre abreviado Pectra es una combinación de Prague y Electra, que son los nombres respectivos para los cambios en las especificaciones de la capa de ejecución y la capa de consenso. Juntos, estos cambios aportan una serie de mejoras a los usuarios, desarrolladores y validadores de [Ethereum](/).

Esta actualización se activó con éxito en la red principal de Ethereum en la época `364032`, el **07 de mayo de 2025 a las 10:05 (UTC)**.

<Alert variant="update">
<AlertContent>
<AlertDescription>
La actualización Pectra es solo un paso en los objetivos de desarrollo a largo plazo de Ethereum. Obtenga más información sobre [la hoja de ruta del protocolo](/roadmap/) y [las actualizaciones anteriores](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Mejoras en Pectra {#new-improvements}

¡Pectra trae el mayor número de [EIP](https://eips.ethereum.org/) de todas las actualizaciones anteriores! Hay muchos cambios menores, pero también algunas características nuevas significativas. La lista completa de cambios y detalles técnicos se puede encontrar en los EIP individuales incluidos.

### Código de cuenta EOA {#7702}

[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) representa un gran paso hacia la adopción generalizada de la [abstracción de cuentas](/roadmap/account-abstraction/). Con esta característica, los usuarios pueden configurar su dirección ([EOA](/glossary/#eoa)) para que se amplíe con un contrato inteligente. El EIP introduce un nuevo tipo de transacción con una función específica: permitir a los propietarios de direcciones firmar una autorización que configure su dirección para imitar un contrato inteligente elegido. 

Con este EIP, los usuarios pueden optar por billeteras programables que permiten nuevas características como la agrupación de transacciones, transacciones sin gas y acceso a activos personalizados para esquemas de recuperación alternativos. Este enfoque híbrido combina la simplicidad de las EOA con la programabilidad de las cuentas basadas en contratos. 

Lea una exploración detallada sobre el 7702 [aquí](/roadmap/pectra/7702/)

### Aumento del saldo efectivo máximo {#7251}

El saldo efectivo actual del validador es exactamente de 32 ETH. Es la cantidad mínima necesaria para participar en el consenso, pero al mismo tiempo el máximo que un solo validador puede hacer staking.

[EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) eleva el saldo efectivo máximo posible a 2048 ETH, lo que significa que un solo validador ahora puede hacer staking de entre 32 y 2048 ETH. En lugar de múltiplos de 32, los participantes (stakers) ahora pueden elegir una cantidad arbitraria de ETH para hacer staking y recibir recompensas por cada 1 ETH por encima del mínimo. Por ejemplo, si el saldo de un validador crece con sus recompensas a 33 ETH, el 1 ETH adicional también se considera parte del saldo efectivo y recibe recompensas.

Pero el beneficio de un mejor sistema de recompensas para los validadores es solo una parte de esta mejora. Los [stakers](/staking/) que ejecutan múltiples validadores ahora pueden agregarlos en uno solo, lo que facilita la operación y reduce la sobrecarga de la red. Debido a que cada validador en la cadena de balizas envía una firma en cada época, los requisitos de ancho de banda crecen con más validadores y una gran cantidad de firmas para propagar. La agregación de validadores quitará carga de la red y abrirá nuevas opciones de escalabilidad manteniendo la misma seguridad económica.

Lea una exploración detallada sobre MaxEB [aquí](/roadmap/pectra/maxeb/)

### Aumento de la capacidad de procesamiento de blobs {#7691}

Los blobs proporcionan [disponibilidad de datos](/developers/docs/data-availability/#data-availability-and-layer-2-rollups) para las L2. Se introdujeron en [la actualización de red anterior](/roadmap/dencun/). 

Actualmente, la red tiene como objetivo un promedio de 3 blobs por bloque con un máximo de 6 blobs. Con [EIP-7691](https://eips.ethereum.org/EIPS/eip-7691), el recuento promedio de blobs se incrementará a 6, con un máximo de 9 por bloque, lo que resultará en una mayor capacidad para los rollups de Ethereum. Este EIP ayuda a cerrar la brecha hasta que [PeerDAS](https://eips.ethereum.org/EIPS/eip-7594) permita recuentos de blobs aún mayores.

### Aumento del costo de los datos de llamada {#7623}

Antes de la introducción de los [blobs en la actualización Dencun](/roadmap/danksharding), las L2 usaban [datos de llamada](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata) para almacenar sus datos en Ethereum. Tanto los blobs como los datos de llamada afectan el uso del ancho de banda de Ethereum. Si bien la mayoría de los bloques solo usan una cantidad mínima de datos de llamada, los bloques con gran cantidad de datos que también contienen muchos blobs pueden ser perjudiciales para la red p2p de Ethereum. 

Para abordar esto, [EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) aumenta el precio de los datos de llamada, pero solo para transacciones con gran cantidad de datos. Esto limita el tamaño del bloque en el peor de los casos, proporciona un incentivo para que las L2 solo usen blobs y deja a más del 99 % de las transacciones sin afectar.

### Salidas activables desde la capa de ejecución {#7002}

Actualmente, la salida de un validador y [el retiro del ETH en staking](/staking/withdrawals/) es una operación de la capa de consenso que requiere una clave de validador activa, la misma clave BLS utilizada por el validador para realizar tareas activas como atestaciones. Las credenciales de retiro son una clave fría separada que recibe la participación retirada pero no puede activar la salida. La única forma de que los stakers salgan es enviar un mensaje especial a la red de la cadena de balizas firmado con la clave de validador activa. Esto es limitante en escenarios donde las credenciales de retiro y la clave del validador están en manos de diferentes entidades o cuando la clave del validador se pierde.

[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) introduce un nuevo contrato que se puede usar para activar la salida utilizando las credenciales de retiro de la capa de ejecución. Los stakers podrán salir de su validador llamando a una función en este contrato especial sin la necesidad de su clave de firma de validador ni acceso a la cadena de balizas en absoluto. Es importante destacar que habilitar los retiros de validadores en cadena permite protocolos de staking con supuestos de confianza reducidos sobre los operadores de nodos.

### Depósitos de validadores en cadena {#6110}

Los depósitos de validadores actualmente son procesados por [eth1data poll](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/), que es una función en la cadena de balizas que obtiene datos de la capa de ejecución. Es una especie de deuda técnica de los tiempos anteriores a La Fusión, cuando la cadena de balizas era una red separada y tenía que preocuparse por las reorganizaciones de la prueba de trabajo (PoW). 

[EIP-6110](https://eips.ethereum.org/EIPS/eip-6110) es una nueva forma de entregar depósitos desde la capa de ejecución a la capa de consenso, lo que permite un procesamiento instantáneo con menor complejidad de implementación. Es una forma más segura de manejar depósitos nativos del Ethereum fusionado. También ayuda a preparar el protocolo para el futuro porque no requiere depósitos históricos para iniciar el nodo, lo cual es necesario para la expiración del historial.

### Precompilado para BLS12-381 {#2537}

Los precompilados son un conjunto especial de contratos inteligentes integrados directamente en la Máquina Virtual de Ethereum ([EVM](/developers/docs/evm/)). A diferencia de los contratos regulares, los precompilados no son implementados por los usuarios, sino que forman parte de la propia implementación del cliente, escritos en su lenguaje nativo (por ejemplo, Go, Java, etc., no Solidity). Los precompilados sirven para funciones estandarizadas y ampliamente utilizadas, como operaciones criptográficas. Los desarrolladores de contratos inteligentes pueden llamar a los precompilados como un contrato regular, pero con mayor seguridad y eficiencia.

[EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) agrega nuevos precompilados para operaciones de curva sobre [BLS12-381](https://hackmd.io/@benjaminion/bls12-381). Esta curva elíptica se volvió ampliamente utilizada en los ecosistemas de criptomonedas gracias a sus propiedades prácticas. Más específicamente, ha sido adoptada por la capa de consenso de Ethereum, donde es utilizada por los validadores.

El nuevo precompilado agrega la capacidad para que cada desarrollador realice de manera fácil, eficiente y segura operaciones criptográficas utilizando esta curva, por ejemplo, verificando firmas. Las aplicaciones en cadena que dependen de esta curva pueden volverse más eficientes en cuanto a gas y más seguras al depender de un precompilado en lugar de algún contrato personalizado. Esto se aplica principalmente a las aplicaciones que desean razonar sobre los validadores dentro de la EVM, por ejemplo, los pools de staking, el [restaking](/restaking/), los clientes ligeros, los puentes, pero también el conocimiento cero.

### Servir hashes de bloques históricos desde el estado {#2935}

La EVM actualmente proporciona el código de operación `BLOCKHASH` que permite a los desarrolladores de contratos recuperar el hash de un bloque directamente en la capa de ejecución. Sin embargo, esto se limita solo a los últimos 256 bloques y podría volverse problemático para los clientes sin estado en el futuro.

[EIP-2935](https://eips.ethereum.org/EIPS/eip-2935) crea un nuevo contrato de sistema que puede servir los últimos 8192 hashes de bloques como ranuras de almacenamiento. Esto ayuda a preparar el protocolo para el futuro para la ejecución sin estado y se vuelve más eficiente cuando se adoptan los árboles verkle. Sin embargo, aparte de esto, los rollups pueden beneficiarse de esto de inmediato, ya que pueden consultar el contrato directamente con una ventana histórica más larga.

### Mover el índice del comité fuera de la atestación {#7549}

El consenso de la cadena de balizas se basa en que los validadores emitan sus votos para el último bloque y la época finalizada. La atestación incluye 3 elementos, 2 de los cuales son votos y el tercero es el valor del índice del comité.

[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) mueve este índice fuera del mensaje de atestación firmado, lo que facilita la verificación y agregación de los votos de consenso. Esto permitirá una mayor eficiencia en cada cliente de consenso y puede aportar mejoras significativas de rendimiento a los circuitos de conocimiento cero para probar el consenso de Ethereum.

### Agregar programación de blobs a los archivos de configuración de la capa de ejecución {#7840}

[EIP-7840](https://eips.ethereum.org/EIPS/eip-7840) es un cambio simple que agrega un nuevo campo a la configuración del cliente de la capa de ejecución. Configura el número de bloques, lo que permite una configuración dinámica para los recuentos de blobs objetivo y máximo por bloque, así como el ajuste de la tarifa de blob. Con una configuración definida directamente, los clientes pueden evitar la complejidad de intercambiar esta información a través de la API del motor (Engine API).

<Alert variant="update">
<AlertContent>
<AlertDescription>
Para obtener más información sobre cómo le afecta Pectra específicamente como usuario, desarrollador o validador de Ethereum, consulte las <a href="https://epf.wiki/#/wiki/pectra-faq">Preguntas frecuentes sobre Pectra</a>.
</AlertDescription>
</AlertContent>
</Alert>

## ¿Esta actualización afecta a todos los nodos y validadores de Ethereum? {#client-impact}

Sí, la actualización Pectra requiere actualizaciones tanto para los [clientes de ejecución como para los clientes de consenso](/developers/docs/nodes-and-clients/). Todos los clientes principales de Ethereum lanzarán versiones que admitan la bifurcación dura marcadas como de alta prioridad. Para mantener la sincronización con la red Ethereum después de la actualización, los operadores de nodos deben asegurarse de que están ejecutando una versión de cliente compatible. Tenga en cuenta que la información sobre las versiones de los clientes es urgente, y los usuarios deben consultar las últimas actualizaciones para obtener los detalles más recientes.

## ¿Cómo se puede convertir ETH después de la bifurcación dura? {#scam-alert}

- **No se requiere ninguna acción para su ETH**: Después de la actualización Pectra de Ethereum, no hay necesidad de convertir o actualizar su ETH. Los saldos de sus cuentas seguirán siendo los mismos, y el ETH que posee actualmente seguirá siendo accesible en su forma actual después de la bifurcación dura.
- **¡Cuidado con las estafas!** <Emoji text="⚠️" /> **cualquiera que le indique que "actualice" su ETH está intentando estafarle.** No hay nada que deba hacer en relación con esta actualización. Sus activos permanecerán completamente inalterados. Recuerde, mantenerse informado es la mejor defensa contra las estafas.

[Más sobre cómo reconocer y evitar estafas](/security/)

## ¿Aprende mejor de forma visual? {#visual-learner}

<VideoWatch slug="pectra-upgrade-overview" />

_¿Qué incluye la actualización Pectra? - Christine Kim_

<VideoWatch slug="pectra-what-stakers-need-to-know" />

_Actualización Pectra de Ethereum: Lo que los stakers necesitan saber — Blockdaemon_

## Lecturas adicionales {#further-reading}

- [Hoja de ruta de Ethereum](/roadmap/)
- [Preguntas frecuentes sobre Pectra](https://epf.wiki/#/wiki/pectra-faq)
- [Página de información de Pectra.wtf](https://pectra.wtf)
- [Cómo Pectra mejora la experiencia del staker](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Página de información del EIP-7702](https://eip7702.io/)
- [Redes de desarrollo (devnets) de Pectra](https://github.com/ethereum/pm/blob/master/Network-Upgrade-Archive/Pectra/pectra-pm.md)