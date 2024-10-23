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

_Podría_ [ejecutar un nodo](/developers/docs/nodes-and-clients/#running-your-own-node), pero, dado a que las redes de desarrollo están diseñadas específicamente para el desarrollo, a menudo vienen repletas de funciones convenientes como:

- Sembrar de forma determinista su cadena de bloques local con datos (p. ej., cuentas con saldos en ETH).
- Producir bloques al instante con cada transacción que recibe, en orden y sin demora
- Funcionalidad mejorada para depurar y registrar

## Herramientas disponibles {#available-projects}

**Nota**: La mayoría de los [frameworks de desarrollo](/developers/docs/frameworks/) incluyen una red de desarrollo integrada. Te recomendamos comenzar con un framework para [configurar tu entorno de desarrollo local](/developers/local-environment/).

### Red de tipo Hardhat {#hardhat-network}

Una red local de Ethereum diseñada para el desarrollo. Le permite implementar sus contratos, ejecutar sus pruebas y depurar su código.

La red de tipo Hardhat viene integrada con Hardhat, que es un entorno de desarrollo de Ethereum para profesionales.

- [Sitio web.](https://hardhat.org/)
- [GitHub](https://github.com/nomiclabs/hardhat)

### Cadenas de baliza locales {#local-beacon-chains}

Algunos clientes de consenso tienen herramientas integradas para implementar cadenas de baliza locales con fines de prueba. Las instrucciones para Lighthouse, Nimbus y Lodestar están disponibles:

- [Red de prueba local con Lodestar](https://chainsafe.github.io/lodestar/usage/local/)
- [Red de prueba local con Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)
- [Red de prueba local con Nimbus](https://github.com/status-im/nimbus-eth1/blob/master/fluffy/docs/local_testnet.md)

### Cadenas de prueba públicas de Ethereum {#public-beacon-testchains}

También hay dos implantaciones de prueba públicas mantenidas de Ethereum: Goerli y Sepolia. La red de prueba recomendada con soporte a largo plazo es Goerli, en la que cualquiera es libre de validar. Sepolia es una cadena más nueva y más pequeña que también se espera que se mantenga en el futuro próximo, con un conjunto de validadores autorizados (lo que significa que no hay acceso general a nuevos validadores en esta red de prueba). Se espera que la cadena Ropsten quede obsoleta en el cuarto trimestre de 2022 y que la cadena Rinkeby quede obsoleta en el segundo o tercer trimestre de 2023.

- [Launchpad de staking de Goerli](https://goerli.launchpad.ethereum.org/)
- [Anuncio de baja de Ropsten, Rinkeby y Kiln](https://blog.ethereum.org/2022/06/21/testnet-deprecation)

### Paquete de Ethereum de Kurtosis {#kurtosis}

Kurtosis es un sistema de construcción para entornos de prueba de múltiples contenedores que permite a los desarrolladores levantar localmente instancias reproducibles de redes de cadena de bloques.

El paquete Ethereum Kurtosis se puede utilizar para instanciar rápidamente una red de pruebas de Ethereum parametrizable, altamente escalable y privada sobre Docker o Kubernetes. El paquete es compatible con los principales clientes de la Capa de Ejecución (EL) y la Capa de Consenso (CL). Kurtosis gestiona con elegancia todos los mapeos locales de puertos y conexiones de servicios para una red representativa que se utilizará en flujos de trabajo de validación y pruebas relacionados con la infraestructura básica de Ethereum.

- [Paquete de red Ethereum](https://github.com/kurtosis-tech/ethereum-package)
- [Sitio web](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Documentación](https://docs.kurtosis.com/)

## Leer más {#further-reading}

_¿Conoce algún recurso de la comunidad que le haya servido de ayuda? Edite esta página y añádalo._

## Temas relacionados {#related-topics}

- [Entornos de desarrollo](/developers/docs/frameworks/)
- [Configurar un entorno de desarrollo local](/developers/local-environment/)
