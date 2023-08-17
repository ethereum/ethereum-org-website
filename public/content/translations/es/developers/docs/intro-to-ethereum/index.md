---
title: Introducción a Ethereum
description: Una introducción a los conceptos principales de Ethereum para los desarrolladores de dapps.
lang: es
---

## ¿Qué es una blockchain? {#what-is-a-blockchain}

La mejor manera de describir una blockchain es definirla como una especie de base de datos pública que se actualiza y se comparte en una serie de ordenadores conectados en red.

"Block" se refiere al hecho de que los datos y el estado se almacenan en lotes secuenciales o "bloques". Si envías ETH a otra persona, los datos de la transacción deben añadirse a un bloque para que se realice con éxito.

"Chain" se refiere al hecho de que cada bloque hace referencia criptográficamente a su antecesor. En otras palabras: los bloques están encadenados. Los datos de un bloque no pueden modificarse sin cambiar todos los bloques posteriores, lo cual requeriría en consenso de toda la red.

Cada ordenador de la red debe aceptar los nuevos bloques y la cadena en su conjunto. Estos ordendores se conocen como «nodos». Los nodos garantizan que todas las personas que interactúan con la cadena de bloques tengan los mismos datos. Para lograr este acuerdo distribuido, las cadenas de bloques necesitan un mecanismo de consenso.

Ethereum usa actualmente un mecanismo de consenso [prueba de trabajo (POW)](/developers/docs/consensus-mechanisms/pow/). Esto significa que cualquiera que quiera añadir nuevos bloques a la cadena deberá resolver un difícil rompecabezas, para el que se precisa mucha potencia computacional. Resolver el rompecabezas "prueba" que has invertido los recursos computacionales necesarios. Este proceso se denomina [minado](/developers/docs/consensus-mechanisms/pow/mining/). El minado es normalmente un proceso de prueba y error, pero si un bloque se añade correctamente, se recompensa con ETH.

Los nuevos bloques son transmitidos a los nodos de la red, y una vez revisados y verificados, se actualiza el estado para todos.

En resumen, cuando envías ETH a alguien, la transacción se debe minar e incluir en un bloque nuevo. A continuación, el estado actualizado se comparte con toda la red.

Observa cómo Austin te guía a través de la blockchain:

<YouTube id="zcX7OJ-L8XQ" />

Si desea ver cómo la cadena de bloques aplica hashes a los datos y cómo el bloque previo referencia todos los bloques anteriores, vea [esta demo](https://andersbrownworth.com/blockchain/blockchain) de Anders Brownworth y el vídeo de abajo.

Vea la explicación de Anders sobre los hashes en las cadenas de bloques:

<YouTube id="_160oMzblY8" />

## ¿Qué es Ethereum? {#what-is-ethereum}

En el universo Ethereum, hay un ordenador único y canónico (llamado máquina virtual de Ethereum o EVM), cuyo estado han acordado todos los participantes de la red. Cualquier persona que participe en la red de Ethereum (cada nodo de Ethereum) guarda una copia del estado de este ordenador. Asimismo, cualquier participante puede emitir una petición para que este ordenador realice un cálculo arbitrario. Cuando se emite una solicitud de este tipo, otros participantes de la red verifican, validan y ejecutan el cálculo. La ejecución causa un cambio en el estado de la EVM, el cual se realiza y propaga a toda la red.

Las solicitudes de cálculos se denominan solicitudes de transacción; el registro de todas las transacciones y el estado de la EVM se almacena en la cadena de bloques, la cual se almacena y confirma en todos los nodos.

Los mecanismos criptográficos garantizan que, una vez que las transacciones se verifican y añaden a la cadena de bloques, no pueden manipularse más tarde. Estos mismos mecanismos garantizan también que todas las transacciones se firmen y ejecuten con «permisos» apropiados (nadie debe poder enviar activos digitales desde la cuenta de Alice salvo ella misma).

## ¿Qué es el ether? {#what-is-ether}

**Ether (ETH)** es la criptomoneda nativa de Ethereum. El propósito del ether es posibilitar la existencia de un mercado de computación. Un mercado de este tipo proporciona un incentivo económico a los participantes que verifican y ejecutan las solicitudes de transacciones y proporcionan recursos a la red.

Cualquier participante que emite una solicitud de transacción debe también ofrecer cierta cantidad de ether a la red como recompensa. Esta recompensa se otorgará a la persona que realice la verificación de la transacción, la ejecute, la registre en la cadena de bloques y la emita a la red.

La cantidad de ether que se paga corresponde al tiempo necesario para completar el cálculo. Estas recompensas también previenen que los participantes maliciosos congestionen la red de manera intencionada al solicitar que se ejecuten cálculos infinitos u otros scripts que consumen muchos recursos, ya que estos participantes deberán pagar también por el tiempo que se tarde en completar los cálculos.

## ¿Qué son los contratos inteligentes? {#what-are-smart-contracts}

En la práctica, los participantes no escriben código nuevo cada vez que desean solicitar un cálculo en la EVM. Más bien, los desarrolladores de aplicaciones suben programas (fragmentos de código reutilizables) en el entorno EVM, y los usuarios solicitan la ejecución de estos fragmentos de código con parámetros variables. Llamamos contratos inteligentes a los programas cargados y ejecutados por la red.

A un nivel muy básico, puede entender los contratos inteligentes como una especie de máquina expendedora: un script que, cuando recibe una llamada con varios parámetros, realiza cierta acción o cálculo si se cumplen determinadas condiciones. Por ejemplo, un simple contrato inteligente de proveedor podría crear y asignar la propiedad de un recurso digital si la persona que lo solicita envía ether a un destinatario específico.

Cualquier desarrollador puede crear un contrato inteligente y hacerlo público en la red, mediante el uso de la cadena de bloques como su capa de datos, a cambio del pago de una comisión a la red. A continuación, cualquier usuario puede solicitar el uso del contrato inteligente para ejecutar su código, de nuevo, a cambio del pago de una comisión a la red.

Así, gracias a los contratos inteligentes, los desarrolladores pueden construir y publicar arbitrariamente complejas aplicaciones y servicios orientados al usuario, como mercados, instrumentos financieros, videojuegos, etc.

## Terminología {#terminology}

### Blockchain {#blockchain}

La secuencia de todos los bloques que se han incorporado a la red Ethereum en la historia de la red. Llamado así debido a que cada bloque contiene una referencia del bloque anterior, lo que nos ayuda a mantener un orden en todos los bloques (y sobre todo el historial exacto).

### ETH {#eth}

La criptomoneda nativa de Ethereum. Los usuarios pagan con ether a otros usuarios para que se cumplan sus requisitos de ejecución de código.

[Más información sobre ETH](/developers/docs/intro-to-ether/)

### EVM {#evm}

La máquina virtual de Ethereum es el ordenador virtual global cuyo estado se almacena y está aprobado por todos los participantes de la red Ethereum. Cualquier participante puede solicitar la ejecución de código arbitrario en la EVM; la ejecución de código cambia el estado de la EVM.

[Más información acerca de la EVM](/developers/docs/evm/)

### Nodos {#nodes}

Son máquinas reales que almacenan el estado de la EVM. Los nodos se comunican entre sí para propagar información sobre el estado de la EVM y los nuevos cambios de estado. Cualquier usuario puede, además, solicitar la ejecución de código mediante la transmisión de la solicitud desde un nodo. La propia red de Ethereum es el conjunto de todos los nodos de Ethereum y sus comunicaciones.

[Más información sobre nodos](/developers/docs/nodes-and-clients/)

### Cuentas {#accounts}

¿Dónde se almacenan los ether? Los usuarios pueden inicializar cuentas, depositar ether en las cuentas y transferir ether desde sus cuentas a otros usuarios. Las cuentas y los saldos de las cuentas están almacenados en una gran tabla en la EVM; forman parte del estado general de la EVM.

[Más información sobre las cuentas](/developers/docs/accounts/)

### Transacciones {#transactions}

«Solicitud de transacción» es el término formal para el proceso de solicitud de la ejecución de código en la EVM. Una «transacción» no es más que una solicitud de transacción completada junto con el cambio asociado al estado de la EVM. Cualquier usuario puede transmitir una solicitud de transacción a la red desde un nodo. Para que la solicitud de la transacción afecte al estado acordado de la EVM, esta debe estar validada, ejecutada y «enviada a la red» por otro nodo. La ejecución de cualquier código causa un cambio de estado en la EVM; a partir del consenso, este cambio de estado se transmite a todos los nodos en la red. Algunos ejemplos de transacciones:

- Enviar X ether desde mi cuenta hasta la de Alice.
- Publicar código de contrato inteligente en el entorno EVM.
- Ejecutar el código del contrato inteligente en la dirección X en la EVM, con los argumentos Y.

[Más información sobre las transacciones](/developers/docs/transactions/)

### Bloques {#blocks}

El volumen de las transacciones es muy alto, por lo que las transacciones son «comprometidas» en lotes o bloques. Generalmente, los bloques contienen docenas de cientos de transacciones.

[Más información sobre los bloques](/developers/docs/blocks/)

### Contratos inteligentes {#smart-contracts}

Un fragmento de código reutilizable (un programa) que publica un desarrollador en el entorno EVM. Cualquier persona puede solicitar que el código del contrato inteligente se ejecute al hacer una solicitud de transacción. Como los desarrolladores pueden escribir arbitrariamente aplicaciones ejecutables en la EVM (juegos, mercados, instrumentos financieros, etc.) mediante la publicación de contratos inteligentes, estos suelen denominarse [dapps o aplicaciones descentralizadas](/developers/docs/dapps/).

[Más información sobre contratos inteligentes](/developers/docs/smart-contracts/)

## Leer más {#further-reading}

- [Informe oficial de Ethereum](/whitepaper/)
- [¿Cómo funciona Ethereum?](https://www.preethikasireddy.com/post/how-does-ethereum-work-anyway) - _Preethi Kasireddy_

_¿Conoce algún recurso en la comunidad que le haya servido de ayuda? Edite esta página y añádalo._

## Tutoriales relacionados {#related-tutorials}

- [Guía de desarrollador para Ethereum. parte 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/)_: Una exploración para usuarios principiantes de Ethereum que utilicen Python y web3.py_
