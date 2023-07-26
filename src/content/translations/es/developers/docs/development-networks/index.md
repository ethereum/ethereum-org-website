---
title: Redes de desarrollo
description: Una descripción general de las redes de desarrollo y las herramientas disponibles para ayudar a construir aplicaciones de Ethereum.
lang: es
---

Cuando construyes una aplicación de Ethereum con contratos inteligentes, desearás ejecutar en una red local para ver cómo funciona antes de implementarla.

De forma similar a la ejecución de un servidor local en tu ordenador para realizar desarrollo web, puedes utilizar una red de desarrollo para crear una instancia local de blockchain para probar tu dapp. Estas redes de desarrollo de Ethereum proporcionan características que permiten una iteración mucho más rápida que una red de pruebas pública (p. ej., no es necesario tratar de adquirir ETH desde el regulador de una red de pruebas).

## Requisitos previos {#prerequisites}

Sería interesante que comprendieras los [conceptos básicos del bloque de Ethereum](/developers/docs/ethereum-stack/) y [las redes de Ethereum](/developers/docs/networks/) antes de sumergirte en la información sobre las redes de desarrollo.

## ¿Qué es una red de desarrollo? {#what-is-a-development-network}

Las redes de desarrollo son esencialmente clientes de Ethereum (implementaciones de Ethereum), que se han diseñado específicamente para el desarrollo local.

**¿Por qué no basta con ejecutar localmente un nodo estándar de Ethereum?**

_Podrías_ [ejecutar un nodo](/developers/docs/nodes-and-clients/#running-your-own-node) (como Geth, OpenEthereum o Nethermind); sin embargo, ya que las redes de desarrollo están construidas específicamente para el desarrollo, estas suelen estar repletas de las siguientes características:

- Siembran la blockchain local con datos (p. ej., cuentas con saldos en ETH).
- Minan instantáneamente bloques con cada transacción que reciben, en orden y sin retrasos.
- Disponen de funciones mejoradas de solución de errores y depuración

## Herramientas disponibles {#available-projects}

**Nota**: La mayoría de los [frameworks de desarrollo](/developers/docs/frameworks/) incluyen una red de desarrollo integrada. Te recomendamos comenzar con un framework para [configurar tu entorno de desarrollo local](/developers/local-environment/).

### Ganache {#ganache}

Rápidamente inicia una blockchain de Ethereum personal con el que puedes ejecutar pruebas y comandos, así como inspeccionar el estado mientras controlas el funcionamiento de la cadena.

Ganache proporciona una aplicación de escritorio (Ganache UI) y una herramientas de línea de comandos (`ganache-cli`). Forma parte del conjunto de herramientas Truffle.

- [Sitio web](https://www.trufflesuite.com/ganache)
- [GitHub](https://github.com/trufflesuite/ganache)
- [Documentación](https://www.trufflesuite.com/docs/ganache/overview)

### Red de tipo Hardhat {#hardhat-network}

Una red local de Ethereum diseñada para el desarrollo. Te permite implementar tus contratos, ejecutar tus pruebas y depurar tu código.

La red de tipo Hardhat viene integrada con Hardhat, que es un entorno de desarrollo de Ethereum para profesionales.

- [Sitio web.](https://hardhat.org/)
- [GitHub](https://github.com/nomiclabs/hardhat)

## Leer más {#further-reading}

_¿Conoces algún recurso en la comunidad que te haya servido de ayuda? Edita esta página y añádelo._

## Temas relacionados {#related-topics}

- [Frameworks de desarrollo](/developers/docs/frameworks/)
- [Configura tu entorno de desarrollo local.](/developers/local-environment/)
