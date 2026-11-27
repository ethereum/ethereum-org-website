---
title: Ethereum para desarrolladores de JavaScript
description: Aprenda a desarrollar para Ethereum utilizando proyectos y herramientas basados en JavaScript.
lang: es
---

JavaScript es uno de los lenguajes más populares en el ecosistema de Ethereum, con implementaciones en JavaScript y TypeScript de todo, desde primitivas centrales del protocolo hasta un cliente de consenso de producción.

Hay oportunidades para escribir JavaScript (o algo similar) en [todos los niveles de la pila](/developers/docs/ethereum-stack/).

## Interactuar con Ethereum {#interact-with-ethereum}

### Bibliotecas de API de JavaScript {#javascript-api-libraries}

Si desea escribir JavaScript para consultar la cadena de bloques, enviar transacciones y más, la forma más conveniente de hacerlo es utilizando una [biblioteca de API de JavaScript](/developers/docs/apis/javascript/). Estas API permiten a los desarrolladores interactuar fácilmente con los [nodos de la red Ethereum](/developers/docs/nodes-and-clients/).

Puede usar estas bibliotecas para interactuar con contratos inteligentes en Ethereum, por lo que es posible crear una aplicación descentralizada (dapp) donde solo use JavaScript para interactuar con contratos preexistentes.

**Consulte**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org): _incluye la implementación de una billetera de Ethereum y utilidades en JavaScript y TypeScript._
- [Viem](https://viem.sh): _una interfaz de TypeScript para Ethereum que proporciona primitivas sin estado de bajo nivel para interactuar con Ethereum._
- [Drift](https://ryangoree.github.io/drift/): _una metabiblioteca de TypeScript con almacenamiento en caché integrado, ganchos (hooks) y simulaciones de prueba (mocks) para un desarrollo de Ethereum sin esfuerzo en todas las bibliotecas de Web3._

### Contratos inteligentes {#smart-contracts}

Si es un desarrollador de JavaScript y desea escribir su propio contrato inteligente, es posible que desee familiarizarse con [Solidity](https://solidity.readthedocs.io). Este es el lenguaje de contratos inteligentes más popular y es sintácticamente similar a JavaScript, lo que puede facilitar su aprendizaje.

Más sobre [contratos inteligentes](/developers/docs/smart-contracts/).

## Comprender el protocolo {#understand-the-protocol}

### La máquina virtual de Ethereum {#the-ethereum-virtual-machine}

Existe una implementación en JavaScript de la [máquina virtual de Ethereum](/developers/docs/evm/). Es compatible con las últimas reglas de bifurcación. Las reglas de bifurcación se refieren a los cambios realizados en la EVM como resultado de actualizaciones planificadas.

Está dividida en varios paquetes de JavaScript que puede consultar para comprender mejor:

- Cuentas
- Bloques
- La propia cadena de bloques
- Transacciones
- Y más...

Esto le ayudará a comprender cosas como "¿cuál es la estructura de datos de una cuenta?".

Si prefiere leer código, este JavaScript podría ser una excelente alternativa a leer nuestra documentación.

**Consulte la EVM**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### Nodos y clientes {#nodes-and-clients}

[Lodestar](https://lodestar.chainsafe.io/) es un cliente de consenso listo para producción escrito en TypeScript y mantenido por ChainSafe. Incluye un nodo baliza y un cliente validador, y es un buen lugar para ver cómo funciona el consenso de prueba de participación de Ethereum en un lenguaje que conoce.

**Consulte Lodestar**  
[`ChainSafe/lodestar`](https://github.com/ChainSafe/lodestar)

En el lado de la ejecución, el cliente EthereumJS está obsoleto y archivado, pero su código fuente sigue disponible para explorar cómo funciona un cliente de Ethereum en JavaScript.

**Consulte el cliente archivado**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/archive/client)

## Otros proyectos {#other-projects}

También están sucediendo muchas otras cosas en el mundo de JavaScript para Ethereum, que incluyen:

- bibliotecas de utilidades para billeteras.
- herramientas para generar, importar y exportar claves de Ethereum.
- una implementación del `merkle-patricia-tree`: una estructura de datos descrita en el Libro Amarillo de Ethereum.

Profundice en lo que más le interese en el [repositorio de EthereumJS](https://github.com/ethereumjs)

## Lecturas adicionales {#further-reading}

_¿Conoce algún recurso de la comunidad que le haya ayudado? ¡Edite esta página y agréguelo!_
