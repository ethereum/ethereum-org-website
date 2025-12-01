---
title: Prague-Electra (Pectra)
description: Conozca la actualización del protocolo Pectra
lang: es
---

# Pectra {#pectra}

La actualización de la red Pectra se efectuó tras [Dencun](/roadmap/dencun/) e introdujo cambios en la capa de ejecución y en la capa de consenso de Ethereum. La abreviatura Pectra es una combinación de «Prague» y «Electra», que son los nombres de los cambios en las especificaciones de la capa de ejecución y la capa de consenso, respectivamente. Juntos, estos cambios aportan una serie de mejoras para los usuarios, desarrolladores y validadores de Ethereum.

Esta actualización se activó con éxito en la red principal de Ethereum en la época `364032`, el **7 de mayo de 2025 a las 10:05 (UTC)**.

<InfoBanner>
La actualización de Pectra es solo un paso dentro de los objetivos de desarrollo a largo plazo de Ethereum. Conozca mejor [la hoja de ruta del protocolo](/roadmap/) y las [actualizaciones anteriores](/history/).
</InfoBanner>

## Mejoras en Pectra {#new-improvements}

¡Pectra ofrece mayor número de [EIP](https://eips.ethereum.org/) que cualquier actualización anterior! Existen muchos cambios menores, pero también nuevas funcionalidades significativas. La lista completa de cambios y detalles técnicos está disponible en cada uno de los EIP incluidos.

### Código de cuenta EOA {#7702}

La [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) representa un gran avance hacia la adopción generalizada de la [abstracción de cuentas](/roadmap/account-abstraction/). Con esta funcionalidad, los usuarios pueden configurar su dirección ([EOA](/glossary/#eoa)) para ampliarla con un contrato inteligente. La EIP introduce un nuevo tipo de transacción con una función específica: permitir a los propietarios de direcciones firmar una autorización que configura su dirección para imitar un contrato inteligente elegido.

Con esta EIP, los usuarios pueden optar por carteras programables que permiten nuevas funcionalidades como agrupación de transacciones, transacciones sin gas y acceso a activos personalizados para esquemas de recuperación alternativos. Este enfoque híbrido combina la simplicidad de las EOA con la programabilidad de las cuentas basadas en contratos.

Consulte la EIP-7702 [aquí](/roadmap/pectra/7702/)

### Incremente el balance efectivo máximo {#7251}

El balance efectivo actual del validador es exactamente 32 ETH. Es la cantidad mínima necesaria para participar en el consenso, pero a la vez es el máximo que un solo validador puede apostar.

La [EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) aumenta el balance efectivo máximo permitido a 2048 ETH, lo que significa que un solo validador ahora puede apostar entre 32 y 2048 ETH. En lugar de múltiplos de 32, los participantes pueden elegir una cantidad arbitraria de ETH para apostar y recibir recompensas por cada 1 ETH adicional sobre el mínimo. Por ejemplo, si el balance de un validador crece con sus recompensas hasta 33 ETH, ese 1 ETH extra también se considera parte del balance efectivo y genera recompensas.

Sin embargo, la ventaja de un mejor sistema de recompensas para los validadores es solo una parte de esta mejora. Los participantes [stakers] (/staking/) que ejecutan varios validadores ahora pueden agregarlos en uno solo, esto simplifica la operación y reduce la sobrecarga de la red. Como cada validador en la cadena de baliza envía una firma en cada época, los requisitos de ancho de banda aumentan con más validadores y una gran cantidad de firmas que propagar. La agregación de validadores aliviará la carga de la red y abrirá nuevas opciones de escalabilidad, manteniendo la misma seguridad económica.

Lea más sobre maxEB [aquí](/roadmap/pectra/maxeb/)

### Aumento del rendimiento de blobs {#7691}

Los blobs proporcionan [disponibilidad de datos](/developers/docs/data-availability/#data-availability-and-layer-2-rollups) para las soluciones L2. Se introdujeron en la [anterior actualización de red](/roadmap/dencun/).

Actualmente, la red apunta a un promedio de 3 blobs por bloque, con un máximo de 6 blobs. Con [EIP-7691](https://eips.ethereum.org/EIPS/eip-7691), el promedio de blobs aumentará a 6, con un máximo de 9 por bloque, lo que supondrá un aumento de la capacidad de los rollups de Ethereum. Esta EIP salva la brecha hasta que [PeerDAS](https://eips.ethereum.org/EIPS/eip-7594) permita un número aún mayor de blobs.

### Aumento del coste de datos de llamada{#7623}

Antes de la introducción de [blobs en la actualización Dencun](/roadmap/danksharding), las capas 2 utilizaban [calldata](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata) para almacenar sus datos en Ethereum. Ambos, los blobs y los calldata, afectan al uso del ancho de banda de Ethereum. Aunque la mayoría de los bloques solo utilizan una cantidad mínima de calldata, los bloques con gran volumen de datos que también contienen muchos blobs pueden ser perjudiciales para la red p2p de Ethereum.

Para solucionarlo, la [EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) aumenta el coste de los calldata, pero solo para transacciones con un gran volumen de datos. Esto limita el tamaño máximo de los bloques, incentiva a las redes Capa 2 a solo utilizar blobs y evita que más del 99 % de las transacciones se vean afectadas.

### Salidas activables de la capa de ejecución {#7002}

Actualmente, salir de un validador y [retirar ETH apostados](/staking/withdrawals/) es una operación de la capa de consenso que requiere una clave de validador activa, la misma clave BLS la usa el validador para hacer tareas activas como las certificaciones. Las credenciales de retirada son una clave en fría independiente que recibe la participación retirada, pero que no puede activar la salida. La única forma en que los participantes pueden salir es enviando un mensaje especial a la red de cadena de bloques firmado con la clave de validador activa. Esto es una limitación en situaciones en las que las credenciales de retirada y la clave de validación están en manos de entidades diferentes o cuando se pierde la clave de validación.

La [EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) introduce un nuevo contrato que se puede utilizar para activar la salida utilizando credenciales de retirada de la capa de ejecución. Los participantespodrán salir de su validador activando a una función en este contrato especial sin necesidad de su clave de firma del validador ni de acceso a la cadena de baliza. Es importante destacar que habilitar las retirasas de validadores en la cadena de bloques permite la creación de protocolos de participación que requieren un menor nivel de confianza en los operadores de nodos.

### Depósitos de validadores en la cadena {#6110}

Los depósitos de los validadores actualmente se procesan mediante [eth1data poll](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/), una función de la cadena de baliza que obtiene datos de la capa de ejecución. Es una especie de deuda técnica anterior a la Fusión, cuando la cadena de baliza era una red independiente y se ocupaba de reorganizar las pruebas de trabajo.

La EIP-6110](https://eips.ethereum.org/EIPS/eip-6110) es una nueva forma de enviar depósitos desde la capa de ejecución a la capa de consenso, lo que permite un procesamiento instantáneo con menos complejidad de implementación. Es un método más seguro para manejar los depósitos nativos de Ethereum fusionado. Además, ayuda a preparar el protocolo para el futuro, ya que no requiere depósitos históricos para inicializar el nodo, lo cual es necesario para el vencimiento del historial.

### Precompilado para BLS12-381 {#2537}

Los precompilados son un conjunto especial de contratos inteligentes incorporados directamente en la máquina virtual de Ethereum ([EVM](/developers/docs/evm/)). A diferencia de los contratos regulares, los precompilados no los desplegan los usuarios, sino que forman parte de la implementación del cliente, escritos en su lenguaje nativo (por ejemplo, Go, Java, etc., no Solidity). Los precompilados sirven para funciones ampliamente utilizadas y estandarizadas, como las operaciones criptográficas. Los desarrolladores de contratos inteligentes pueden llamar a los precompilados como a un contrato regular, pero con mayor seguridad y eficiencia.

La [EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) agrega nuevos precompilados para operaciones sobre la curva [BLS12-381](https://hackmd.io/@benjaminion/bls12-381). Esta curva elíptica se ha vuelto ampliamente utilizada en los ecosistemas de criptomonedas gracias a sus propiedades prácticas. Más específicamente, ha sido adoptada por la capa de consenso de Ethereum, donde la utilizan los validadores.

El nuevo precompilado permite que cualquier desarrollador realice de manera fácil, eficiente y segura operaciones criptográficas usando esta curva, por ejemplo, la verificación de firmas. Las aplicaciones en la cadena de bloques que dependen de esta curva pueden volverse más eficientes en gas y seguras al apoyarse en un precompilado en lugar de un contrato personalizado. Esto se aplica principalmente a aplicaciones que requieren interactuar con validadores dentro de la EVM, como reservas de participaciones, reparticipaciones, clientes ligeros, puentes y también aplicaciones de conocimiento cero.

### Obtener hashes de bloques históricos desde el estado {#2935}

Actualmente, la EVM proporciona el código operativo BLOCKHASH, que permite a los desarrolladores de contratos obtener el hash de un bloque directamente en la capa de ejecución. Sin embargo, esto está limitado únicamente a los últimos 256 bloques y podría presentar problemas a los clientes sin estado en el futuro.

La [EIP-2935](https://eips.ethereum.org/EIPS/eip-2935) crea un nuevo contrato de sistema que puede proporcionar los hashes de los últimos 8192 bloques como ranuras de almacenamiento. Esto ayuda a preparar el protocolo para una ejecución sin estado y se vuelve más eficiente cuando se adopten los Verkle Tries. Además de esto, los rollups pueden beneficiarse de inmediato, ya que pueden consultar el contrato directamente con una ventana histórica más amplia.

### Mover el índice del comité fuera de la certificación {#7549}

El consenso de la cadena de bloques se basa en que los validadores emitan sus votos sobre el último bloque y la época finalizada. La certificación incluye 3 elementos: 2 de ellos son votos y el tercero es el valor del índice del comité.

La EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) mueve este índice fuera del mensaje de certificación firmado, lo que facilita la verificación y agregación de los votos de consenso. Esto permitirá una mayor eficiencia en todos los clientes de consenso y puede aportar mejoras significativas de rendimiento en los circuitos de conocimiento cero utilizados para probar el consenso de Ethereum.

### Agregar el cronograma de blobs a los archivos de configuración de la capa de ejecución {#7840}

La [EIP-7840](https://eips.ethereum.org/EIPS/eip-7840) es un cambio sencillo que añade un nuevo campo a la configuración del cliente de la capa de ejecución. Configura el número de bloques, permitiendo establecer de forma dinámica los conteos objetivo y máximo de blobs por bloque, así como el ajuste de las tarifas de blobs. Con esta configuración definida directamente, los clientes pueden evitar la complejidad de intercambiar esta información a través de la Engine API.

<InfoBanner>
Para obtener más información sobre cómo Pectra puede afectarle como usuario, desarrollador o validador de Ethereum, consulte las <a href="https://epf.wiki/#/wiki/pectra-faq">Preguntas frecuentes sobre Pectra</a>.</InfoBanner>

## ¿Afecta esta actualización a todos los nodos y validadores de Ethereum? {#client-impact}

Sí, la actualización Pectra requiere actualizar los [clientes de ejecución y clientes de consenso](/developers/docs/nodes-and-clients/). Todos los principales clientes de Ethereum lanzarán versiones compatibles con la bifurcación dura marcada como alta prioridad. Para mantener la sincronización con la red de Ethereum posactualización, los operadores de nodos deben asegurarse de que están ejecutando una versión de cliente compatible. Tenga en cuenta que la información sobre las versiones de los clientes es sensible al tiempo, y los usuarios deben consultar las últimas actualizaciones para obtener los últimos detalles.

## ¿Cómo se puede convertir ETH después de la bifurcación dura? {#scam-alert}

- **No se requiere ninguna acción para su ETH**: Después de la actualización Pectra de Ethereum, no hay necesidad de convertir o actualizar su ETH. Los saldos de su cuenta seguirán siendo los mismos, y el ETH que tiene actualmente seguirá siendo accesible en su forma existente después de la bifurcación dura.
- **¡Cuídese de fraudes!** <Emoji text="⚠️" /> **Cualquiera que le indique que "actualice" su ETH está tratando de estafarlo.** No hay nada que tenga que hacer en relación con esta actualización. Sus activos no se verán afectados en absoluto. Recuerde, mantenerse informado es la mejor defensa contra las estafas.

[Más sobre el reconocimiento y la prevención de estafas](/security/)

## ¿Es más bien de los que aprende viendo? {#visual-learner}

<YouTube id="ufIDBCgdGwY" />

_¿Qué implica la actualización de Pectra? Christine Kim_

<YouTube id="_UpAFpC7X6Y" />

_Actualización Pectra de Ethereum: lo que los participantes deben saber, Blockdaemon_

## Lecturas adicionales {#further-reading}

- [Hoja de ruta de Ethereum](/roadmap/)
- [Preguntas frecuentes sobre Pectra](https://epf.wiki/#/wiki/pectra-faq)
- [Página de información pectra.wtf](https://pectra.wtf)
- [Cómo Pectra mejora la experiencia de los participantes ](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Página de información de EIP7702](https://eip7702.io/)
- [Redes de desarrollo Pectra](https://github.com/ethereum/pm/blob/master/Pectra/pectra-pm.md)
