---
title: Despliegue de contratos inteligentes
description: Aprenda a desplegar contratos inteligentes en las redes de Ethereum, incluyendo los requisitos previos, las herramientas y los pasos de despliegue.
lang: es
---

Necesita desplegar su contrato inteligente para que esté disponible para los usuarios de una red de Ethereum.

Para desplegar un contrato inteligente, simplemente envíe una transacción de Ethereum que contenga el código compilado del contrato inteligente sin especificar ningún destinatario.

## Requisitos previos {#prerequisites}

Debería entender las [redes de Ethereum](/developers/docs/networks/), las [transacciones](/developers/docs/transactions/) y la [anatomía de los contratos inteligentes](/developers/docs/smart-contracts/anatomy/) antes de desplegar contratos inteligentes.

Desplegar un contrato también cuesta ether (ETH), ya que se almacenan en la cadena de bloques, por lo que debería estar familiarizado con el [gas y las tarifas](/developers/docs/gas/) en Ethereum.

Finalmente, necesitará compilar su contrato antes de desplegarlo, así que asegúrese de haber leído sobre la [compilación de contratos inteligentes](/developers/docs/smart-contracts/compiling/).

## Cómo desplegar un contrato inteligente {#how-to-deploy-a-smart-contract}

### Qué necesitará {#what-youll-need}

- El código de bytes de su contrato: se genera a través de la [compilación](/developers/docs/smart-contracts/compiling/)
- ETH para el gas: establecerá su límite de gas como en otras transacciones, así que tenga en cuenta que el despliegue de contratos necesita mucho más gas que una simple transferencia de ETH
- un script o complemento de despliegue
- acceso a un [nodo de Ethereum](/developers/docs/nodes-and-clients/), ya sea ejecutando el suyo propio, conectándose a un nodo público o mediante una clave de API utilizando un [servicio de nodos](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Pasos para desplegar un contrato inteligente {#steps-to-deploy}

Los pasos específicos involucrados dependerán del marco de desarrollo en cuestión. Por ejemplo, puede consultar la [documentación de Hardhat sobre el despliegue de sus contratos](https://hardhat.org/docs/tutorial/deploying) o la [documentación de Foundry sobre el despliegue y la verificación de un contrato inteligente](https://book.getfoundry.sh/forge/deploying). Una vez desplegado, su contrato tendrá una dirección de Ethereum como otras [cuentas](/developers/docs/accounts/) y se puede verificar utilizando [herramientas de verificación del código fuente](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Herramientas relacionadas {#related-tools}

**Remix: _El IDE de Remix permite desarrollar, desplegar y administrar contratos inteligentes para cadenas de bloques similares a Ethereum_**

- [Remix](https://remix.ethereum.org)

**Tenderly: _Plataforma de desarrollo Web3 que proporciona depuración, observabilidad y bloques de construcción de infraestructura para desarrollar, probar, monitorear y operar contratos inteligentes_**

- [tenderly.co](https://tenderly.co/)
- [Documentación](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat: _Un entorno de desarrollo para compilar, desplegar, probar y depurar su software de Ethereum_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Documentación sobre el despliegue de sus contratos](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb: _Despliegue fácilmente cualquier contrato en cualquier cadena compatible con la EVM, utilizando un solo comando_**

- [Documentación](https://portal.thirdweb.com/deploy/)

**Crossmint: _Plataforma de desarrollo Web3 de nivel empresarial para desplegar contratos inteligentes, habilitar pagos con tarjeta de crédito y entre cadenas, y usar las API para crear, distribuir, vender, almacenar y editar NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Documentación](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Tutoriales relacionados {#related-tutorials}

- [Despliegue de su primer contrato inteligente](/developers/tutorials/deploying-your-first-smart-contract/) _– Una introducción al despliegue de su primer contrato inteligente en una red de prueba de Ethereum._
- [Hola Mundo | tutorial de contratos inteligentes](/developers/tutorials/hello-world-smart-contract/) _– Un tutorial fácil de seguir para crear y desplegar un contrato inteligente básico en Ethereum._
- [Interactuar con otros contratos desde Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Cómo desplegar un contrato inteligente desde un contrato existente e interactuar con él._
- [Cómo reducir el tamaño de su contrato](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Cómo reducir el tamaño de su contrato para mantenerlo por debajo del límite y ahorrar en gas_

## Lecturas adicionales {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Despliegue de sus contratos con Hardhat](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_¿Conoce algún recurso de la comunidad que le haya ayudado? ¡Edite esta página y agréguelo!_

## Temas relacionados {#related-topics}

- [Marcos de desarrollo](/developers/docs/frameworks/)
- [Ejecutar un nodo de Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Nodos como servicio](/developers/docs/nodes-and-clients/nodes-as-a-service)