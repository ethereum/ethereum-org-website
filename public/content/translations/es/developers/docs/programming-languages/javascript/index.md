---
title: Ethereum para desarrolladores de JavaScript
description: Aprende cómo desarrollar para Ethereum mediante proyectos y herramientas basados en JavaScript.
lang: es
---

JavaScript se encuentra entre los lenguajes más populares del ecosistema Ethereum. De hecho, hay un [equipo](https://github.com/ethereumjs) dedicado a programar la mayor cantidad posible de Ethereum en JavaScript.

Hay posibilidad de programar en JavaScript (o algo similar) en [todos los niveles de la pila](/developers/docs/ethereum-stack/).

## Interactuar con Ethereum {#interact-with-ethereum}

### Bibliotecas API JavaScript {#javascript-api-libraries}

Si quieres escribir JavaScript para consultas del blockchain, enviar transacciones y demás, la forma más conveniente es utilizando la [biblioteca de API de JavaScript](/developers/docs/apis/javascript/). Estas API permiten a los desarrolladores interactuar fácilmente con los nodos [de la red Ethereum](/developers/docs/nodes-and-clients/).

Puedes utilizar estas bibliotecas para interactuar con contratos inteligentes en Ethereum de modo que es posible construir una dapp que solo utilice JavaScript para interactuar con contratos preexistentes.

**Revisa**

- [Web3.js](https://web3js.readthedocs.io/)
- [Ethers.js](https://docs.ethers.io/) _: Incluye la implementación de una cartera de Ethereum y utilidades en JavaScript y TypeScript._

### Contratos inteligentes {#smart-contracts}

Si eres un programador de JavaScript y deseas escribir un contrato inteligente propio, te interesa familiarizarte con [Solidity](https://solidity.readthedocs.io). Es el lenguaje más popular para contratos y está muy inspirado en JavaScript.

Más información sobre [contratos inteligentes](/developers/docs/smart-contracts/).

## Comprender el protocolo {#understand-the-protocol}

### La máquina virtual de Ethereum {#the-ethereum-virtual-machine}

Hay una implementación de la máquina virtual de [Ethereum](/developers/docs/evm/) en JavaScript. Soporta las últimas reglas de bifurcación. Las reglas de bifurcación se refieren a los cambios realizados a la EVM como resultado de las actualizaciones previstas.

Esto está dividido en varios paquetes de JavaScript, los cuales pueden ser revisados para un mayor entendimiento:

- Cuentas
- Bloques
- La propia blockchain
- Transacciones
- Y más...

Esto te ayudará a entender cosas como "¿Cuál es la estructura de datos de una cuenta?".

Si prefieres leer el código, JavaScript podría ser una buena alternativa para leer detenidamente nuestros documentos.

**Revisa el monorepo**  
[`ethereumjs`](https://github.com/ethereumjs/ethereumjs-vm)

### Nodos y clientes {#nodes-and-clients}

Hay un cliente Ethereumjs en desarrollo. Esto te permitirá profundizar en cómo trabajan los clientes de Ethereum en un idioma que puedas comprender.

**Revisa el cliente**  
[`ethereumjs-client`](https://github.com/ethereumjs/ethereumjs-client)

## Otros proyectos {#other-projects}

También están ocurriendo muchas otras cosas en la tierra de Ethereum JavaScript, que incluyen:

- bibliotecas de utilidades del monedero.
- herramientas para generar, importar y exportar claves de Ethereum.
- una implementación del `merkle-patricia-tree`: Una estructura de datos descrita en el papel amarillo de Ethereum.

Accede a aquello que más te interesa en el repositorio [EthereumJS repo](https://github.com/ethereumjs)

## Leer más {#further-reading}

_¿Conoces algún recurso en la comunidad que te haya servido de ayuda? Edita esta página y añádelo._
