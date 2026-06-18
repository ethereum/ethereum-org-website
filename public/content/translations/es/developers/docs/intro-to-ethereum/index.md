---
title: Introducción técnica a Ethereum
description: Una introducción a los conceptos básicos de Ethereum para desarrolladores de dapps.
lang: es
---

## ¿Qué es una cadena de bloques? {#what-is-a-blockchain}

Una cadena de bloques es una base de datos pública que se actualiza y comparte a través de muchas computadoras en una red.

"Bloque" se refiere a los datos y al estado que se almacenan en grupos consecutivos conocidos como "bloques". Si envía ETH a otra persona, los datos de la transacción deben agregarse a un bloque para que se realice con éxito.

"Cadena" se refiere al hecho de que cada bloque hace referencia criptográfica a su bloque principal. En otras palabras, los bloques se encadenan entre sí. Los datos de un bloque no pueden cambiar sin cambiar todos los bloques posteriores, lo que requeriría el consenso de toda la red.

Cada computadora en la red debe estar de acuerdo con cada nuevo bloque y con la cadena en su conjunto. Estas computadoras se conocen como "nodos". Los nodos garantizan que todos los que interactúan con la cadena de bloques tengan los mismos datos. Para lograr este acuerdo distribuido, las cadenas de bloques necesitan un mecanismo de consenso.

[Ethereum](/) utiliza un [mecanismo de consenso basado en prueba de participación (PoS)](/developers/docs/consensus-mechanisms/pos/). Cualquiera que quiera agregar nuevos bloques a la cadena debe depositar ETH en garantía (la moneda nativa de Ethereum) como colateral y ejecutar un software de validador. Estos "validadores" pueden ser seleccionados al azar para proponer bloques que otros validadores verifican y agregan a la cadena de bloques. Existe un sistema de recompensas y penalizaciones que incentiva fuertemente a los participantes a ser honestos y a estar disponibles en línea tanto como sea posible.

Si desea ver cómo se aplica una función hash a los datos de la cadena de bloques y cómo se agregan posteriormente al historial de referencias de bloques, asegúrese de consultar [esta demostración](https://andersbrownworth.com/blockchain/blockchain) de Anders Brownworth y ver el video que la acompaña a continuación.

Vea a Anders explicar los hashes en las cadenas de bloques:

<VideoWatch slug="blockchain-101-visual-demo" />

## ¿Qué es Ethereum? {#what-is-ethereum}

Ethereum es una cadena de bloques que lleva una computadora incorporada. Es la base para construir aplicaciones y organizaciones de forma descentralizada, sin permisos y resistente a la censura.

En el universo de Ethereum, hay una única computadora canónica (llamada Máquina Virtual de Ethereum, o EVM) sobre cuyo estado todos en la red de Ethereum están de acuerdo. Todos los que participan en la red de Ethereum (cada nodo de Ethereum) mantienen una copia del estado de esta computadora. Además, cualquier participante puede emitir una solicitud para que esta computadora realice cálculos arbitrarios. Cada vez que se emite una solicitud de este tipo, otros participantes de la red verifican, validan y llevan a cabo ("ejecutan") el cálculo. Esta ejecución provoca un cambio de estado en la EVM, que se compromete y se propaga por toda la red.

Las solicitudes de cálculo se denominan solicitudes de transacción; el registro de todas las transacciones y el estado actual de la EVM se almacenan en la cadena de bloques, que a su vez es almacenada y acordada por todos los nodos.

Los mecanismos criptográficos garantizan que, una vez que las transacciones se verifican como válidas y se agregan a la cadena de bloques, no puedan ser manipuladas posteriormente. Los mismos mecanismos también garantizan que todas las transacciones se firmen y ejecuten con los "permisos" adecuados (nadie debería poder enviar activos digitales desde la cuenta de Alice, excepto la propia Alice).

## ¿Qué es el ether? {#what-is-ether}

El **ether (ETH)** es la criptomoneda nativa de Ethereum. El propósito de ETH es permitir un mercado para la computación. Dicho mercado proporciona un incentivo económico para que los participantes verifiquen y ejecuten solicitudes de transacciones y proporcionen recursos computacionales a la red.

Cualquier participante que emita una solicitud de transacción también debe ofrecer una cierta cantidad de ETH a la red como recompensa. La red quemará parte de la recompensa y otorgará el resto a quien finalmente haga el trabajo de verificar la transacción, ejecutarla, comprometerla en la cadena de bloques y emitirla a la red.

La cantidad de ETH pagada corresponde a los recursos necesarios para realizar el cálculo. Estas recompensas también evitan que los participantes malintencionados obstruyan intencionalmente la red al solicitar la ejecución de cálculos infinitos u otros scripts que consumen muchos recursos, ya que estos participantes deben pagar por los recursos de cálculo.

El ETH también se utiliza para proporcionar seguridad criptoeconómica a la red de tres maneras principales: 1) se utiliza como un medio para recompensar a los validadores que proponen bloques o denuncian el comportamiento deshonesto de otros validadores; 2) los validadores lo depositan en garantía (hacen staking), actuando como colateral contra el comportamiento deshonesto (si los validadores intentan comportarse mal, su ETH puede ser destruido); 3) se utiliza para ponderar los 'votos' de los bloques recién propuestos, alimentando la parte de elección de bifurcación del mecanismo de consenso.

## ¿Qué son los contratos inteligentes? {#what-are-smart-contracts}

En la práctica, los participantes no escriben código nuevo cada vez que quieren solicitar un cálculo en la EVM. En cambio, los desarrolladores de aplicaciones suben programas (fragmentos de código reutilizables) al estado de la EVM, y los usuarios realizan solicitudes para ejecutar estos fragmentos de código con diferentes parámetros. Llamamos "contratos inteligentes" a los programas subidos y ejecutados por la red.

A un nivel muy básico, puede pensar en un contrato inteligente como una especie de máquina expendedora: un script que, cuando se llama con ciertos parámetros, realiza algunas acciones o cálculos si se cumplen ciertas condiciones. Por ejemplo, un contrato inteligente de proveedor simple podría crear y asignar la propiedad de un activo digital si el llamador envía ETH a un destinatario específico.

Cualquier desarrollador puede crear un contrato inteligente y hacerlo público en la red, utilizando la cadena de bloques como su capa de datos, a cambio de una tarifa pagada a la red. Cualquier usuario puede entonces llamar al contrato inteligente para ejecutar su código, nuevamente a cambio de una tarifa pagada a la red.

Por lo tanto, con los contratos inteligentes, los desarrolladores pueden construir y desplegar aplicaciones y servicios orientados al usuario arbitrariamente complejos, tales como: mercados, instrumentos financieros, juegos, etc.

## Terminología {#terminology}

### Cadena de bloques {#blockchain}

La secuencia de todos los bloques que se han comprometido en la red de Ethereum en la historia de la red. Se llama así porque cada bloque contiene una referencia al bloque anterior, lo que nos ayuda a mantener un orden sobre todos los bloques (y, por lo tanto, sobre el historial preciso).

### ETH {#eth}

El **ether (ETH)** es la criptomoneda nativa de Ethereum. Los usuarios pagan ETH a otros usuarios para que se cumplan sus solicitudes de ejecución de código.

[Más sobre el ETH](/developers/docs/intro-to-ether/)

### EVM {#evm}

La Máquina Virtual de Ethereum (EVM) es la computadora virtual global cuyo estado almacena y acuerda cada participante en la red de Ethereum. Cualquier participante puede solicitar la ejecución de código arbitrario en la EVM; la ejecución del código cambia el estado de la EVM.

[Más sobre la EVM](/developers/docs/evm/)

### Nodos {#nodes}

Las máquinas de la vida real que almacenan el estado de la EVM. Los nodos se comunican entre sí para propagar información sobre el estado de la EVM y los nuevos cambios de estado. Cualquier usuario también puede solicitar la ejecución de código emitiendo una solicitud de ejecución de código desde un nodo. La red de Ethereum en sí es el agregado de todos los nodos de Ethereum y sus comunicaciones.

[Más sobre los nodos](/developers/docs/nodes-and-clients/)

### Cuentas {#accounts}

Donde se almacena el ETH. Los usuarios pueden inicializar cuentas, depositar ETH en las cuentas y realizar transferencias de ETH desde sus cuentas a otros usuarios. Las cuentas y los saldos de las cuentas se almacenan en una gran tabla en la EVM; son parte del estado general de la EVM.

[Más sobre las cuentas](/developers/docs/accounts/)

### Transacciones {#transactions}

Una "solicitud de transacción" es el término formal para una solicitud de ejecución de código en la EVM, y una "transacción" es una solicitud de transacción cumplida y el cambio asociado en el estado de la EVM. Cualquier usuario puede emitir una solicitud de transacción a la red desde un nodo. Para que la solicitud de transacción afecte el estado acordado de la EVM, debe ser validada, ejecutada y "comprometida en la red" por otro nodo. La ejecución de cualquier código provoca un cambio de estado en la EVM; tras el compromiso, este cambio de estado se emite a todos los nodos de la red. Algunos ejemplos de transacciones:

- Enviar X ETH desde mi cuenta a la cuenta de Alice.
- Publicar algún código de contrato inteligente en el estado de la EVM.
- Ejecutar el código del contrato inteligente en la dirección X en la EVM, con los argumentos Y.

[Más sobre las transacciones](/developers/docs/transactions/)

### Bloques {#blocks}

El volumen de transacciones es muy alto, por lo que las transacciones se "comprometen" en lotes o bloques. Los bloques generalmente contienen de docenas a cientos de transacciones.

[Más sobre los bloques](/developers/docs/blocks/)

### Contratos inteligentes {#smart-contracts}

Un fragmento de código reutilizable (un programa) que un desarrollador publica en el estado de la EVM. Cualquiera puede solicitar que se ejecute el código del contrato inteligente realizando una solicitud de transacción. Debido a que los desarrolladores pueden escribir aplicaciones ejecutables arbitrarias en la EVM (juegos, mercados, instrumentos financieros, etc.) mediante la publicación de contratos inteligentes, a menudo también se les llama [aplicaciones descentralizadas (dapps)](/developers/docs/dapps/).

[Más sobre los contratos inteligentes](/developers/docs/smart-contracts/)

## A dónde ir después {#where-to-go-next}

La mayoría de los lectores siguen la documentación en orden, pero el camino más corto depende de lo que esté intentando construir:

- **Dapps que interactúan con Ethereum:** [cuentas](/developers/docs/accounts/) y [transacciones](/developers/docs/transactions/), luego elija un [marco de trabajo](/developers/docs/frameworks/).
- **Desarrollo de contratos inteligentes:** [contratos inteligentes](/developers/docs/smart-contracts/) y [lenguajes de programación](/developers/docs/programming-languages/).
- **Nodos y staking:** [nodos y clientes](/developers/docs/nodes-and-clients/), luego [mecanismos de consenso](/developers/docs/consensus-mechanisms/).

## Lecturas adicionales {#further-reading}

- [Documento técnico de Ethereum](/whitepaper/)
- [¿Cómo funciona Ethereum, de todos modos?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369) - _Preethi Kasireddy_ (**Nota:** este recurso sigue siendo valioso, pero tenga en cuenta que es anterior a [La Fusión](/roadmap/merge) y, por lo tanto, todavía se refiere al mecanismo de prueba de trabajo (PoW) de Ethereum; en realidad, Ethereum ahora está protegido mediante [prueba de participación (PoS)](/developers/docs/consensus-mechanisms/pos))

### ¿Aprende mejor de forma visual? {#visual-learner}

Esta serie de videos ofrece una exploración exhaustiva de los temas fundamentales:

<VideoWatch slug="ethereum-basics-intro" />

[Lista de reproducción de conceptos básicos de Ethereum](https://youtube.com/playlist?list=PLqgutSGloqiJyyoL0zvLVFPS-GMD2wKa5&si=kZTf5I7PKGTXDsOZ)

_¿Conoce algún recurso de la comunidad que le haya ayudado? ¡Edite esta página y agréguelo!_

## Tutoriales relacionados {#related-tutorials}

- [Guía de Ethereum para desarrolladores, parte 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _– Una exploración de Ethereum muy amigable para principiantes usando Python y web3.py_