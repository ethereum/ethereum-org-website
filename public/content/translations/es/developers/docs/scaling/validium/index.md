---
title: Validium
description: Introducción a Validium como solución de escalado utilizada actualmente por la comnunidad de Ethereum.
lang: es
sidebarDepth: 3
---

Validium es una [solución de escalabilidad](/developers/docs/scaling/) que impone la integridad de las transacciones utilizando purebas de validez como los [rollups de conocimiento cero (ZK)](/developers/docs/scaling/zk-rollups/), pero no almacena información de las transacciones en la Red principal de Ethereum. Si bien la dispoibilidad de datos fuera de la cadena introduce compensaciones (o cosas que deben resignarse), puede también conducir a mejoras inmensas en cuanto a escalabilidad (los validiums pueden procesar [~9.000 transacciones, o más, por segundo](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)).

## Requisitos previos {#prerequisites}

Debe haber leído y comprendido el tema [Escalamiento de Ethereum](/developers/docs/scaling/) y [capa 2](/layer-2).

## ¿Qué es validium? {#what-is-validium}

Los validiums son soluciones de escalado que utilizan la disponibilidad de datos fuera de la cadena y la computación diseñada para mejorar el rendimiento o la velocidad mediante el procesamiento de transacciones fuera de la red principal de Ethereum. Al igual que los rollups de conocimiento cero (ZK), los validiums publican [pruebas de conocimiento cero](/glossary/#zk-proof) para verificar las transacciones fuera de la cadena en Ethereum. Esto evita las transiciones de estado no válidas y mejora las garantías de seguridad de una cadena de validiums.

Estas "pruebas de validez" pueden venir en forma de ZK-SNARKs (argumento de conocimiento no interactivo sucinto de conocimiento cero) o ZK-STARKs (argumento de conocimiento transparente escalable de conocimiento cero). Más información acerca de las [pruebas de conocimiento cero](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/).

Los fondos pertenecientes a los usuarios de validium son controlados por un contrato inteligente en Ethereum. Los validiums ofrecen retiros casi instantáneos, al igual que los rollups de ZK; una vez que se ha verificado la prueba de validez para una solicitud de retiro en la Red principal, los usuarios pueden retirar fondos proporcionando [pruebas de Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/). La prueba de Merkle valida la inclusión de la transacción de retiro del usuario en un lote de transacciones verificadas, lo que permite que el contrato en cadena procese el retiro.

Sin embargo, los usuarios de validium pueden ver congelados sus fondos y restringidos sus retiros. Esto puede suceder si los administradores de disponibilidad de datos de la cadena validium retienen los datos de estado fuera de la cadena de los usuarios. Sin acceso a los datos de la transacción, los usuarios no pueden calcular la prueba de Merkle requerida para probar la propiedad de los fondos y ejecutar retiros.

Esta es la principal diferencia entre los validiums y los rollups de ZK: sus posiciones en el espectro de disponibilidad de datos. Ambas soluciones abordan el almacenamiento de datos de manera diferente, lo que tiene implicaciones para la seguridad y la no necesidad de confianza.

## ¿Cómo interactúan los validiums con Ethereum? {#how-do-validiums-interact-with-ethereum}

Los validiums son protocolos de escalado construidos sobre la cadena de Ethereum existente. Aunque ejecuta transacciones fuera de la cadena, una cadena de validium es administrada por una colección de contratos inteligentes implementados en la red principal, que incluyen:

1. **Contratos de verificación**: El contrato de verificación verifica la validez de las pruebas presentadas por el operador de validium al realizar actualizaciones de estado. Esto incluye pruebas de validez que certifican la corrección de las transacciones fuera de la cadena y pruebas de disponibilidad de datos que verifican la existencia de datos de transacciones fuera de la cadena.

2. **Contrato principal**: El contrato principal almacena los compromisos de estado (raíces de Merkle) presentados por los productores de bloques y actualiza el estado del validium una vez que se verifica una prueba de validez en la cadena. Este contrato también procesa los depósitos y retiros de la cadena de validium.

Los Validiums también utilizan la cadena principal de Ethereum para lo siguiente:

### Resolución {#settlement}

Las transacciones ejecutadas en un validium no se pueden confirmar completamente hasta que la cadena principal verifique su validez. Todos los negocios realizados en un validium deben resolverse finalmente en la red principal. La cadena de bloques de Ethereum también proporciona "garantías de liquidación" para los usuarios de validium, lo que significa que las transacciones fuera de la cadena no se pueden revertir o alterar una vez subidas o cargadas en la cadena.

### Seguridad {#security}

Ethereum, que actúa como una capa de liquidación, también garantiza la validez de las transiciones de estado en el validium. Las transacciones fuera de la cadena ejecutadas en la cadena de validiums se verifican a través de un contrato inteligente en la capa base de Ethereum.

Si el contrato de verificación en cadena considera que la prueba no es válida, las transacciones se rechazan. Esto significa que los operadores deben cumplir con las condiciones de validez impuestas por el protocolo de Ethereum antes de actualizar el estado del validium.

## ¿Cómo funciona el validium? {#how-does-validium-work}

### Transacciones {#transactions}

Los usuarios envían transacciones al operador, un nodo responsable de ejecutar transacciones en la cadena de validiums. Algunos validiums pueden utilizar un operador único para ejecutar la cadena o confiar en un mecanismo de [prueba de participación (PoS)](/developers/docs/consensus-mechanisms/pos/) para rotar los operadores.

El operador agrega las transacciones en un lote y lo envía a un circuito de prueba para la verificación. El circuito de prueba acepta el lote de transacciones (y otros datos relevantes) como entradas y salidas de una prueba de validez que verifica que las operaciones se realizaron correctamente.

### Compromisos de estado {#state-commitments}

El estado del validium se hashea como un árbol de Merkle, cuya raíz se almacena en el contrato principal de Ethereum. La raíz de Merkle, también conocida como la raíz de estado, actúa como un compromiso criptográfico con el estado actual de cuentas y saldos en el validium.

Para realizar una actualización de estado, el operador debe calcular una nueva raíz de estado (después de ejecutar las transacciones) y enviarla al contrato en cadena. Si se comprueba la prueba de validez, se acepta el estado propuesto y el validium cambia a la nueva raíz de estado.

### Depósitos y retiros {#deposits-and-withdrawals}

Los usuarios mueven fondos de Ethereum a un validium depositando ETH (o cualquier token compatible con ERC) en el contrato en cadena. El contrato transmite el evento de depósito al validium fuera de la cadena, donde se acredita a la dirección del usuario con una cantidad igual a su depósito. El operador también incluye esta transacción de depósito en un nuevo lote.

Para devolver los fondos a la red principal, un usuario de validium inicia una transacción de retiro y la envía al operador que valida la solicitud de retiro y la incluye en un lote. Los activos del usuario en la cadena de validiums también se destruyen antes de la salida del sistema. Una vez que se verifica la prueba de validez asociada con el lote, el usuario puede llamar al contrato principal para retirar el resto de su depósito inicial.

Como mecanismo anticensura, el protocolo de validium permite a los usuarios retirar directamente del contrato de validium sin pasar por el operador. En este caso, los usuarios deben proporcionar una prueba de Merkle al contrato de verificación que muestre la inclusión de una cuenta en la raíz del estado. Si se acepta la prueba, el usuario puede invocar la función de retiro del contrato principal para quitar sus fondos del validium.

### Envío de lotes {#batch-submission}

Después de ejecutar un lote de transacciones, el operador envía la prueba de validez asociada al contrato de verificación y propone una nueva raíz de estado para el contrato principal. Si la prueba es válida, el contrato principal actualiza el estado del validium y finaliza los resultados de las transacciones en el lote.

A diferencia de un rollup de ZK, los productores de bloques en un validium no están obligados a publicar datos de transacciones para lotes de transacciones (solo encabezados de bloque). Esto hace que validium sea un protocolo de escalado puramente fuera de la cadena, a diferencia de los protocolos de escalado "híbridos" (es decir, [capa 2](/layer-2/)), que publican datos de estado en la cadena principal de Ethereum como `calldata`.

### Disponibilidad de datos {#data-availability}

Como se mencionó, los validiums utilizan un modelo de disponibilidad de datos fuera de la cadena, donde los operadores almacenan todos los datos de las transacciones fuera de la red principal de Ethereum. La baja huella de datos en cadena de validium mejora la escalabilidad (el rendimiento no está limitado por la capacidad de procesamiento de datos de Ethereum) y reduce las tarifas de usuario (el costo de publicación de `calldata` es menor).

Sin embargo, la disponibilidad de datos fuera de la cadena presenta un problema: los datos necesarios para crear o verificar las pruebas de Merkle pueden no estar disponibles. Esto significa que los usuarios podrían no poder retirar fondos del contrato en cadena si los operadores actúan de forma maliciosa.

Varias soluciones de validium intentan resolver este problema mediante la descentralización del almacenamiento de datos de estado. Esto implica obligar a los productores de bloques a enviar los datos subyacentes a los "administradores de disponibilidad de datos" responsables de almacenar datos fuera de la cadena y ponerlos a disposición de los usuarios a petición.

Los administradores de disponibilidad de datos en validium dan fe de la disponibilidad de datos para transacciones fuera de la cadena firmando cada lote de validium. Estas firmas constituyen una forma de "prueba de disponibilidad" que el verificador del contrato en cadena comprueba antes de aprobar las actualizaciones de estado.

Los validiums difieren en su enfoque de la gestión de la disponibilidad de datos. Algunos usan partes de confianza para almacenar los datos del estado, mientras que otros utilizan validadores asignados al azar para la tarea.

#### Comité de disponibilidad de datos (DAC) {#data-availability-committee}

Para garantizar la disponibilidad de los datos fuera de la cadena, algunas soluciones de validum designan un grupo de entidades de confianza, conocidas colectivamente como comité de disponibilidad de datos (DAC), para almacenar copias del estado y proporcionar pruebas de la disponibilidad de los datos. Los DAC son más fáciles de implementar y requieren menos coordinación, ya que la membresía es baja.

Sin embargo, los usuarios deben confiar en que el DAC pondrá los datos a disposición cuando sea necesario (por ejemplo, para generar pruebas de Merkle). Existe la posibilidad de que los miembros de los comités de disponibilidad de datos [se vean comprometidos por un actor malicioso](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view) que luego pueda retener datos fuera de la cadena.

[Más información sobre los comités de disponibilidad de datos en validiums](https://medium.com/starkware/data-availability-e5564c416424).

#### Disponibilidad de datos con fianza {#bonded-data-availability}

Otros validiums requieren que los participantes encargados de almacenar datos fuera de línea participen o hagan staking (es decir, bloqueen) de tokens en un contrato inteligente antes de asumir sus funciones. Esta participación o staking sirve como "fianza" para garantizar un comportamiento honesto entre los administradores de disponibilidad de datos y reduce las suposiciones de confianza. Si estos participantes no prueban la disponibilidad de datos, la fianza se pierde.

En un esquema de disponibilidad de datos con fianza, se puede designar a cualquier persona para que retenga datos fuera de la cadena una vez que proporcione la participación requerida. Esto amplía el pool o grupo de administradores de disponibilidad de datos elegibles, reduciendo la centralización que afecta a los comités de disponibilidad de datos (DAC). Lo que es más importante, este enfoque se basa en incentivos criptoeconómicos para evitar la actividad maliciosa, lo que es considerablemente más seguro que designar a partes de confianza para proteger los datos fuera de línea en el validium.

[Más información sobre la disponibilidad de datos con fianza en validiums](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## Voliciones y validiums {#volitions-and-validium}

Los validiums ofrecen muchos beneficios, pero vienen con compensaciones o cosas que deben resignarse (sobre todo, la disponibilidad de datos). Pero, al igual que con muchas soluciones de escalamiento, los validiums son adecuados para casos de uso específicos, por lo que se crearon voliciones.

Las voliciones combinan una cadena de rollups de conocimiento cero (ZK) y otra de validiums, y permiten a los usuarios alternar entre las dos soluciones de escalamiento. Con voliciones, los usuarios pueden aprovechar la disponibilidad de datos fuera de la cadena de validiums para ciertas transacciones, al tiempo que conservan la libertad de cambiar a una solución de disponibilidad de datos en cadena (rollup de ZK) si es necesario. Esto esencialmente da a los usuarios la libertad de elegir las compensaciones que implican sus circunstancias únicas.

Un exchange descentralizado (DEX) puede preferir utilizar la infraestructura escalable y privada de un validium para operaciones de alto valor. También puede usar un rollup de ZK para los usuarios que desean las mayores garantías de seguridad y la no necesidad de confianza de estos.

## Compatibilidad de los validiums y la EVM {#validiums-and-evm-compatibility}

Al igual que los rollups de ZK, los validiums son principalmente adecuados para las aplicaciones simples, como los intercambios de tokens y los pagos. El soporte para la computación general y la ejecución de contratos inteligentes entre los validiums es difícil de implementar, dada la considerable sobrecarga de probar las instrucciones de la [EVM](/developers/docs/evm/) en un circuito de prueba de conocimiento cero.

Algunos proyectos de validiums intentan eludir este problema compilando lenguajes compatibles con la EVM (por ejemplo, Solidity, Vyper) para crear un código de bytes personalizado optimizado para una prueba eficiente. Un inconveniente de este enfoque es que las nuevas máquinas virtuales amigables con las pruebas de conocimiento cero pueden no admitir códigos de operación de EVM importantes, y los desarrolladores tienen que escribir directamente en el lenguaje de alto nivel para una experiencia óptima. Esto crea aún más problemas: obliga a los desarrolladores a crear dapps con una pila de desarrollo completamente nueva y rompe la compatibilidad con la infraestructura actual de Ethereum.

Algunos equipos, sin embargo, están intentando optimizar los códigos de operación de EVM existentes para los circuitos de prueba de ZK. Esto dará como resultado el desarrollo de una máquina virtual de Ethereum de conocimiento cero (zkEVM), una máquina virtual compatible con la EVM que produce pruebas para verificar la corrección de la ejecución de un programa. Con una zkEVM, las cadenas de validiums pueden ejecutar contratos inteligentes fuera de la cadena y presentar pruebas de validez para verificar un cálculo fuera de la cadena (sin tener que volver a ejecutarlo) en Ethereum.

[Más sobre la zkEVM](https://www.alchemy.com/overviews/zkevm).

## ¿Cómo escalan los validiums Ethereum? {#scaling-ethereum-with-validiums}

### 1. Almacenamiento de datos fuera de la cadena {#off-chain-data-storage}

Los proyectos de escalado de capa 2, como los rollups optimistas y los rollups de ZK, intercambian la escalabilidad infinita de los protocolos de escalado puramente fuera de la cadena (por ejemplo, [Plasma](/developers/docs/scaling/plasma/)) por seguridad mediante la publicación de algunos datos de transacciones en L1. Pero esto significa que las propiedades de escalabilidad de los rollups están limitadas por el ancho de banda de datos en la red principal de Ethereum (el [data sharding](/roadmap/danksharding/), o fragmentación de datos, propone mejorar la capacidad de almacenamiento de datos de Ethereum por esta razón).

Los validiums logran escalabilidad manteniendo todos los datos de las transacciones fuera de la cadena y solo publican compromisos de estado (y pruebas de validez) al transmitir las actualizaciones de estado a la cadena principal de Ethereum. La existencia de pruebas de validez, sin embargo, da a los validiums mayores garantías de seguridad que otras soluciones de escalado puramente fuera de la cadena, incluyendo Plasma y las [cadenas laterales](/developers/docs/scaling/sidechains/). Al reducir la cantidad de datos que Ethereum tiene que procesar antes de validar las transacciones fuera de la cadena, los diseños de validium amplían en gran medida el rendimiento en la red principal.

### 2. Pruebas recursivas {#recursive-proofs}

Una prueba recursiva es una prueba de validez que verifica la validez de otras pruebas. Estas "pruebas de pruebas" se generan agregando recursivamente múltiples pruebas hasta que se crea una prueba final que verifique todas las pruebas anteriores. Las pruebas recursivas escalan las velocidades de procesamiento de la cadena de bloques al aumentar el número de transacciones que se pueden verificar por prueba de validez.

Por lo general, cada prueba de validez que el operador de validium envía a Ethereum para su verificación valida la integridad de un solo bloque. Mientras que una sola prueba recursiva se puede utilizar para confirmar la validez de varios bloques de validiums al mismo tiempo, esto es posible, ya que el circuito de prueba puede agregar recursivamente varias pruebas de bloque en una prueba final. Si el contrato de verificación en cadena acepta la prueba recursiva, todos los bloques subyacentes se finalizan inmediatamente.

## Pros y contras de validium {#pros-and-cons-of-validium}

| Ventajas                                                                                                                                                             | Desventajas                                                                                                                                                                                       |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Las pruebas de validez imponen la integridad de las transacciones fuera de la cadena y evitan que los operadores finalicen las actualizaciones de estado no válidas. | La producción de pruebas de validez requiere un hardware especial, lo que plantea un riesgo de centralización.                                                                                    |
| Aumenta la eficiencia del capital para los usuarios (sin retrasos en la retirada de fondos de vuelta a Ethereum).                                                    | Soporte limitado para computación general/contratos inteligentes; se requieren lenguajes especializados para el desarrollo.                                                                       |
| No es vulnerable a ciertos ataques económicos a los que se enfrentan los sistemas basados en prueba de fraude en aplicaciones de alto valor.                         | Alta potencia computacional requerida para generar pruebas de ZK; no es rentable para aplicaciones de bajo rendimiento.                                                                           |
| Reduce las tarifas de gas para los usuarios al no publicar calldata en la red principal de Ethereum.                                                                 | Tiempo de finalización subjetiva más lento (10-30 minutos para generar una prueba de ZK), pero más rápido a la finalización completa porque no hay retraso de tiempo de disputa.                  |
| Adecuado para casos de uso específicos, como el trading o los juegos de cadena de bloques que priorizan la privacidad y la escalabilidad de las transacciones.       | Se puede evitar que los usuarios retiren fondos, ya que la generación de pruebas de propiedad de Merkle requiere que los datos fuera de la cadena estén disponibles en todo momento.              |
| La disponibilidad de datos fuera de la cadena proporciona mayores niveles de rendimiento y aumenta la escalabilidad.                                                 | El modelo de seguridad se basa en supuestos de confianza e incentivos criptoeconómicos, a diferencia de los rollups de ZK, que se basan exclusivamente en mecanismos de seguridad criptográficos. |

### Usar Validium/Voliciones {#use-validium-and-volitions}

Múltiples proyectos proporcionan implementaciones de Validium y voliciones que puede integrar en sus dapps:

**StarkWare StarkEx:** _StarkEx es una solución de escalabilidad Ethereum Layer 2 (L2) que se basa en pruebas de validez. Puede funcionar en los modos de disponibilidad de datos de rollups de ZK o validium. _

- [Documentación](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Sitio web](https://starkware.co/starkex/)

**Matter Labs zkPorter:**_zkPorter es un protocolo de escalado de capa 2 que aborda la disponibilidad de datos con un enfoque híbrido que combina las ideas de zkRollup y el sharding. Puede soportar arbitrariamente muchos fragmentos (shards), cada uno con su propia política de disponibilidad de datos. _

- [Documentación](https://docs.zksync.io/zkevm/#what-is-zkporter)
- [Sitio web](https://zksync.io/)

## Más información {#further-reading}

- [Validium y la capa 2 (matriz 2 x 2), emisión n.º 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [Rollups de ZK vs. Validiums](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volición y el espectro de disponibilidad de datos emergente](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [Rollups, validiums y voliciones: conozca las mejores soluciones de escalado de Ethereum](https://www.defipulse.com/blog/rollups-validiums-and-volitions-learn-about-the-hottest-ethereum-scaling-solutions)
