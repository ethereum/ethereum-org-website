---
title: Implementación de contratos inteligentes
description:
lang: es
---

Necesitas implementar tu contrato inteligente para que esté disponible para los usuarios de una red de Ethereum.

Para implementar un contrato inteligente, envías una transacción de Ethereum que contenga el código del contrato inteligente recopilado sin especificar ningún destinatario.

## Requisitos previos {#prerequisites}

Deberías entender las [redes Ethereum](/developers/docs/networks/), [las transacciones](/developers/docs/transactions/) y la [anatomía de los contratos inteligentes](/developers/docs/smart-contracts/anatomy/) antes de implementar contratos inteligentes.

Implementar un contrato también cuesta Ether (ETH), ya que se almacenan en la cadena de bloques, así que le recomendamos familiarizarse con el [gas y las comisiones](/developers/docs/gas/) en Ethereum.

Finalmente, necesitará compilar su contrato antes de implementarlo, así que asegúrese de leer acerca de la [compilación de contratos inteligentes](/developers/docs/smart-contracts/compiling/).

## ¿Cómo implementar un contrato inteligente? {#how-to-deploy-a-smart-contract}

### Lo que necesitarás {#what-youll-need}

- El bytecode de su contrato: se genera mediante la [compilación](/devElopers/docs/smart-contracts/compiling/).
- Ether para gas: Tú pondrás tu límite de gas como cualquier otra transacción; por eso, debes tener en cuenta que la implementación de un contrato inteligente de Ethereum necesitará mucho más gas que una transferencia simple de ETH.
- un script o complemento de implementación
- acceso a un [nodo de Ethereum](/developers/docs/nodes-and-clients/), ya sea ejecutando el suyo propio, conectándose a un nodo público o mediante una clave de API usando un [servicio de nodo](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Pasos para implementar un contrato inteligente {#steps-to-deploy}

Los pasos específicos involucrados dependerán del marco de desarrollo en cuestión. Por ejemplo, puede consultar la documentación de Hardhat[ sobre la implementación de sus contratos](https://hardhat.org/guides/deploying.html) o la documentación de [Foundry sobre la implementación y verificación de un contrato inteligente](https://book.getfoundry.sh/forge/deploying). Una vez implementado, su contrato tendrá una dirección de Ethereum como otras [cuentas](/developers/docs/accounts/) y se puede verificar utilizando [herramientas de verificación de código fuente](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Herramientas relacionadas {#related-tools}

**Remix: _Remix IDE permite desarrollar, implementar y administrar contratos inteligentes para Ethereum como cadenas de bloques_.**

- [Remix](https://remix.ethereum.org)

**Tenderly: _plataforma de desarrollo web3 que proporciona bloques de desarrollo de depuración, observabilidad y infraestructura para desarrollar, probar, monitorear y operar contratos inteligentes_.**

- [tenderly.co](https://tenderly.co/)
- [Documentación](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat: _entorno de desarrollo para compilar, implementar, probar y depurar su software de Ethereum_.**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Documentos sobre cómo implementar sus contratos](https://hardhat.org/guides/deploying.html)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb:_ implemente fácilmente cualquier contrato en cualquier cadena compatible con EVM, usando un solo comando_.**

- [Documentación](https://portal.thirdweb.com/deploy/)

## Tutoriales relacionados {#related-tutorials}

- [Implementar su primer contrato inteligente:](/developers/tutorials/deploying-your-first-smart-contract/)_ introducción para implementar su primer contrato inteligente en la red de prueba de Ethereum_
- [Hola Mundo | tutorial de contratos inteligentes:](/developers/tutorials/hello-world-smart-contract/)_ tutorial fácil de seguir para crear e implementar un contrato inteligente básico en Ethereum_
- [Interactuar con otros contratos de Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/)_: Cómo implementar un contrato inteligente de un contrato existente e interactuar con él._
- [Reducir el tamaño de su contracto:](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/)_ cómo reducir el tamaño de su contrato para tenerlo debajo del límite y ahorrar gas_

## Leer más {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Implemente sus contratos con Hardhat:](https://hardhat.org/guides/deploying.html) _Nomic Labs_

_¿Conoce algún recurso de la comunidad que le haya servido de ayuda? Edite esta página y añádalo._

## Temas relacionados {#related-topics}

- [Entornos de desarrollo](/developers/docs/frameworks/)
- [Cómo ejecutar un nodo de Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Nodos como servicio](/developers/docs/nodes-and-clients/nodes-as-a-service)
