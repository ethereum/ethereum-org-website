---
title: "Máquina Virtual de Ethereum (EVM)"
description: "Una introducción a la máquina virtual de Ethereum y cómo se relaciona con el estado, las transacciones y los contratos inteligentes."
lang: es
---

La Máquina Virtual de Ethereum (EVM) es un entorno virtual descentralizado que ejecuta código de manera consistente y segura en todos los nodos de [Ethereum](/). Los nodos ejecutan la EVM para ejecutar contratos inteligentes, utilizando «[gas](/developers/docs/gas/)» para medir el esfuerzo computacional requerido para las [operaciones](/developers/docs/evm/opcodes/), garantizando una asignación eficiente de recursos y la seguridad de la red.

## Requisitos previos {#prerequisites}

Es necesario tener cierta familiaridad básica con la terminología común en informática, como [bytes](https://wikipedia.org/wiki/Byte), [memoria](https://wikipedia.org/wiki/Computer_memory) y [pila](<https://wikipedia.org/wiki/Stack_(abstract_data_type)>) para entender la EVM. También sería útil estar familiarizado con conceptos de criptografía y cadenas de bloques como las [funciones hash](https://wikipedia.org/wiki/Cryptographic_hash_function) y el [árbol de Merkle](https://wikipedia.org/wiki/Merkle_tree).

## Del libro mayor a la máquina de estado {#from-ledger-to-state-machine}

La analogía de un «libro mayor distribuido» se utiliza a menudo para describir cadenas de bloques como Bitcoin, que permiten una moneda descentralizada utilizando herramientas fundamentales de criptografía. El libro mayor mantiene un registro de actividad que debe adherirse a un conjunto de reglas que rigen lo que alguien puede y no puede hacer para modificar el libro mayor. Por ejemplo, una dirección de Bitcoin no puede gastar más Bitcoin del que ha recibido previamente. Estas reglas sustentan todas las transacciones en Bitcoin y en muchas otras cadenas de bloques.

Aunque Ethereum tiene su propia criptomoneda nativa (ether) que sigue casi exactamente las mismas reglas intuitivas, también permite una función mucho más potente: los [contratos inteligentes](/developers/docs/smart-contracts/). Para esta característica más compleja, se requiere una analogía más sofisticada. En lugar de un libro mayor distribuido, Ethereum es una [máquina de estado](https://wikipedia.org/wiki/Finite-state_machine) distribuida. El estado de Ethereum es una gran estructura de datos que no solo contiene todas las cuentas y saldos, sino un _estado de la máquina_, que puede cambiar de un bloque a otro de acuerdo con un conjunto de reglas predefinidas, y que puede ejecutar código de máquina arbitrario. Las reglas específicas para cambiar de estado de un bloque a otro están definidas por la EVM.

![A diagram showing the make up of the EVM](./evm.png)
_Diagrama adaptado de [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## La función de transición de estado de Ethereum {#the-ethereum-state-transition-function}

La EVM se comporta como lo haría una función matemática: dada una entrada, produce una salida determinista. Por lo tanto, resulta bastante útil describir Ethereum de manera más formal como si tuviera una **función de transición de estado**:

```
Y(S, T)= S'
```

Dado un estado válido antiguo `(S)` y un nuevo conjunto de transacciones válidas `(T)`, la función de transición de estado de Ethereum `Y(S, T)` produce un nuevo estado de salida válido `S'`

### Estado {#state}

En el contexto de Ethereum, el estado es una enorme estructura de datos llamada [trie de Merkle Patricia modificado](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/), que mantiene todas las [cuentas](/developers/docs/accounts/) enlazadas mediante hashes y reducibles a un único hash raíz almacenado en la cadena de bloques.

### Transacciones {#transactions}

Las transacciones son instrucciones firmadas criptográficamente desde las cuentas. Hay dos tipos de transacciones: las que resultan en llamadas de mensaje y las que resultan en la creación de contratos.

La creación de contratos da como resultado la creación de una nueva cuenta de contrato que contiene el código de bytes compilado del [contrato inteligente](/developers/docs/smart-contracts/anatomy/). Cada vez que otra cuenta realiza una llamada de mensaje a ese contrato, este ejecuta su código de bytes.

## Instrucciones de la EVM {#evm-instructions}

La EVM se ejecuta como una [máquina de pila](https://wikipedia.org/wiki/Stack_machine) con una profundidad de 1024 elementos. Cada elemento es una palabra de 256 bits, que se eligió por la facilidad de uso con la criptografía de 256 bits (como los hashes Keccak-256 o las firmas secp256k1).

Durante la ejecución, la EVM mantiene una _memoria_ transitoria (como una matriz de bytes direccionada por palabras), que no persiste entre transacciones.

### Almacenamiento transitorio {#transient-storage}

El almacenamiento transitorio es un almacén de clave-valor por transacción al que se accede a través de los códigos de operación `TSTORE` y `TLOAD`. Persiste en todas las llamadas internas durante la misma transacción, pero se borra al final de la transacción. A diferencia de la memoria, el almacenamiento transitorio se modela como parte del estado de la EVM en lugar del marco de ejecución, aunque no se confirma en el estado global. El almacenamiento transitorio permite compartir estados temporales de manera eficiente en cuanto a gas a través de llamadas internas durante una transacción.

### Almacenamiento {#storage}

Los contratos contienen un trie de _almacenamiento_ de Merkle Patricia (como una matriz de palabras direccionable por palabras), asociado con la cuenta en cuestión y parte del estado global. Este almacenamiento persistente difiere del almacenamiento transitorio, que está disponible solo durante la duración de una sola transacción y no forma parte del trie de almacenamiento persistente de la cuenta.

### Códigos de operación {#opcodes}

El código de bytes compilado del contrato inteligente se ejecuta como una serie de [códigos de operación](/developers/docs/evm/opcodes) de la EVM, que realizan operaciones de pila estándar como `XOR`, `AND`, `ADD`, `SUB`, etc. La EVM también implementa una serie de operaciones de pila específicas de la cadena de bloques, como `ADDRESS`, `BALANCE`, `BLOCKHASH`, etc. El conjunto de códigos de operación también incluye `TSTORE` y `TLOAD`, que proporcionan acceso al almacenamiento transitorio.

![A diagram showing where gas is needed for EVM operations](../gas/gas.png)
_Diagramas adaptados de [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Implementaciones de la EVM {#evm-implementations}

Todas las implementaciones de la EVM deben adherirse a la especificación descrita en el Libro Amarillo de Ethereum.

A lo largo de los diez años de historia de Ethereum, la EVM ha sido objeto de varias revisiones, y existen varias implementaciones de la EVM en diversos lenguajes de programación.

Los [clientes de ejecución de Ethereum](/developers/docs/nodes-and-clients/#execution-clients) incluyen una implementación de la EVM. Además, existen múltiples implementaciones independientes, que incluyen:

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## Más información {#further-reading}

- [Libro Amarillo de Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper o KEVM: Semántica de la EVM en K](https://jellopaper.org/)
- [El Beigepaper](https://github.com/chronaeon/beigepaper)
- [Códigos de operación de la Máquina Virtual de Ethereum](https://www.ethervm.io/)
- [Referencia interactiva de los códigos de operación de la Máquina Virtual de Ethereum](https://www.evm.codes/)
- [Una breve introducción en la documentación de Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [Dominando Ethereum: La Máquina Virtual de Ethereum](https://github.com/ethereumbook/ethereumbook/blob/openedition/13evm.asciidoc)

## Temas relacionados {#related-topics}

- [Gas](/developers/docs/gas/)

## Tutoriales: Máquina Virtual de Ethereum (EVM) / Códigos de operación en Ethereum {#tutorials}

- [Comprendiendo las especificaciones de la EVM del Libro Amarillo](/developers/tutorials/yellow-paper-evm/) _– Un recorrido guiado por la especificación formal de la EVM del Libro Amarillo de Ethereum._
- [Ingeniería inversa de un contrato](/developers/tutorials/reverse-engineering-a-contract/) _– Cómo aplicar ingeniería inversa a un contrato inteligente compilado utilizando códigos de operación de la EVM._