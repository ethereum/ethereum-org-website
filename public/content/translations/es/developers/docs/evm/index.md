---
title: Máquina virtual de Ethereum (EVM)
description: Una introducción a la máquina virtual de Ethereum y su relación con el estado, las transacciones y los contratos inteligentes.
lang: es
---

La representación física de EVM no se puede describir del mismo modo que una nube o una ola, pero _existe_ como una única entidad sustentada por miles de computadoras conectadas ejecutando un cliente de Ethereum.

El propio protocolo Ethereum existe únicamente con el propósito de mantener el funcionamiento continuo, ininterrumpido e inmutable de esta máquina de estado especial. Es el entorno en el que cohabitan todas las cuentas de Ethereum y los contratos inteligentes. En cualquier bloque de la cadena, Ethereum tiene un único estado «canónico» y la EVM es la que define las reglas de cálculo de un nuevo estado válido de bloque a bloque.

## Requisitos previos {#prerequisites}

Para comprender la EVM es necesario estar familiarizado con terminología básica y común de las ciencias informáticas, como [bytes](https://wikipedia.org/wiki/Byte), [memoria](https://wikipedia.org/wiki/Computer_memory) y [pila](https://wikipedia.org/wiki/Stack_(abstract_data_type)). También sería útil sertirse cómodo con los conceptos de criptografía/cadena de bloques[funciones hash](https://wikipedia.org/wiki/Cryptographic_hash_function) y el [árbol Merkle](https://wikipedia.org/wiki/Merkle_tree).

## Del libro de contabilidad a la máquina de estado {#from-ledger-to-state-machine}

La analogía del "libro de contabilidad distribuido" suele utilizarse para describir blockchains como Bitcoin, que permite la existencia de una moneda descentralizada que utiliza herramientas fundamentales de criptografía. El libro mayor mantiene un registro de actividad que debe adherirse a un conjunto de reglas que rigen lo que alguien puede y no puede hacer para modificar el libro. Por ejemplo, una dirección de Bitcoin no puede gastar más Bitcoin de los que ha recibido previamente. Estas reglas sustentan todas las transacciones de Bitcoin y muchas otras blockchains.

Aunque Ethereum tenga su propia criptomoneda nativa (Ether), que sigue casi exactamente las mismas reglas intuitivas, también permite el uso de una función mucho más poderosa: [los contratos inteligentes](/developers/docs/smart-contracts/). Para explicar esta característica más compleja se requiere una analogía más sofisticada. En lugar de un libro mayor distribuido, Ethereum es una [máquina de estado](https://wikipedia.org/wiki/Finite-state_machine) distribuida. El estado de Ethereum es una gran estructura de datos, que no solo sostiene todas las cuentas y saldos, sino que también alberga el _estado de la máquina_. Este puede cambiar de bloque a bloque según un conjunto de reglas predefinidas, así como ejecutar un código de máquina arbitrario. Las reglas específicas de cambiar el estado de bloque a bloque las define la EVM.

![Un diagrama que muestra la composición de la EVM.](./evm.png) _Diagrama adaptado de [Ethereum EVM ilustrado](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Función de transición de estado de Ethereum {#the-ethereum-state-transition-function}

La EVM se comporta como una función matemática: dada una entrada, esta produce una salida determinista. Por tanto, es bastante útil para describir formalmente a Ethereum como una **función de transición de estado**:

```
Y(S, T)= S'
```

Dado un estado válido anterior `(S)` y un nuevo conjunto de transacciones válidas `(T)`, la función de transición de estado de Ethereum `Y(S, T)` produce un nuevo estado de salida válido `S'`.

### Estado {#state}

En el contexto de Ethereum, el estado es una gran estructura de datos llamada [Merkle Patricia Trie modificado](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/), que mantiene todas las [cuentas](/developers/docs/accounts/) enlazadas mediante los hashes y reducibles a un solo hash raíz almacenado en la cadena de bloques.

### Transacciones {#transactions}

Las transacciones son instrucciones firmadas criptográficamente desde las cuentas. Hay dos tipos de transacciones: aquellas que resultan de llamadas de mensajes y aquellas que resultan de la creación de contratos.

La creación de contratos da lugar a la creación de una nueva cuenta de contrato, que contiene el bytecode compilado del [contrato inteligente](/developers/docs/smart-contracts/anatomy/). Cada vez que otra cuenta realiza una llamada de mensaje al contrato, este ejecuta su bytecode.

## Instrucciones de la EVM {#evm-instructions}

La EVM se ejecuta como una [máquina de pila](https://wikipedia.org/wiki/Stack_machine) con una profundidad de 1024 ítems. Cada ítem es una palabra de 256 bits, que se selecciona para utilizar fácilmente con la criptografía de 256 bits (como los hashes Keccak 256 o las firmas secp256k1).

Durante la ejecución, la EVM mantiene una _memoria_ temporal (como un array de bytes con direccionamiento por palabras), que no se conserva entre transacciones.

Los contratos, sin embargo, contienen un Merkle Patricia trie de _almacenamiento_ (como una matriz de palabras con direccionamiento por palabra), asociado a la cuenta en cuestión y que forma parte del estado global.

El bytecode compilado del contrato inteligente se ejecuta a través de [códigos de operación](/developers/docs/evm/opcodes) de la EVM, que realizan operaciones estándar de pila como `XOR`, `AND`, `ADD`, `SUB`, etc. La EVM también implementa varias operaciones de pila específicas de las cadenas de bloques, como `ADDRESS`, `BALANCE`,`BLOCKHASH`, etc.

![Un diagrama en el que se muestra dónde se necesita gas para las operaciones de la EVM](../gas/gas.png) _Diagramas adaptados de la [Ethereum EVM ilustrada](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Implementaciones de la EVM {#evm-implementations}

Todas las implementaciones de la EVM deben ser conformes con la especificación descrita en el protocolo de Ethereum.

Durante los nueve años de historia de Ethereum, la EVM ha pasado varias revisiones y existen varias implementaciones de la EVM en distintos lenguajes de programación.

[Los clientes de ejecución de Ethereum](/developers/docs/nodes-and-clients/#execution-clients) incluyen una implementación de EVM. Además, existen múltiples implementaciones independientes, que incluyen:

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_.
- [evmone](https://github.com/ethereum/evmone) - _C++_.
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_.
- [eEVM](https://github.com/microsoft/eevm) - _C++_.
- [revm](https://github.com/bluealloy/revm) - _Rust_

## Más información {#further-reading}

- [Libro amarillo de Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper, también conocido como KEVM: semántica de EVM en K](https://jellopaper.org/)
- [El Beigepaper](https://github.com/chronaeon/beigepaper)
- [Códigos de operación de la máquina virtual de Ethereum](https://www.ethervm.io/)
- [Referencia interactiva de códigos de operación de máquina virtual Ethereum](https://www.evm.codes/)
- [Una breve introducción a la documentación de Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)

## Temas relacionados {#related-topics}

- [Gas](/developers/docs/gas/)
