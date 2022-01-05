---
title: Introducción a Ethereum
description: Una introducción a los conceptos principales de Ethereum para los desarrolladores de dapps.
lang: es
sidebar: true
---

## ¿Qué es una blockchain? {#what-is-a-blockchain}

La mejor manera de describir una blockchain es definirla como una especie de base de datos pública que se actualiza y se comparte en una serie de ordenadores conectados en red.

"Block" se refiere al hecho de que los datos y el estado se almacenan en lotes secuenciales o "bloques". Si envías ETH a otra persona, los datos de la transacción deben añadirse a un bloque para que se realice con éxito.

"Chain" se refiere al hecho de que cada bloque hace referencia criptográficamente a su antecesor. Los datos del bloque no se pueden cambiar sin cambiar todos los bloques sucesivos, lo que requeriría el consenso de la red entera.

Cada nodo de la red debe acordar cada nuevo bloque y la cadena como conjunto. Así, todo el mundo dispone de los mismos datos. Para que esto funcione, las cadenas de bloques necesitan disponer de un mecanismo de consenso.

Actualmente Ethereum utiliza un mecanismo de consenso llamado "Prueba de trabajo". Esto significa que cualquiera que quiera añadir nuevos bloques a la cadena deberá resolver un difícil rompecabezas, para el que se precisa mucha potencia computacional. Resolver el rompecabezas "prueba" que has invertido los recursos computacionales necesarios. Este proceso se denomina [minería](/developers/docs/consensus-mechanisms/pow/mining/). La minería puede entenderse como un proceso de prueba y error, pero la exitosa adición de un bloque se recompensa con Eth. Por otro lado, el envío de bloques fraudulentos no es una opción atractiva considerando los recursos que se invierten en producir el bloque.

Los nuevos bloques son transmitidos a los nodos de la red, y una vez revisados y verificados, se actualiza el estado para todos.

En resumen, cuando envías ETH a alguien, la transacción se debe minar e incluir en un bloque nuevo. A continuación, el estado actualizado se comparte con toda la red. Se incluyen más detalles a continuación.

Observa cómo Austin te guía a través de la blockchain:

<YouTube id="zcX7OJ-L8XQ" />

## ¿Qué es Ethereum? {#what-is-ethereum}

En el universo Ethereum, hay un computador único y canónico (llamado máquina virtual de Ethereum o EVM), cuyo estado han acordado todos los participantes de la red. Cualquiera que participe en la red de Ethereum (cada nodo de Ethereum) mantiene una copia del estado de este ordenador. Adicionalmente, cualquier participante puede emitir una petición para que este ordenador realice un cálculo arbitrario. Cuando se transmite una solicitud de este tipo, los demás participantes de la red verifican, validan y ejecutan el cálculo. Esto causa un cambio de estado en la EVM, que se realiza y propaga a través de toda la red.

Las peticiones de cálculo se llaman solicitudes de transacción; el registro de todas las transacciones así como el estado actual de la EVM se almacena en la blockchain que, a su vez, almacenan y acuerdan todos los nodos.

Los mecanismos criptográficos garantizan que, una vez que las transacciones se verifican y se añaden a la blockchain, ya no se pueden manipular; los mismos mecanismos garantizan también que todas las transacciones se firman y se ejecutan con los "permisos" apropiados (nadie debería poder enviar activos digitales desde la cuenta de Alice, excepto la propia Alice).

## ¿Qué es ether? {#what-is-ether}

El propósito de Ether, la criptomoneda, es permitir la existencia de un mercado computacional. Este mercado proporciona un incentivo económico para que los participantes puedan verificar/ejecutar solicitudes de transacción y proporcionar recursos computacionales a la red.

Cualquier participante que emita una petición de transacción debe aportar también cierta cantidad de ether a la red, la recompensa se concederá a quien haga el trabajo completo de verificar la transacción, ejecutarla, incluirla en la blockchain y emitirla a la red.

La cantidad de ether pagada va en función de la duración del cálculo. Esto también previene que los participantes malintencionados congestionen la red solicitando la ejecución de bucles infinitos o scripts que consumen muchos recursos, ya que se les cobrará continuamente.

## ¿Qué son las dapps? {#what-are-dapps}

En la práctica, los participantes no escriben código nuevo cada vez que desean solicitar un cálculo en la EVM. En su lugar, los desarrolladores de aplicaciones cargan programas (fragmentos de código reutilizables) en el almacén de la EVM y, a continuación, los usuarios solicitan la ejecución de estos fragmentos de código con distintos parámetros. Llamamos contratos inteligentes, o "smart contracts", a los programas cargados y ejecutados por la red.

A nivel muy básico, se puede pensar en un contrato inteligente como una especie de máquina expendedora: un script que, cuando se solicita con ciertos parámetros, realiza algunas acciones o cálculos si se cumplen determinadas condiciones. Por ejemplo, un simple contrato inteligente de proveedor podría crear y asignar la propiedad de un recurso digital si la persona que lo solicita envía ether a un destinatario específico.

Cualquier desarrollador puede crear un contrato inteligente y hacerlo público en la red, usando la blockchain como su capa de datos, a cambio de una tasa/comisión pagada a la red. A continuación, cualquier usuario puede solicitar el uso del contrato inteligente para ejecutar su código, de nuevo, a cambio de una comisión pagada a la red.

Así pues, mediante los contratos inteligentes los desarrolladores pueden construir e implementar arbitrariamente complejas aplicaciones y servicios orientados al usuario: mercados, instrumentos financieros, juegos, etc.

## Terminología {#terminology}

### Blockchain {#blockchain}

La secuencia de todos los bloques que se han incorporado a la red Ethereum en la historia de la red. Llamado así debido a que cada bloque contiene una referencia del bloque anterior, lo que nos ayuda a mantener un orden en todos los bloques (y sobre todo el historial exacto).

### ETH {#eth}

La criptomoneda nativa de Ethereum. Los usuarios pagan con ether a otros usuarios para que se cumplan sus requisitos de ejecución de código.

### EVM {#evm}

La máquina virtual Ethereum es el ordenador virtual global en el que cada participante de la red de Ethereum realiza almacenamientos y establece acuerdos. Cualquier participante puede solicitar la ejecución de código arbitrario sobre la EVM; la ejecución de código cambia el estado de la EVM.

[Más información acerca de la EVM](/developers/docs/evm/)

### Nodos {#nodes}

Son máquinas reales que almacenan el estado de la EVM. Los nodos se comunican entre sí para propagar información sobre el estado de la EVM y los nuevos cambios de estado. Además, cualquier usuario puede solicitar la ejecución de código mediante la transmisión de la solicitud de ejecución de código desde un nodo. La propia red de Ethereum es el conjunto de todos los nodos de Ethereum y sus comunicaciones.

[Más sobre nodos](/developers/docs/nodes-and-clients/)

### Cuentas {#accounts}

¿Dónde se almacenan los ether? Los usuarios pueden inicializar cuentas, depositar ether en las cuentas y transferir ether desde sus cuentas a otros usuarios. Las cuentas y los saldos de las cuentas están almacenados en una gran tabla en la EVM; forman parte del estado general de la EVM.

[Más información sobre las cuentas](/developers/docs/accounts/)

### Transacciones {#transactions}

Una "solicitud de transacción" es el término formal para una solicitud de ejecución de código en la EVM, y una "transacción" es una solicitud de transacción completa y el cambio relacionado en el estado de la EVM. Cualquier usuario puede transmitir una solicitud de transacción a la red desde un nodo. Para que la solicitud de transacción realmente afecte al estado acordado de la EVM, algún otro nodo debe validarlo, ejecutarlo y "entregarlo a la red". La ejecución de cualquier código causa un cambio de estado en la EVM; a partir del consenso, este cambio de estado se transmite a todos los nodos en la red. Algunos ejemplos de transacciones:

- Enviar X ether desde mi cuenta a la cuenta de Alice.
- Publicar algo de código del contrato inteligente en la memoria de la EVM.
- Ejecutar el código del contrato inteligente en la dirección X en la EVM, con los argumentos Y.

[Más información sobre las transacciones](/developers/docs/transactions/)

### Bloques {#blocks}

El volumen de transacciones es muy alto, así las transacciones se "consensúan" en lotes o bloques. Generalmente los bloques contienen docenas de cientos de transacciones.

[Más información sobre los bloques](/developers/docs/blocks/)

### Contratos inteligentes {#smart-contracts}

Un fragmento de código reutilizable (un programa), que publica un desarrollador en la memoria de la EVM. Cualquiera que pueda solicitar que el código del contrato inteligente se ejecute al hacer una solicitud de transacción. Como los desarrolladores pueden escribir arbitrariamente aplicaciones ejecutables en la EVM (juegos, mercados, instrumentos financieros, etc.) mediante la publicación de contratos inteligentes, estos suelen denominarse [dapps o aplicaciones descentralizadas](/developers/docs/dapps/).

[Más sobre Contratos Inteligentes](/developers/docs/smart-contracts/)

## Leer más {#further-reading}

- [Informe oficial de Ethereum](/whitepaper/)

## Tutoriales relacionados {#related-tutorials}

- [Guía de desarrollador para Ethereum. parte 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/)_: Una exploración para usuarios principiantes de Ethereum que utilicen Python y web3.py_
