---
title: Implementación de contratos inteligentes
description:
lang: es
incomplete: true
---

Necesitas implementar tu contrato inteligente para que esté disponible para los usuarios de una red de Ethereum.

Para implementar un contrato inteligente, envías una transacción de Ethereum que contenga el código del contrato inteligente recopilado sin especificar ningún destinatario.

## Requisitos previos {#prerequisites}

Deberías entender las [redes Ethereum](/developers/docs/networks/), [las transacciones](/developers/docs/transactions/) y la [anatomía de los contratos inteligentes](/developers/docs/smart-contracts/anatomy/) antes de implementar contratos inteligentes.

Implementar un contrato también cuesta ETH, por lo que deberías estar familiarizado con el [gas y las comisiones](/developers/docs/gas/) en Ethereum.

Finalmente, necesitarás compilar tu contrato antes de implementarlo, así que asegúrate de que has leído acerca de la [compilación de contratos inteligentes](/developers/docs/smart-contracts/compiling/).

## ¿Cómo implementar un contrato inteligente?

Esto significa que tendrás que pagar una cuota de transacción para que asegúrate de tener algo de ETH.

### Lo que necesitarás {#what-youll-need}

- el código de bytes de tu contracto: Esto se genera mediante la [compilación](/developers/docs/smart-contracts/compiling/).
- Ether para gas: Tú pondrás tu límite de gas como cualquier otra transacción; por eso, debes tener en cuenta que la implementación de un contrato inteligente de Ethereum necesitará mucho más gas que una transferencia simple de ETH.
- un script o plugin para implementación.
- acceso a un [nodo de Ethereum](/developers/docs/nodes-and-clients/), o bien manejar uno tuyo, o, conectarte a un nodo público, o a través de una llave API utilizando un servicio como Infura o Alchemy

Una vez desplegado, tu contrato tendrá una dirección de Ethereum como otras [cuentas](/developers/docs/accounts/).

## Herramientas relacionadas {#related-tools}

**Remezcla: ** **_Remezcla IDE permite desarrollar, implementar y administrar contratos inteligentes para blockchains como Ethereum._**

- [Remezcla](https://remix.ethereum.org)

**Tenderly:** **_Una plataforma para supervisar los contratos inteligentes de manera sencilla, con seguimiento de errores, alertas, métricas de rendimiento y análisis detallados de contratos._**

- [tenderly.co](https://tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

## Tutoriales relacionados {#related-tutorials}

- [Desplegando tu primer contrato inteligente](/developers/tutorials/deploying-your-first-smart-contract/)_- Una introducción para desplegar tu primer contrato inteligente de la red de prueba de Ethereum._
- [Interactúa con otro contractos de Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/)_: Cómo implementar un contrato inteligente a partir de un contrato ya existente e interactuar con ello._
- [Cómo reducir el tamaño de tu contracto](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _: Cómo reducir el tamaño de tu contracto para tenerlo debajo del límite y ahorrar gas_

## Leer más {#further-reading}

_¿Conoces algún recurso en la comunidad que te haya servido de ayuda? Edita esta página y añádelo._

## Temas relacionados

- [Frameworks de desarrollo](/developers/docs/frameworks/)
