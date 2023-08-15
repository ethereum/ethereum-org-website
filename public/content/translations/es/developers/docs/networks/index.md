---
title: Redes
description: Una descripción general de las redes de Ethereum, así como de dónde obtener ether (ETH) en la red de prueba y cómo probar tu aplicación.
lang: es
---

Como Ethereum es un protocolo, puede haber múltiples "redes" que se atengan a este protocolo pero no interactúen entre sí.

Las redes son diferentes entornos de Ethereum a los que se puede acceder para desarrollarlos, probarlos o producir casos de uso. Tu cuenta de Ethereum funcionara a través de diferentes redes, pero el saldo de tu cuenta y el historial de transacciones no se realizarán mediante la red principal de Ethereum. Para las actividades de prueba, es útil conocer qué redes están habilitadas y cómo obtener ETH de la red de prueba para que puedas jugar con ellos.

## Requisitos previos {#prerequisites}

Te recomendamos que comprendas los conceptos básicos de Ethereum antes de explorar las diferentes redes, ya que las redes de prueba te darán una versión económica y segura de Ethereum con la que comenzar a probar. Pruebe nuestra [introducción a Ethereum](/developers/docs/intro-to-ethereum/).

## Redes públicas {#public-networks}

Las redes públicas son accesibles para cualquier persona del mundo que disponga de una conexión al Internet. Cualquiera puede leer o crear transacciones en una blockchain pública y validar las transacciones que se están ejecutando. El acuerdo en las transacciones y el estado de la red se decide mediante el consenso de los pares.

### Red principal {#mainnet}

La red principal es la blockchain de producción de Ethereum pública primaria, en la que las transacciones de valor real se realizan en el libro de contabilidad distribuido.

Cuando las personas y los entes de intercambio discuten los precios de los ETH, están hablando de la funcionalidad de transferir monedas digitales de remitentes a destinatarios en una red principal.

### Redes de prueba {#testnets}

Además de la red principal, existen las redes de prueba públicas. Estas redes las utilizan los desarrolladores de protocolos o los desarrolladores de contratos inteligentes para probar las actualizaciones de los protocolos y los posibles contratos inteligentes en un entorno similar a los entornos de producción antes de implementarlos en la red principal. Como ejemplo, podíamos pensar en los servidores de producción frente a los de almacenamiento.

En la mayoría de los casos es importante comprobar cualquier código de contrato que escribes en una red de pruebas antes de implementarlo en la red principal. Si estás construyendo una app descentralizada que se integra con los contratos inteligentes existentes, la mayoría de los proyectos tiene copias implementadas en redes de prueba con las que puedes interactuar.

La mayoría de las redes de prueba utilizan un mecanismo de consenso de prueba de autoridad. Es decir, se escoge un pequeño número de nodos para validar las transacciones y crear nuevos bloques apostando sus identidades en el proceso. Es difícil incentivar el minado en una red de pruebas con una Prueba de trabajo, ya que podría conllevar vulnerabilidades.

Los ETH no tienen un valor real en las redes de prueba; por lo tanto, no existe ningún mercado para los ETH de redes de prueba. Dado que necesita ETH para interactuar con Ethereum, la mayor parte de las personas adquieren ETH de redes de prueba en webs de tipo faucet. La mayoría de las faucets son aplicaciones web en las que puede introducir una dirección a la que pide que le envíen ETH.

#### Arbitrum Rinkeby {#arbitrum-rinkeby}

Una red de pruebas para [Arbitrum](https://arbitrum.io/).

##### Faucets Arbitrum Rinkeby

- [FaucETH](https://fauceth.komputing.org)(Faucet multicadena sin la necesidad de una cuenta social)
- [Faucet Chainlink](https://faucets.chain.link/)
- [Faucet Paradigm](https://faucet.paradigm.xyz/)

#### Görli {#goerli}

Una red de prueba con prueba de autoridad que funciona entre los clientes.

##### Faucet Görli

- [Faucet Görli](https://faucet.goerli.mudit.blog/)
- [Faucet Chainlink](https://faucets.chain.link/)
- [Alchemy Goerli Faucet](https://goerlifaucet.com/)

#### Kintsugi {#kintsugi}

Una red de pruebas de fusión para Ethereum.

##### Faucets Kintsugi

- [FaucETH](https://fauceth.komputing.org)(Faucet multicadena sin la necesidad de una cuenta social)
- [Faucet Kintsugi](https://faucet.kintsugi.themerge.dev/)

#### Kovan {#kovan}

Una red de prueba con prueba de autoridad para aquellos clientes que emplean OpenEthereum.

##### Faucets Kovan

- [FaucETH](https://fauceth.komputing.org)(Faucet multicadena sin la necesidad de una cuenta social)
- [Faucet Kovan](https://faucet.kovan.network/)
- [Faucet Chainlink](https://faucets.chain.link/)
- [Faucet Paradigm](https://faucet.paradigm.xyz/)

#### Optimistic Kovan {#optimistic-kovan}

Una red de pruebas para [Optimism](https://www.optimism.io/).

##### Faucets Optimistic Kovan

- [FaucETH](https://fauceth.komputing.org)(Faucet multicadena sin la necesidad de una cuenta social)
- [Faucet Paradigm](https://faucet.paradigm.xyz/)

#### Rinkeby {#rinkeby}

Una red de prueba con prueba de autoridad para los que ejecutan clientes de Geth.

##### Faucets Rinkeby

- [FaucETH](https://fauceth.komputing.org)(Faucet multicadena sin la necesidad de una cuenta social)
- [Faucet Alchemy](https://RinkebyFaucet.com)
- [Faucet Chainlink](https://faucets.chain.link/)
- [Faucet Paradigm](https://faucet.paradigm.xyz/)
- [Faucet Rinkeby](https://faucet.rinkeby.io/)

#### Ropsten {#ropsten}

Una red de prueba con prueba de trabajo. Esto significa que es la mejor representación comparable de Ethereum.

##### Faucets Ropsten

- [FaucETH](https://fauceth.komputing.org)(Faucet multicadena sin la necesidad de una cuenta social)
- [Faucet Paradigm](https://faucet.paradigm.xyz/)

## Redes privadas {#private-networks}

Una red de Ethereum es una red privada si sus nodos no están conectados a una red pública (es decir, una red principal o una red de pruebas). En este contexto, el término privado solo significa reservado o aislado, en lugar de protegido o seguro.

### Redes de desarrollo {#development-networks}

Para desarrollar una aplicación Ethereum, se recomienda ejecutarla en una red privada para ver cómo funciona antes de implementarla. De igual modo que crea un servidor local en su ordenador para el desarrollo web, puede crear una instancia en una cadena de bloques local para probar su dapp descentralizada. Esto permite realizar una iteración mucho más rápida que en una red de prueba pública.

Existen proyectos y herramientas exclusivos para ayudarle con esto. Más información sobre [redes de desarrollo](/developers/docs/development-networks/).

### Redes de consorcio {#consortium-networks}

El proceso de consenso se controla mediante un conjunto predefinido de nodos de confianza. Por ejemplo, una red privada de instituciones académicas conocidas en las que cada una gestiona un único nodo y los bloques se validan mediante un umbral de signatarios en la red.

Si una red pública de Ethereum es como la red pública de Internet, puede entender una red de consorcio como una intranet privada.

## Herramientas relacionadas {#related-tools}

- [Lista de cadena](https://chainlist.org/) _lista de redes EVM para conectar carteras y proveedores a los ID de la cadena y la red apropiados_
- [Cadenas basadas en EVM](https://github.com/ethereum-lists/chains) _Repositorio de GitHub con metadatos de cadena que alimenta la lista de cadena_

## Más información {#further-reading}

_¿Conoce algún recurso en la comunidad que le haya servido de ayuda? Edite esta página y añádalo._
