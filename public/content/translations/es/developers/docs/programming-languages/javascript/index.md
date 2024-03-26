---
title: Ethereum para desarrolladores de JavaScript
description: Aprende cómo desarrollar para Ethereum mediante proyectos y herramientas basados en JavaScript.
lang: es
---

JavaScript se encuentra entre los lenguajes más populares del ecosistema Ethereum. De hecho, hay un [equipo](https://github.com/ethereumjs) dedicado a programar la mayor cantidad posible de Ethereum en JavaScript.

Hay posibilidad de programar en JavaScript (o algo similar) en [todos los niveles de la pila](/developers/docs/ethereum-stack/).

## Interactuar con Ethereum {#interact-with-ethereum}

### Bibliotecas API JavaScript {#javascript-api-libraries}

Si quiere escribir JavaScript para consultar la cadena de bloques, enviar transacciones y demás, la forma más conveniente es utilizando la [biblioteca de API de JavaScript](/developers/docs/apis/javascript/). Estas API permiten a los desarrolladores interactuar fácilmente con los [nodos de la red Ethereum](/developers/docs/nodes-and-clients/).

Puedes utilizar estas bibliotecas para interactuar con contratos inteligentes en Ethereum de modo que es posible construir una dapp que solo utilice JavaScript para interactuar con contratos preexistentes.

**Revisa**

- [Web3.js](https://web3js.readthedocs.io/)
- [Ethers.js](https://docs.ethers.io/) _: Incluye la implementación de una cartera de Ethereum y utilidades en JavaScript y TypeScript._
- [viem:](https://viem.sh) interfaz de TypeScript para Ethereum que proporciona primitives de bajo nivel sin estado para interactuar con Ethereum.

### Contratos inteligentes {#smart-contracts}

Si es desarrollador de JavaScript y quiere escribir su propio contrato inteligente, tal vez quiera familiarizarse con [Solidity](https://solidity.readthedocs.io). Este es el contrato de lenguaje inteligente más popular y es sintácticamente similar a JavaScript, lo que hace que sea más fácil de aprender.

Más información sobre [contratos inteligentes](/developers/docs/smart-contracts/).

## Comprender el protocolo {#understand-the-protocol}

### La máquina virtual de Ethereum {#the-ethereum-virtual-machine}

Hay una implementación JavaScript de la [máquina virtual de Ethereum](/developers/docs/evm/). Soporta las últimas reglas de bifurcación. Las reglas de bifurcación se refieren a los cambios realizados a la EVM como resultado de las actualizaciones previstas.

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

Un cliente de Ethereumjs es un desarrollo activo que le permite profundizar en cómo funcionan los clientes Ethereum en un idioma que comprenda; JavaScript.

Solía ​​estar alojado en un [`repositorio`](https://github.com/ethereumjs/ethereumjs-client) independiente; sin embargo, luego se fusionó con el monorepo EthereumVM como un paquete.

**Revise el cliente**  
[`ethereumjs-client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## Otros proyectos {#other-projects}

También están ocurriendo muchas otras cosas en la tierra de Ethereum JavaScript, que incluyen:

- bibliotecas de utilidades del monedero.
- herramientas para generar, importar y exportar claves de Ethereum.
- una implementación del `merkle-patricia-tree`: Una estructura de datos descrita en el papel amarillo de Ethereum.

Profundice en cualquier tema que le interese en el [repositorio EthereumJS](https://github.com/ethereumjs).

## Más información {#further-reading}

_¿Conoce algún recurso de la comunidad que le haya servido de ayuda? Edite esta página y añádalo._
