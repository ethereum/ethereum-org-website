---
title: Introducción a Ethereum
description: Una introducción a los conceptos principales de Ethereum para los desarrolladores de DApps.
lang: es
---

## ¿Qué es una blockchain? {#what-is-a-blockchain}

La mejor manera de describir una blockchain es definirla como una especie de base de datos pública que se actualiza y se comparte en una serie de ordenadores conectados en red.

"Block" se refiere al hecho de que los datos y el estado se almacenan en lotes secuenciales o "bloques". Si envías ETH a otra persona, los datos de la transacción deben añadirse a un bloque para que se realice con éxito.

"Chain" se refiere al hecho de que cada bloque hace referencia criptográficamente a su antecesor. En otras palabras: los bloques están encadenados. Los datos de un bloque no pueden modificarse sin cambiar todos los bloques posteriores, lo cual requeriría en consenso de toda la red.

Cada ordenador de la red debe aceptar los nuevos bloques y la cadena en su conjunto. Estos ordendores se conocen como «nodos». Los nodos garantizan que todas las personas que interactúan con la cadena de bloques tengan los mismos datos. Para lograr este acuerdo distribuido, las cadenas de bloques necesitan un mecanismo de consenso.

Ethereum usa actualmente un mecanismo de consenso de [prueba de participación](/developers/docs/consensus-mechanisms/pos/). Cualquiera que quiera añadir nuevos bloques a la cadena debe poner ETH —la moneda nativa en Ethereum— como garantía y ejecutar el software validador. Estos «validadores» se pueden seleccionar aleatoriamente para proponer bloques que otros validadores verifiquen y añadan a la cadena de bloques. Hay un sistema de recompensas y sanciones que incitan enérgicamente a los participantes a ser honestos y a estar disponibles en línea con la mayor frecuencia posible.

Si desea ver cómo los datos de la cadena de bloques se convierte en hash y posteriormente se adjuntan al historial de referencias de bloque, no se pierda [esta demo](https://andersbrownworth.com/blockchain/blockchain) de Anders Brownworth y el vídeo siguiente que le acompaña.

Vea la explicación de Anders sobre los hashes en las cadenas de bloques:

<YouTube id="_160oMzblY8" />

## ¿Qué es Ethereum? {#what-is-ethereum}

Ethereum es una cadena de bloques con un ordenador integrado en ella. Es la base para construir aplicaciones y organizaciones de una manera descentralizada, sin permisos, resistente a la censura.

En el universo Ethereum, hay un ordenador único y convencional (llamada máquina virtual de Ethereum o EVM), cuyo estado han acordado todos los participantes de la red. Cualquier persona que participe en la red de Ethereum (cada nodo de Ethereum) guarda una copia del estado de este ordenador. Asimismo, cualquier participante puede emitir una solicitud para que este ordenador realice un cálculo arbitrario. Cuando se emite una solicitud de este tipo, otros participantes de la red verifican, validan y ejecutan el cálculo. La ejecución causa un cambio en el estado de la EVM, el cual se realiza y propaga a toda la red.

Las solicitudes de cálculos se denominan solicitudes de transacción; el registro de todas las transacciones y el estado de la EVM se almacena en la cadena de bloques, la cual se almacena y confirma en todos los nodos.

Los mecanismos criptográficos garantizan que, una vez que las transacciones se verifican y añaden a la cadena de bloques, no pueden manipularse más tarde. Estos mismos mecanismos garantizan también que todas las transacciones se firmen y ejecuten con «permisos» apropiados (nadie debe poder enviar activos digitales desde la cuenta de Alice salvo ella misma).

## ¿Qué es el ether? {#what-is-ether}

**Ether (ETH)** es la criptomoneda nativa de Ethereum. El propósito de ETH es posibilitar la existencia de un mercado de computación. Un mercado de este tipo proporciona un incentivo económico a los participantes que verifican y ejecutan las solicitudes de transacciones y proporcionan recursos informáticos a la red.

Cualquier participante que emita una solicitud de transacción también debe ofrecer cierta cantidad de ETH a la red como recompensa. La red quemará parte de la recompensa y otorgará el resto a quien finalmente haga el trabajo de verificar la transacción, la ejecute, la suba a la cadena de bloques y la transmita a la red.

La cantidad de ETH que se paga corresponde al tiempo necesario para completar el cálculo. Estas recompensas también previenen que participantes maliciosos congestionen la red intencionalmente al solicitar que se ejecuten cálculos infinitos u otros scripts que consumen muchos recursos, ya que estos participantes deberán pagar también por el tiempo que lleve completar los cálculos.

ETH también se utiliza para proporcionar seguridad criptoeconómica a la red de tres maneras principales: 1) se utiliza como un medio para recompensar a los validadores que proponen bloques, o que denuncian un comportamiento deshonesto de otros validadores; 2) los validadores lo apuestan, actuando como garantía contra el comportamiento deshonesto; si los validadores intentan comportarse mal, se puede destruir sus ETH; 3) se utiliza para ponderar «votos» para los nuevos bloques propuestos, alimentándose de la parte de la bifurcación del mecanismo de consenso.

## ¿Qué son los contratos inteligentes? {#what-are-smart-contracts}

En la práctica, los participantes no escriben un código nuevo cada vez que desean solicitar un cálculo en la EVM. Más bien, los desarrolladores de aplicaciones suben programas (fragmentos de código reutilizables) en el entorno EVM, y los usuarios solicitan la ejecución de estos fragmentos de código con parámetros variables. Llamamos contratos inteligentes, o «smart contracts», a los programas cargados y ejecutados por la red.

A un nivel muy básico, puede entender a los contratos inteligentes como una especie de máquina expendedora: un script que, cuando se opera con ciertos parámetros, realiza una acción o cálculo si se cumplen ciertas condiciones. Por ejemplo, un contrato inteligente de un proveedor simple puede crear y asignar la propiedad de un activo digital si la persona que lo solicita envía ETH a un destinatario específico.

Cualquier desarrollador puede crear un contrato inteligente y hacerlo público en la red, mediante el uso de la cadena de bloques como su capa de datos, a cambio del pago de una tarifa a la red. A continuación, cualquier usuario puede solicitar el uso del contrato inteligente para ejecutar su código, de nuevo, a cambio del pago de una tarifa a la red.

Así pues, gracias a los contratos inteligentes, los desarrolladores pueden desarrollar y publicar arbitrariamente complejas aplicaciones y servicios orientados al usuario, como mercados, instrumentos financieros, videojuegos, etc.

## Terminología {#terminology}

### Blockchain {#blockchain}

La secuencia de todos los bloques que se han incorporado a la red Ethereum en la historia de la red. Llamado así porque cada bloque contiene una referencia al bloque anterior, lo que nos ayuda a mantener un orden en todos los bloques (y sobre todo el historial exacto).

### ETH {#eth}

**Ether (ETH)** es la criptomoneda nativa de Ethereum. Los usuarios pagan ETH a otros usuarios para que se cumplan sus solicitudes de ejecución de su código.

[Más información sobre ETH](/developers/docs/intro-to-ether/)

### EVM {#evm}

La máquina virtual de Ethereum es el ordenador virtual global cuyo estado se almacena y está aprobado por todos los participantes de la red Ethereum. Cualquier participante puede solicitar la ejecución de código arbitrario en la EVM; la ejecución de código cambia el estado de la EVM.

[Más información acerca de la EVM](/developers/docs/evm/)

### Nodos {#nodes}

Son máquinas reales que almacenan el estado de la EVM. Los nodos se comunican entre sí para propagar información sobre el estado de la EVM y los nuevos cambios de estado. Cualquier usuario puede, además, solicitar la ejecución de código mediante la transmisión de la solicitud desde un nodo. La propia red de Ethereum es el conjunto de todos los nodos de Ethereum y sus comunicaciones.

[Más información sobre los nodos](/developers/docs/nodes-and-clients/)

### Cuentas {#accounts}

Donde el ETH se almacena. Los usuarios pueden iniciar cuentas, depositar ETH en las cuentas y transferir ETH desde sus cuentas a las de otros usuarios. Las cuentas y los saldos de las cuentas se almacenan en una gran tabla en la EVM; forman parte del estado general de la EVM.

[Más información sobre las cuentas](/developers/docs/accounts/)

### Transacciones {#transactions}

«Solicitud de transacción» es el término formal para el proceso de solicitud de la ejecución de código en la EVM. Una «transacción» no es más que una solicitud de transacción completada junto con el cambio asociado al estado de la EVM. Cualquier usuario puede transmitir una solicitud de transacción a la red desde un nodo. Para que la solicitud de la transacción afecte al estado acordado de la EVM, esta debe estar validada, ejecutada y «enviada a la red» por otro nodo. La ejecución de cualquier código causa un cambio de estado en la EVM; a partir del consenso, este cambio de estado se transmite a todos los nodos en la red. Algunos ejemplos de transacciones:

- Enviar X ETH desde mi cuenta hasta la cuenta de Alice.
- Publicar código de contrato inteligente en el entorno EVM.
- Ejecutar el código del contrato inteligente en la dirección X en la EVM, con los argumentos Y.

[Más información sobre las transacciones](/developers/docs/transactions/)

### Bloques {#blocks}

El volumen de las transacciones es muy alto, por lo que las transacciones se «comprometen» en lotes o bloques. Generalmente, los bloques contienen docenas de cientos de transacciones.

[Más información sobre los bloques](/developers/docs/blocks/)

### Contratos inteligentes {#smart-contracts}

Un fragmento de código reutilizable (un programa) que publica un desarrollador en el entorno EVM. Cualquier persona puede solicitar que el código del contrato inteligente se ejecute al hacer una solicitud de transacción. Como los desarrolladores pueden escribir arbitrariamente aplicaciones ejecutables en la EVM (juegos, mercados, instrumentos financieros, etc.) mediante la publicación de contratos inteligentes, estos suelen denominarse [DApps o Aplicaciones Descentralizadas](/developers/docs/dapps/).

[Más información sobre contratos inteligentes](/developers/docs/smart-contracts/)

## Leer más {#further-reading}

- [Informe oficial de Ethereum](/whitepaper/)
- [¿Cómo funciona Ethereum?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369) - _Preethi Kasireddy_ (**NB** este recurso todavía es valioso, pero tenga en cuenta que es anterior a [La Fusión](/roadmap/merge) y por lo tanto se refiere al mecanismo de prueba de trabajo de Ethereum; Ethereum ahora es seguro gracias a la [prueba de participación](/developers/docs/consensus-mechanisms/pos))

_¿Conoce algún recurso comunitario que le haya sido de ayuda? Edite la página y añádalo._

## Tutoriales relacionados {#related-tutorials}

- [Guía del desarrollador para Ethereum, parte 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/)_: una exploración para usuarios principiantes de Ethereum utilizando Python y web3.py_
