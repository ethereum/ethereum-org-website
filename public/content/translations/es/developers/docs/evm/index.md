---
title: Máquina virtual de Ethereum (EVM)
description: Una introducción a la máquina virtual de Ethereum y su relación con el estado, las transacciones y los contratos inteligentes.
lang: es
---

La Maquina Virtual de Ethereum (EVM) es un ecosistema virtual descentralizado que ejecuta código consistentemente y de forma segura en todos los nodos de Ethereum. Los nodos ejecutan la EVM para ejecutar contratos inteligentes, utilizando "[gas](/developers/docs/gas/)" para medir el esfuerzo computacional requerido para las [operaciones](/developers/docs/evm/opcodes/), lo que garantiza una asignación eficiente de recursos y la seguridad de la red.

## Requisitos previos {#prerequisites}

Para comprender la EVM es necesario tener cierta familiaridad con la terminología común en las ciencias de la computación, como los [bytes](https://wikipedia.org/wiki/Byte), la [memoria](https://wikipedia.org/wiki/Computer_memory) y una [pila](https://wikipedia.org/wiki/Stack_\(abstract_data_type\)). También sería útil estar familiarizado con conceptos de criptografía/blockchain, como las [funciones de hash](https://wikipedia.org/wiki/Cryptographic_hash_function) y el [árbol de Merkle](https://wikipedia.org/wiki/Merkle_tree).

## Del libro mayor a la máquina de estado {#from-ledger-to-state-machine}

La analogía del "libro de contabilidad distribuido" suele utilizarse para describir blockchains como Bitcoin, que permite la existencia de una moneda descentralizada que utiliza herramientas fundamentales de criptografía. El libro mayor mantiene un registro de actividad que debe adherirse a un conjunto de reglas que rigen lo que alguien puede y no puede hacer para modificar el libro. Por ejemplo, una dirección de Bitcoin no puede gastar más Bitcoin de los que ha recibido previamente. Estas reglas sustentan todas las transacciones de Bitcoin y muchas otras blockchains.

Aunque Ethereum tiene su propia criptomoneda nativa (ether) que sigue casi exactamente las mismas reglas intuitivas, también posibilita una función mucho más poderosa: los [contratos inteligentes](/developers/docs/smart-contracts/). Para explicar esta característica más compleja se requiere una analogía más sofisticada. En lugar de un libro mayor distribuido, Ethereum es una [máquina de estado](https://wikipedia.org/wiki/Finite-state_machine) distribuida. El estado de Ethereum es una gran estructura de datos que contiene no solo todas las cuentas y saldos, sino también un _estado de máquina_, que puede cambiar de bloque en bloque según un conjunto de reglas predefinidas y ejecutar código de máquina arbitrario. Las reglas específicas de cambiar el estado de bloque a bloque las define la EVM.

![Un diagrama que muestra la composición de la EVM](./evm.png)
_Diagrama adaptado de [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## La función de transición de estado de Ethereum {#the-ethereum-state-transition-function}

La EVM se comporta como una función matemática: dada una entrada, esta produce una salida determinista. Por lo tanto, es bastante útil describir formalmente a Ethereum como que tiene una **función de transición de estado**:

```
Y(S, T)= S'
```

Dado un estado válido anterior `(S)` y un nuevo conjunto de transacciones válidas `(T)`, la función de transición de estado de Ethereum `Y(S, T)` produce un nuevo estado de salida válido `S'`

### Estado {#state}

En el contexto de Ethereum, el estado es una enorme estructura de datos llamada [Trie de Merkle Patricia modificado](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/), que mantiene todas las [cuentas](/developers/docs/accounts/) vinculadas por hashes y reducibles a un único hash raíz almacenado en la cadena de bloques.

### Transacciones {#transactions}

Las transacciones son instrucciones firmadas criptográficamente desde las cuentas. Hay dos tipos de transacciones: aquellas que resultan de llamadas de mensajes y aquellas que resultan de la creación de contratos.

La creación de contratos da lugar a la creación de una nueva cuenta de contrato, que contiene el bytecode compilado del [contrato inteligente](/developers/docs/smart-contracts/anatomy/). Cada vez que otra cuenta realiza una llamada de mensaje al contrato, este ejecuta su bytecode.

## Instrucciones de la EVM {#evm-instructions}

La EVM se ejecuta como una [máquina de pila](https://wikipedia.org/wiki/Stack_machine) con una profundidad de 1024 elementos. Cada ítem es una palabra de 256 bits, que se selecciona para utilizar fácilmente con la criptografía de 256 bits (como los hashes Keccak 256 o las firmas secp256k1).

Durante la ejecución, la EVM mantiene una _memoria_ temporal (como un array de bytes con direccionamiento por palabras), que no se conserva entre transacciones.

### Almacenamiento transitorio

El almacenamiento transitorio es un almacén de clave-valor por transacción al que se accede a través de los códigos de operación `TSTORE` y `TLOAD`. Persiste en todas las llamadas internas durante la misma transacción, pero se borra al final de la transacción. A diferencia de la memoria, el almacenamiento transitorio se modela como parte del estado de la EVM en lugar del marco de ejecución; sin embargo, no se guarda en el estado global. El almacenamiento transitorio permite compartir el estado temporal de forma eficiente en cuanto a gas entre las llamadas internas durante una transacción.

### Almacenamiento

Los contratos contienen un trie de _almacenamiento_ Merkle Patricia (como una matriz de palabras con direccionamiento por palabra), asociado con la cuenta en cuestión y parte del estado global. Este almacenamiento persistente difiere del almacenamiento transitorio, ya que está disponible solo durante una única transacción y no forma parte del trie de almacenamiento persistente de la cuenta.

### Códigos de operación

El bytecode compilado del contrato inteligente se ejecuta como una serie de [códigos de operación](/developers/docs/evm/opcodes) de la EVM, que realizan operaciones de pila estándar como `XOR`, `AND`, `ADD`, `SUB`, etc. La EVM también implementa varias operaciones de pila específicas de la cadena de bloques, como `ADDRESS`, `BALANCE`, `BLOCKHASH`, etc. El conjunto de códigos de operación también incluye `TSTORE` y `TLOAD`, que proporcionan acceso al almacenamiento transitorio.

![Un diagrama que muestra dónde se necesita gas para las operaciones de la EVM](../gas/gas.png)
_Diagramas adaptados de [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Implementaciones de la EVM {#evm-implementations}

Todas las implementaciones de la EVM deben ser conformes con la especificación descrita en el protocolo de Ethereum.

A lo largo de los diez años de historia de Ethereum, la EVM ha sido sometida a varias revisiones y existen varias implementaciones de la EVM en diversos lenguajes de programación.

Los [clientes de ejecución de Ethereum](/developers/docs/nodes-and-clients/#execution-clients) incluyen una implementación de la EVM. Además, existen múltiples implementaciones independientes, que incluyen:

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## Lecturas recomendadas {#further-reading}

- [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper, también conocido como KEVM: Semántica de la EVM en K](https://jellopaper.org/)
- [The Beigepaper](https://github.com/chronaeon/beigepaper)
- [Códigos de operación de la Máquina Virtual de Ethereum](https://www.ethervm.io/)
- [Referencia interactiva de códigos de operación de la Máquina Virtual de Ethereum](https://www.evm.codes/)
- [Una breve introducción en la documentación de Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [Mastering Ethereum - La Máquina Virtual de Ethereum](https://github.com/ethereumbook/ethereumbook/blob/openedition/13evm.asciidoc)

## Temas relacionados {#related-topics}

- [Gas](/developers/docs/gas/)
