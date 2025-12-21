---
title: Implementación de contratos inteligentes
description: Aprenda a desplegar contratos inteligentes en redes de Ethereum, incluidos los requisitos previos, las herramientas y los pasos de implementación.
lang: es
---

Necesitas implementar tu contrato inteligente para que esté disponible para los usuarios de una red de Ethereum.

Para implementar un contrato inteligente, envías una transacción de Ethereum que contenga el código del contrato inteligente recopilado sin especificar ningún destinatario.

## Requisitos previos {#prerequisites}

Debería comprender las [redes de Ethereum](/developers/docs/networks/), las [transacciones](/developers/docs/transactions/) y la [anatomía de los contratos inteligentes](/developers/docs/smart-contracts/anatomy/) antes de implementar contratos inteligentes.

Implementar un contrato también cuesta ether (ETH), ya que se almacenan en la cadena de bloques, por lo que debería estar familiarizado con el [gas y las comisiones](/developers/docs/gas/) en Ethereum.

Finalmente, necesitará compilar su contrato antes de implementarlo, así que asegúrese de haber leído sobre la [compilación de contratos inteligentes](/developers/docs/smart-contracts/compiling/).

## Cómo implementar un contrato inteligente {#how-to-deploy-a-smart-contract}

### Lo que necesitará {#what-youll-need}

- El bytecode de su contrato: se genera a través de la [compilación](/developers/docs/smart-contracts/compiling/)
- Ether para gas: Tú pondrás tu límite de gas como cualquier otra transacción; por eso, debes tener en cuenta que la implementación de un contrato inteligente de Ethereum necesitará mucho más gas que una transferencia simple de ETH.
- un script o complemento de implementación
- acceso a un [nodo de Ethereum](/developers/docs/nodes-and-clients/), ya sea ejecutando el suyo propio, conectándose a un nodo público o mediante una clave de API utilizando un [servicio de nodos](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Pasos para implementar un contrato inteligente {#steps-to-deploy}

Los pasos específicos involucrados dependerán del marco de desarrollo en cuestión. Por ejemplo, puede consultar la [documentación de Hardhat sobre la implementación de sus contratos](https://hardhat.org/docs/tutorial/deploying) o la [documentación de Foundry sobre la implementación y verificación de un contrato inteligente](https://book.getfoundry.sh/forge/deploying). Una vez implementado, su contrato tendrá una dirección de Ethereum como otras [cuentas](/developers/docs/accounts/) y podrá ser verificado usando [herramientas de verificación de código fuente](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Herramientas relacionadas {#related-tools}

**Remix - _Remix IDE permite desarrollar, implementar y administrar contratos inteligentes para blockchains como Ethereum_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Plataforma de desarrollo Web3 que proporciona depuración, observabilidad y bloques de construcción de infraestructura para desarrollar, probar, supervisar y operar contratos inteligentes_**

- [tenderly.co](https://tenderly.co/)
- [Documentación](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _Un entorno de desarrollo para compilar, implementar, probar y depurar su software de Ethereum_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Documentación sobre la implementación de sus contratos](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _Implemente fácilmente cualquier contrato en cualquier cadena compatible con EVM, utilizando un solo comando_**

- [Documentación](https://portal.thirdweb.com/deploy/)

**Crossmint - _Plataforma de desarrollo web3 de nivel empresarial para implementar contratos inteligentes, habilitar pagos con tarjeta de crédito y entre cadenas, y usar API para crear, distribuir, vender, almacenar y editar NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Documentación](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Tutoriales relacionados {#related-tutorials}

- [Implementar su primer contrato inteligente](/developers/tutorials/deploying-your-first-smart-contract/) _– Una introducción a la implementación de su primer contrato inteligente en una red de prueba de Ethereum._
- [Hola, mundo | Tutorial de contrato inteligente](/developers/tutorials/hello-world-smart-contract/) _– Un tutorial fácil de seguir para crear e implementar un contrato inteligente básico en Ethereum._
- [Interactuar con otros contratos desde Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Cómo implementar un contrato inteligente a partir de un contrato existente e interactuar con él._
- [Cómo reducir el tamaño de su contrato](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Cómo reducir el tamaño de su contrato para mantenerlo por debajo del límite y ahorrar en gas_

## Lecturas adicionales {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Implementar sus contratos con Hardhat](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_¿Conoce algún recurso de la comunidad que le haya sido de ayuda? ¡Edite esta página y agréguela!_

## Temas relacionados {#related-topics}

- [Marcos de desarrollo](/developers/docs/frameworks/)
- [Ejecutar un nodo de Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Nodos como servicio](/developers/docs/nodes-and-clients/nodes-as-a-service)
