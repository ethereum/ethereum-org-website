---
title: Redes
description: Una descripción general de las redes de Ethereum, así como de dónde obtener ether (ETH) en la red de prueba y cómo probar tu aplicación.
lang: es
sidebar: true
---

Como Ethereum es un protocolo, puede haber múltiples "redes" que se atengan a este protocolo pero no interactúen entre sí.

Las redes son diferentes entornos de Ethereum a los que se puede acceder para desarrollarlos, probarlos o producir casos de uso. Tu cuenta de Ethereum funcionara a través de diferentes redes, pero el saldo de tu cuenta y el historial de transacciones no se realizarán mediante la red principal de Ethereum. Para las actividades de prueba, es útil conocer qué redes están habilitadas y cómo obtener ETH de la red de prueba para que puedas jugar con ellos.

## Requisitos previos {#prerequisites}

Te recomendamos que comprendas los conceptos básicos de Ethereum antes de explorar las diferentes redes, ya que las redes de prueba te darán una versión económica y segura de Ethereum con la que comenzar a probar. Comienza con nuestra [introducción a Ethereum](/developers/docs/intro-to-ethereum/).

## Redes públicas {#public-networks}

Las redes públicas son accesibles para cualquier persona del mundo que disponga de una conexión al Internet. Cualquiera puede leer o crear transacciones en una blockchain pública y validar las transacciones que se están ejecutando. El acuerdo en las transacciones y el estado de la red se decide mediante el consenso de los pares.

### Red principal {#mainnet}

La red principal es la blockchain de producción de Ethereum pública primaria, en la que las transacciones de valor real se realizan en el libro de contabilidad distribuido.

Cuando las personas y los entes de intercambio discuten los precios de los ETH, están hablando de la funcionalidad de transferir monedas digitales de remitentes a destinatarios en una red principal.

### Redes de prueba {#testnets}

Además de la red principal, existen las redes de prueba públicas. Estas redes las utilizan los desarrolladores de protocolos o los desarrolladores de contratos inteligentes para probar las actualizaciones de los protocolos y los posibles contratos inteligentes en un entorno similar a los entornos de producción antes de implementarlos en la red principal. Como ejemplo, podíamos pensar en los servidores de producción frente a los de almacenamiento.

En la mayoría de los casos es importante comprobar cualquier código de contrato que escribes en una red de pruebas antes de implementarlo en la red principal. Si estás construyendo una app descentralizada que se integra con los contratos inteligentes existentes, la mayoría de los proyectos tiene copias implementadas en redes de prueba con las que puedes interactuar.

La mayoría de las redes de prueba utilizan un mecanismo de consenso de prueba de autoridad. Es decir, se escoge un pequeño número de nodos para validar las transacciones y crear nuevos bloques apostando sus identidades en el proceso. Es difícil incentivar el minado en una red de pruebas con una Prueba de trabajo, ya que podría conllevar vulnerabilidades.

#### Görli {#goerli}

Una red de prueba con Prueba de autoridad que funciona entre los clientes.

#### Kovan {#kovan}

Una red de prueba con Prueba de autoridad para los que ejecutan clientes de OpenEthereum.

#### Rinkeby {#rinkeby}

Una red de prueba con Prueba de autoridad para los que ejecutan clientes de Geth.

#### Ropsten {#ropsten}

Una red de prueba con Prueba de trabajo. Esto significa que es la mejor representación de igual a igual de Ethereum.

### Faucets de redes de prueba {#testnet-faucets}

Los ETH no tienen un valor real en las redes de prueba; por lo tanto, no hay mercado para los ETH de redes de prueba. Como necesitas ETH para interactuar con Ethereum, la mayor parte de la gente adquiere ETH de redes de prueba en webs de tipo faucet. La mayoría de las faucets son aplicaciones web en las que puedes introducir una dirección a la que pides que te envíen ETH.

- [Faucet Görli](https://faucet.goerli.mudit.blog/)
- [Faucet Kovan](https://faucet.kovan.network/)
- [Faucet Rinkeby](https://faucet.rinkeby.io/)
- [Faucet Ropsten](https://faucet.ropsten.be/)

## Redes privadas {#private-networks}

Una red de Ethereum es una red privada si sus nodos no están conectados a una red pública (es decir, una red principal o una red de pruebas). En este contexto, el término privado solo significa reservado o aislado, más que protegido o seguro.

### Red de desarrollo {#development-networks}

Para desarrollar una aplicación Ethereum, querrás ejecutarla en una red privada para ver cómo funciona antes de implementarla. De igual modo en que creas un servidor local en tu computadora para el desarrollo web, puedes crear una instancia en una blockchain local para probar tu app descentralizada. Esto permite realizar una iteración mucho más rápida que en una red de pruebas pública.

Hay proyectos y herramientas exclusivos para ayudarte con esto. Más información sobre [redes de desarrollo](/developers/docs/development-networks/).

### Redes de consorcio {#consortium-networks}

El proceso de consenso se controla mediante un conjunto predefinido de nodos de confianza. Por ejemplo, una red privada de conocidas instituciones académicas en las que cada una gobierna un único nodo y los bloques se validan mediante un umbral de signatarios en la red.

Si una red pública de Ethereum es como la red pública de Internet, puedes entender una red de consorcio como una intranet privada.

## Leer más {#further-reading}

_¿Conoces algún recurso en la comunidad que te haya servido de ayuda? Edita esta página y añádelo._
