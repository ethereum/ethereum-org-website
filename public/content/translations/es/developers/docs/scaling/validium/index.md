---
title: Validium
description: Una introducción a Validium como solución de escalabilidad utilizada actualmente por la comunidad de Ethereum.
lang: es
sidebarDepth: 3
---

Validium es una [solución de escalabilidad](/developers/docs/scaling/) que impone la integridad de las transacciones utilizando pruebas de validez como los [ZK-rollups](/developers/docs/scaling/zk-rollups/), pero no almacena los datos de las transacciones en la [red principal de Ethereum](/). Aunque la disponibilidad de datos fuera de la cadena introduce ciertas concesiones, puede conducir a mejoras masivas en la escalabilidad (los Validium pueden procesar [~9.000 transacciones, o más, por segundo](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)).

## Requisitos previos {#prerequisites}

Debería haber leído y comprendido nuestra página sobre la [escalabilidad de Ethereum](/developers/docs/scaling/) y la [capa 2 (l2)](/layer-2).

## ¿Qué es Validium? {#what-is-validium}

Los Validium son soluciones de escalabilidad que utilizan la disponibilidad de datos y la computación fuera de la cadena, diseñadas para mejorar la capacidad de procesamiento al procesar transacciones fuera de la red principal de Ethereum. Al igual que los rollups de conocimiento cero (ZK-rollups), los Validium publican [pruebas de conocimiento cero](/glossary/#zk-proof) para verificar las transacciones fuera de la cadena en Ethereum. Esto evita transiciones de estado no válidas y mejora las garantías de seguridad de una cadena Validium.

Estas "pruebas de validez" pueden presentarse en forma de ZK-SNARKs (Argumento de conocimiento sucinto no interactivo de conocimiento cero) o ZK-STARKs (Argumento de conocimiento transparente y escalable de conocimiento cero). Más sobre las [pruebas de conocimiento cero](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/).

Los fondos que pertenecen a los usuarios de Validium están controlados por un contrato inteligente en Ethereum. Los Validium ofrecen retiros casi instantáneos, de manera muy similar a como lo hacen los ZK-rollups; una vez que la prueba de validez para una solicitud de retiro ha sido verificada en la Red principal, los usuarios pueden retirar fondos proporcionando [pruebas de Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/). La prueba de Merkle valida la inclusión de la transacción de retiro del usuario en un lote de transacciones verificado, lo que permite que el contrato en cadena procese el retiro.

Sin embargo, los usuarios de Validium pueden sufrir la congelación de sus fondos y la restricción de sus retiros. Esto puede suceder si los administradores de disponibilidad de datos en la cadena Validium ocultan a los usuarios los datos de estado fuera de la cadena. Sin acceso a los datos de las transacciones, los usuarios no pueden calcular la prueba de Merkle requerida para demostrar la propiedad de los fondos y ejecutar los retiros.

Esta es la principal diferencia entre los Validium y los ZK-rollups: sus posiciones en el espectro de disponibilidad de datos. Ambas soluciones abordan el almacenamiento de datos de manera diferente, lo que tiene implicaciones para la seguridad y la ausencia de necesidad de confianza.

## ¿Cómo interactúan los Validium con Ethereum? {#how-do-validiums-interact-with-ethereum}

Los Validium son protocolos de escalabilidad construidos sobre la cadena de Ethereum existente. Aunque ejecuta transacciones fuera de la cadena, una cadena Validium es administrada por un conjunto de contratos inteligentes implementados en la Red principal, que incluyen:

1. **Contrato verificador**: El contrato verificador verifica la validez de las pruebas enviadas por el operador de Validium al realizar actualizaciones de estado. Esto incluye pruebas de validez que atestiguan la corrección de las transacciones fuera de la cadena y pruebas de disponibilidad de datos que verifican la existencia de los datos de las transacciones fuera de la cadena.

2. **Contrato principal**: El contrato principal almacena los compromisos de estado (raíces de Merkle) enviados por los productores de bloques y actualiza el estado del Validium una vez que se verifica una prueba de validez en cadena. Este contrato también procesa los depósitos y retiros de la cadena Validium.

Los Validium también dependen de la cadena principal de Ethereum para lo siguiente:

### Liquidación {#settlement}

Las transacciones ejecutadas en un Validium no pueden confirmarse por completo hasta que la cadena principal verifique su validez. Todas las operaciones realizadas en un Validium deben liquidarse finalmente en la Red principal. La cadena de bloques de Ethereum también proporciona "garantías de liquidación" para los usuarios de Validium, lo que significa que las transacciones fuera de la cadena no pueden revertirse ni alterarse una vez comprometidas en cadena.

### Seguridad {#security}

Ethereum, actuando como una capa de liquidación, también garantiza la validez de las transiciones de estado en Validium. Las transacciones fuera de la cadena ejecutadas en la cadena Validium se verifican a través de un contrato inteligente en la capa base de Ethereum.

Si el contrato verificador en cadena considera que la prueba no es válida, las transacciones son rechazadas. Esto significa que los operadores deben satisfacer las condiciones de validez impuestas por el protocolo de Ethereum antes de actualizar el estado del Validium.

## ¿Cómo funciona Validium? {#how-does-validium-work}

### Transacciones {#transactions}

Los usuarios envían transacciones al operador, un nodo responsable de ejecutar transacciones en la cadena Validium. Algunos Validium pueden usar un operador único para ejecutar la cadena o depender de un mecanismo de [prueba de participación (PoS)](/developers/docs/consensus-mechanisms/pos/) para rotar a los operadores.

El operador agrega las transacciones en un lote y lo envía a un circuito de prueba para su comprobación. El circuito de prueba acepta el lote de transacciones (y otros datos relevantes) como entradas y genera una prueba de validez que verifica que las operaciones se realizaron correctamente.

### Compromisos de estado {#state-commitments}

El estado del Validium se codifica mediante hash como un árbol de Merkle con la raíz almacenada en el contrato principal en Ethereum. La raíz de Merkle, también conocida como raíz de estado, actúa como un compromiso criptográfico con el estado actual de las cuentas y los saldos en el Validium.

Para realizar una actualización de estado, el operador debe calcular una nueva raíz de estado (después de ejecutar las transacciones) y enviarla al contrato en cadena. Si la prueba de validez es correcta, se acepta el estado propuesto y el Validium cambia a la nueva raíz de estado.

### Depósitos y retiros {#deposits-and-withdrawals}

Los usuarios mueven fondos de Ethereum a un Validium depositando ETH (o cualquier token compatible con ERC) en el contrato en cadena. El contrato transmite el evento de depósito al Validium fuera de la cadena, donde se acredita a la dirección del usuario una cantidad igual a su depósito. El operador también incluye esta transacción de depósito en un nuevo lote.

Para mover fondos de vuelta a la Red principal, un usuario de Validium inicia una transacción de retiro y la envía al operador, quien valida la solicitud de retiro y la incluye en un lote. Los activos del usuario en la cadena Validium también se destruyen antes de que puedan salir del sistema. Una vez que se verifica la prueba de validez asociada con el lote, el usuario puede llamar al contrato principal para retirar el resto de su depósito inicial.

Como mecanismo contra la censura, el protocolo Validium permite a los usuarios retirar directamente del contrato Validium sin pasar por el operador. En este caso, los usuarios deben proporcionar una prueba de Merkle al contrato verificador que demuestre la inclusión de una cuenta en la raíz de estado. Si se acepta la prueba, el usuario puede llamar a la función de retiro del contrato principal para sacar sus fondos del Validium.

### Envío de lotes {#batch-submission}

Después de ejecutar un lote de transacciones, el operador envía la prueba de validez asociada al contrato verificador y propone una nueva raíz de estado al contrato principal. Si la prueba es válida, el contrato principal actualiza el estado del Validium y finaliza los resultados de las transacciones en el lote.

A diferencia de un ZK-rollup, los productores de bloques en un Validium no están obligados a publicar datos de transacciones para los lotes de transacciones (solo los encabezados de los bloques). Esto hace que Validium sea un protocolo de escalabilidad puramente fuera de la cadena, a diferencia de los protocolos de escalabilidad "híbridos" (es decir, la [capa 2 (l2)](/layer-2/)) que publican datos de estado en la cadena principal de Ethereum utilizando datos blob, `calldata`, o una combinación de ambos.

### Disponibilidad de datos {#data-availability}

Como se mencionó, los Validium utilizan un modelo de disponibilidad de datos fuera de la cadena, donde los operadores almacenan todos los datos de las transacciones fuera de la red principal de Ethereum. La baja huella de datos en cadena de Validium mejora la escalabilidad (la capacidad de procesamiento no está limitada por la capacidad de procesamiento de datos de Ethereum) y reduce las tarifas para los usuarios (el costo de publicar datos en cadena es menor).

Sin embargo, la disponibilidad de datos fuera de la cadena presenta un problema: los datos necesarios para crear o verificar las pruebas de Merkle pueden no estar disponibles. Esto significa que los usuarios podrían no poder retirar fondos del contrato en cadena si los operadores actuaran de forma maliciosa.

Varias soluciones de Validium intentan resolver este problema descentralizando el almacenamiento de los datos de estado. Esto implica obligar a los productores de bloques a enviar los datos subyacentes a los "administradores de disponibilidad de datos", responsables de almacenar los datos fuera de la cadena y ponerlos a disposición de los usuarios cuando lo soliciten.

Los administradores de disponibilidad de datos en Validium atestiguan la disponibilidad de los datos para las transacciones fuera de la cadena al firmar cada lote de Validium. Estas firmas constituyen una forma de "prueba de disponibilidad" que el contrato verificador en cadena comprueba antes de aprobar las actualizaciones de estado.

Los Validium difieren en su enfoque para la gestión de la disponibilidad de datos. Algunos dependen de partes de confianza para almacenar los datos de estado, mientras que otros utilizan validadores asignados aleatoriamente para la tarea.

#### Comité de disponibilidad de datos (DAC) {#data-availability-committee}

Para garantizar la disponibilidad de los datos fuera de la cadena, algunas soluciones de Validium designan a un grupo de entidades de confianza, conocidas colectivamente como comité de disponibilidad de datos (DAC), para almacenar copias del estado y proporcionar pruebas de disponibilidad de datos. Los DAC son más fáciles de implementar y requieren menos coordinación, ya que el número de miembros es bajo.

Sin embargo, los usuarios deben confiar en que el DAC hará que los datos estén disponibles cuando sea necesario (por ejemplo, para generar pruebas de Merkle). Existe la posibilidad de que los miembros de los comités de disponibilidad de datos [se vean comprometidos por un actor malicioso](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view) que luego pueda retener los datos fuera de la cadena.

[Más sobre los comités de disponibilidad de datos en los Validium](https://medium.com/starkware/data-availability-e5564c416424).

#### Disponibilidad de datos con garantía {#bonded-data-availability}

Otros Validium requieren que los participantes encargados de almacenar datos fuera de línea depositen en garantía (es decir, bloqueen) tokens en un contrato inteligente antes de asumir sus roles. Esta participación sirve como una "fianza" para garantizar un comportamiento honesto entre los administradores de disponibilidad de datos y reduce los supuestos de confianza. Si estos participantes no logran demostrar la disponibilidad de los datos, la fianza sufre un recorte.

En un esquema de disponibilidad de datos con garantía, a cualquier persona se le puede asignar la retención de datos fuera de la cadena una vez que proporcione la participación requerida. Esto amplía el grupo de administradores de disponibilidad de datos elegibles, reduciendo la centralización que afecta a los comités de disponibilidad de datos (DAC). Más importante aún, este enfoque se basa en incentivos criptoeconómicos para prevenir actividades maliciosas, lo que es considerablemente más seguro que designar partes de confianza para asegurar los datos fuera de línea en el Validium.

[Más sobre la disponibilidad de datos con garantía en los Validium](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## Volitions y Validium {#volitions-and-validium}

Los Validium ofrecen muchos beneficios, pero conllevan concesiones (principalmente, la disponibilidad de datos). Pero, como ocurre con muchas soluciones de escalabilidad, los Validium son adecuados para casos de uso específicos, razón por la cual se crearon los volitions.

Los volitions combinan un ZK-rollup y una cadena Validium, y permiten a los usuarios cambiar entre las dos soluciones de escalabilidad. Con los volitions, los usuarios pueden aprovechar la disponibilidad de datos fuera de la cadena de Validium para ciertas transacciones, al tiempo que conservan la libertad de cambiar a una solución de disponibilidad de datos en cadena (ZK-rollup) si es necesario. Básicamente, esto brinda a los usuarios la libertad de elegir las concesiones según lo dicten sus circunstancias particulares.

Un intercambio descentralizado (DEX) puede preferir utilizar la infraestructura escalable y privada de un Validium para operaciones de alto valor. También puede utilizar un ZK-rollup para los usuarios que deseen las mayores garantías de seguridad y la ausencia de necesidad de confianza de un ZK-rollup.

## Los Validium y la compatibilidad con la EVM {#validiums-and-evm-compatibility}

Al igual que los ZK-rollups, los Validium son más adecuados para aplicaciones simples, como los intercambios de tokens y los pagos. Admitir la computación general y la ejecución de contratos inteligentes entre los Validium es difícil de implementar, dada la considerable sobrecarga que supone probar las instrucciones de la [EVM](/developers/docs/evm/) en un circuito de prueba de conocimiento cero.

Algunos proyectos de Validium intentan eludir este problema compilando lenguajes compatibles con la EVM (por ejemplo, Solidity, Vyper) para crear un código de bytes personalizado y optimizado para una prueba eficiente. Un inconveniente de este enfoque es que las nuevas máquinas virtuales (VM) compatibles con las pruebas de conocimiento cero pueden no admitir códigos de operación importantes de la EVM, y los desarrolladores tienen que escribir directamente en el lenguaje de alto nivel para obtener una experiencia óptima. Esto crea aún más problemas: obliga a los desarrolladores a crear dapps con una pila de desarrollo completamente nueva y rompe la compatibilidad con la infraestructura actual de Ethereum.

Sin embargo, algunos equipos están intentando optimizar los códigos de operación existentes de la EVM para los circuitos de prueba ZK. Esto dará como resultado el desarrollo de una Máquina Virtual de Ethereum de conocimiento cero (zkEVM), una VM compatible con la EVM que produce pruebas para verificar la corrección de la ejecución del programa. Con una zkEVM, las cadenas Validium pueden ejecutar contratos inteligentes fuera de la cadena y enviar pruebas de validez para verificar una computación fuera de la cadena (sin tener que volver a ejecutarla) en Ethereum.

[Más sobre las zkEVM](https://www.alchemy.com/overviews/zkevm).

## ¿Cómo escalan los Validium a Ethereum? {#scaling-ethereum-with-validiums}

### 1. Almacenamiento de datos fuera de la cadena {#offchain-data-storage}

Los proyectos de escalabilidad de capa 2 (l2), como los rollups optimistas y los ZK-rollups, intercambian la escalabilidad infinita de los protocolos de escalabilidad puramente fuera de la cadena (por ejemplo, [Plasma](/developers/docs/scaling/plasma/)) por seguridad al publicar algunos datos de transacciones en la L1. Pero esto significa que las propiedades de escalabilidad de los rollups están limitadas por el ancho de banda de datos en la red principal de Ethereum (la [fragmentación de datos](/roadmap/danksharding/) propone mejorar la capacidad de almacenamiento de datos de Ethereum por esta razón).

Los Validium logran la escalabilidad manteniendo todos los datos de las transacciones fuera de la cadena y solo publican compromisos de estado (y pruebas de validez) al transmitir actualizaciones de estado a la cadena principal de Ethereum. Sin embargo, la existencia de pruebas de validez otorga a los Validium mayores garantías de seguridad que otras soluciones de escalabilidad puramente fuera de la cadena, incluidos Plasma y las [cadenas laterales](/developers/docs/scaling/sidechains/). Al reducir la cantidad de datos que Ethereum tiene que procesar antes de validar las transacciones fuera de la cadena, los diseños de Validium amplían en gran medida la capacidad de procesamiento en la Red principal.

### 2. Pruebas recursivas {#recursive-proofs}

Una prueba recursiva es una prueba de validez que verifica la validez de otras pruebas. Estas "pruebas de pruebas" se generan agregando recursivamente múltiples pruebas hasta que se crea una prueba final que verifica todas las pruebas anteriores. Las pruebas recursivas escalan las velocidades de procesamiento de la cadena de bloques al aumentar la cantidad de transacciones que se pueden verificar por prueba de validez.

Por lo general, cada prueba de validez que el operador de Validium envía a Ethereum para su verificación valida la integridad de un solo bloque. Mientras que una sola prueba recursiva se puede utilizar para confirmar la validez de varios bloques de Validium al mismo tiempo; esto es posible ya que el circuito de prueba puede agregar recursivamente varias pruebas de bloques en una prueba final. Si el contrato verificador en cadena acepta la prueba recursiva, todos los bloques subyacentes se finalizan de inmediato.

## Pros y contras de Validium {#pros-and-cons-of-validium}

| Pros                                                                                                                     | Contras                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Las pruebas de validez imponen la integridad de las transacciones fuera de la cadena y evitan que los operadores finalicen actualizaciones de estado no válidas. | La producción de pruebas de validez requiere hardware especial, lo que plantea un riesgo de centralización.                                                              |
| Aumenta la eficiencia del capital para los usuarios (sin demoras en el retiro de fondos de vuelta a Ethereum).                                 | Soporte limitado para computación general/contratos inteligentes; se requieren lenguajes especializados para el desarrollo.                                             |
| No es vulnerable a ciertos ataques económicos a los que se enfrentan los sistemas basados en pruebas de fraude en aplicaciones de alto valor.                | Se requiere un alto poder computacional para generar pruebas ZK; no es rentable para aplicaciones de baja capacidad de procesamiento.                                         |
| Reduce las tarifas de gas para los usuarios al no publicar datos de llamada (calldata) en la red principal de Ethereum.                                                  | Tiempo de finalidad subjetiva más lento (10-30 min para generar una prueba ZK) pero más rápido para la finalidad completa porque no hay demora de tiempo de disputa.               |
| Adecuado para casos de uso específicos, como el comercio o los juegos en la cadena de bloques que priorizan la privacidad y la escalabilidad de las transacciones.  | Se puede evitar que los usuarios retiren fondos, ya que la generación de pruebas de Merkle de propiedad requiere que los datos fuera de la cadena estén disponibles en todo momento.      |
| La disponibilidad de datos fuera de la cadena proporciona niveles más altos de capacidad de procesamiento y aumenta la escalabilidad.                              | El modelo de seguridad se basa en supuestos de confianza e incentivos criptoeconómicos, a diferencia de los ZK-rollups, que se basan puramente en mecanismos de seguridad criptográfica. |

### Usar Validium/Volitions {#use-validium-and-volitions}

Múltiples proyectos proporcionan implementaciones de Validium y volitions que puede integrar en sus dapps:

**StarkWare StarkEx**: _StarkEx es una solución de escalabilidad de capa 2 (L2) de Ethereum que se basa en pruebas de validez. Puede operar en los modos de disponibilidad de datos ZK-Rollup o Validium._

- [Documentación](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Sitio web](https://starkware.co/starkex/)

**Matter Labs zkPorter**: _zkPorter es un protocolo de escalabilidad de capa 2 que aborda la disponibilidad de datos con un enfoque híbrido que combina las ideas de zkRollup y la fragmentación. Puede admitir una cantidad arbitraria de fragmentos, cada uno con su propia política de disponibilidad de datos._

- [Blog](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Documentación](https://docs.zksync.io/zksync-protocol/rollup/data-availability)
- [Sitio web](https://zksync.io/)

## Más información {#further-reading}

- [Validium y la matriz de dos por dos de la capa 2: edición n.º 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK-rollups frente a Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition y el espectro emergente de disponibilidad de datos](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [La guía práctica de los rollups de Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)