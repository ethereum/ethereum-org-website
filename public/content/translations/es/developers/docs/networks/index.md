---
title: Redes
description: Una descripción general de las redes de Ethereum, así como de dónde obtener ether (ETH) en la red de prueba y cómo probar tu aplicación.
lang: es
---

Las redes de Ethereum son grupos de ordenadores conectados que se comunican utilizando el protocolo Ethereum. Solo existe una red principal de Ethereum, pero se pueden crear redes independientes que cumplan con las mismas reglas de protocolo con fines de pruebas y desarrollo. Existen múltiples «redes» independientes que siguen el protocolo pero que no interactúan entre ellas. Incluso puede comenzar una en su ordenador para probar sus contratos inteligentes y aplicaciones en Web3.

Su cuenta de Ethereum funcionará a través de las diferentes redes, pero el saldo de su cuenta y el historial de transacciones no se mantendrán desde la red principal de Ethereum. Con fines de realizar pruebas, es útil saber qué redes están disponibles y cómo hacer que la red de prueba ETH la experimente. En general, por razones de seguridad, no se recomienda reutilizar cuentas de la red principal en redes de pruebas o viceversa.

## Requisitos previos {#prerequisites}

Debería entender los [aspectos básicos de Ethereum](/developers/docs/intro-to-ethereum/) antes de leer en las diferentes redes, ya que las redes de prueba le darán una versión barata y segura de Ethereum con la que experimentar.

## Redes públicas {#public-networks}

Las redes públicas son accesibles para cualquier persona del mundo que disponga de una conexión al Internet. Cualquiera puede leer o crear transacciones en una blockchain pública y validar las transacciones que se están ejecutando. El consenso entre pares decide la inclusión de las transacciones y el estado de la red.

### Red principal de Ethereum {#ethereum-mainnet}

La red principal es la blockchain de producción de Ethereum pública primaria, en la que las transacciones de valor real se realizan en el libro de contabilidad distribuido.

Cuando las personas y los entes de intercambio discuten los precios de los ETH, están hablando de la funcionalidad de transferir monedas digitales de remitentes a destinatarios en una red principal.

### Red de pruebas de Ethereum {#ethereum-testnets}

Además de la red principal, existen las redes de prueba públicas. Estas redes las utilizan los desarrolladores de protocolos o los desarrolladores de contratos inteligentes para probar las actualizaciones de los protocolos y los posibles contratos inteligentes en un entorno similar a los entornos de producción antes de implementarlos en la red principal. Como ejemplo, podíamos pensar en los servidores de producción frente a los de almacenamiento.

En la mayoría de los casos es importante comprobar cualquier código de contrato que escriba en una red de pruebas antes de implementarlo en la red principal. Entre DApps que se integran con contratos inteligentes existentes, la mayoría de los proyectos tienen copias desplegadas en redes de pruebas.

La mayoría de las redes de prueba empezaron utilizando un mecanismo de consenso de prueba de autoridad permitido. Es decir, se escoge un pequeño número de nodos para validar las transacciones y crear nuevos bloques apostando sus identidades en el proceso. Alternativamente, algunas redes de pruebas cuentan con un mecanismo de consenso de prueba de participación abierto donde todos pueden hacer una prueba de ejecución de validador, al igual que en la red principal de Ethereum.

El ETH en las redes de prueba se supone que no tiene un valor real; sin embargo, se han creado mercados para ciertos tipos de ETH de red de prueba que se han vuelto escasos o difíciles de obtener. Dado que necesita ETH para interactuar con Ethereum (incluso en redes de prueba), la mayoría de las personas obtienen ETH de red de prueba de forma gratuita a través de «faucets» (o grifos). La mayoría de las faucets son aplicaciones web en las que puede introducir una dirección a la que pide que le envíen ETH.

#### ¿Qué red de prueba debo usar?

Las dos redes públicas de prueba que los desarrolladores de clientes están manteniendo actualmente son Sepolia y Goerli. Sepolia es una red de desarrolladores de contratos y aplicaciones para probar sus aplicaciones. La red Goerli permite a los desarrolladores de protocolos probar actualizaciones de red y permite a los participantes hacer pruebas de ejecución de validadores.

#### Sepolia {#sepolia}

****Sepolia es la red de prueba predeterminada recomendada para el desarrollo de aplicaciones. La red Sepolia utiliza un conjunto de validadores autorizados. Es bastante nueva, lo que significa que su estado e historia son bastante limitados. Esto significa que la red se sincroniza rápidamente y que ejecutar un nodo requiere menos almacenamiento. Esto es útil para los usuarios que quieren activar rápidamente un nodo e interactuar directamente con la red.

- Conjunto de validadores cerrado, controlado por el cliente y equipos de prueba
- Nueva red de prueba, menos aplicaciones implementadas que otras redes de prueba
- Sincronización y ejecución rápidas en un nodo que requieren un espacio mínimo en el disco

##### Recursos

- [Sitio web](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)

##### Faucets

- [QuickNode Sepolia Faucet](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [PoW faucet](https://sepolia-faucet.pk910.de/)
- [Faucet de cartera Coinbase | Sepolia](https://coinbase.com/faucets/ethereum-sepolia-faucet)
- [Alchemy Sepolia faucet](https://sepoliafaucet.com/)
- [Faucet Infura Sepolia](https://www.infura.io/faucet)
- [Faucet Chainstack Sepolia](https://faucet.chainstack.com/sepolia-faucet)
- [Faucet de red de prueba | Sepolia](https://testnet-faucet.com/sepolia/)

#### Goerli _(soporte a largo plazo)_ {#goerli}

_Nota: [la red de pruebas Goerli está obsoleta](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17) y se reemplazará por [Holesovice](https://github.com/eth-clients/holesovice) en 2023. Por favor, considere la migración de sus aplicaciones a Sepolia._

Goerli es una red de prueba para probar la validación y la participación. La red Goerli está abierta a usuarios que quieren ejecutar un validador de red de pruebas. Los participantes que quieran probar las actualizaciones del protocolo antes de que se implementen en la red principal deben usar Goerli.

- Conjunto de validador abierto, los participantes pueden probar las actualizaciones de la red.
- Estado grande, útil para probar interacciones complejas de contratos inteligentes.
- Más tiempo para sincronizar y requiere más almacenamiento para ejecutar un nodo.

##### Recursos

- [Sitio web](https://goerli.net/)
- [GitHub](https://github.com/eth-clients/goerli)
- [Etherscan](https://goerli.etherscan.io)

##### Faucets

- [QuickNode Goerli Faucet](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [PoW faucet](https://goerli-faucet.pk910.de/)
- [Faucet Paradigm](https://faucet.paradigm.xyz/)
- [Faucet Alchemy Goerly](https://goerlifaucet.com/)
- [Faucet All That Node Goerli](https://www.allthatnode.com/faucet/ethereum.dsrv)
- [Coinbase Wallet Faucet | Goerli](https://coinbase.com/faucets/ethereum-goerli-faucet)
- [Faucet Chainstack Goerli](https://faucet.chainstack.com/goerli-faucet)

Para iniciar un validador en la red de prueba de Goerli, utilice la plataforma de lanzamiento de [«cheap goerli validator»](https://goerli.launchpad.ethstaker.cc/en/) de ethstaker.

### Redes de pruebas de Capa 2 {#layer-2-testnets}

[Capa 2 (L2)](/layer-2/) es un término colectivo para describir un conjunto específico de soluciones de escalabilidad de Ethereum. Una capa 2 es una cadena de bloques por separado que amplía Ethereum y hereda las garantías de seguridad de Ethereum. Las redes de prueba de capa 2 suelen estar estrechamente acopladas a redes de pruebas públicas de Ethereum.

#### Arbitrum Goerli {#arbitrum-goerli}

Una red de pruebas para [Arbitrum](https://arbitrum.io/).

##### Faucets

- [Faucet Chainlink](https://faucets.chain.link/)

#### Optimism Goerli {#optimistic-goerli}

Una red de pruebas para [Optimism](https://www.optimism.io/).

##### Faucets

- [Faucet Paradigm](https://faucet.paradigm.xyz/)
- [Faucet Coinbase Wallet | Optimism Goerli](https://coinbase.com/faucets/optimism-goerli-faucet)

#### Goerli Starknet {#starknet-goerli}

Una red de prueba para [Starknet](https://www.starknet.io).

##### Faucets

- [Faucet Starknet](https://faucet.goerli.starknet.io)

## Redes privadas {#private-networks}

Una red de Ethereum es una red privada si sus nodos no están conectados a una red pública (es decir, a una red principal o una red de pruebas). En este contexto, el término privado solo significa reservado o aislado, en lugar de protegido o seguro.

### Redes de desarrollo {#development-networks}

Para desarrollar una aplicación Ethereum, se recomienda ejecutarla en una red privada para ver cómo funciona antes de implementarla. De igual modo que crea un servidor local en su ordenador para el desarrollo web, puede crear una instancia de cadena de bloques local para probar su DApp. Esto permite realizar una repetición mucho más rápida que en una red de prueba pública.

Existen proyectos y herramientas exclusivos para ayudarle con esto. Más información sobre [redes de desarrollo](/developers/docs/development-networks/).

### Redes de consorcio {#consortium-networks}

El proceso de consenso se controla mediante un conjunto predefinido de nodos de confianza. Por ejemplo, una red privada de instituciones académicas conocidas en las que cada una gestiona un único nodo y los bloques se validan mediante un umbral de signatarios en la red.

Si una red pública de Ethereum es como la red pública de internet, puede entender una red de consorcio como una intranet privada.

## Herramientas relacionadas {#related-tools}

- [Chainlist](https://chainlist.org/) _lista de redes EVM para conectar carteras y proveedores a las ID de cadena y red apropiadas_
- [Cadenas basadas en EVM](https://github.com/ethereum-lists/chains) _Repositorio de GitHub con metadatos de cadena que alimentan la Chainlist_

## Más información {#further-reading}

- [Propuesta: ciclo de vida de red de prueba Ethereum predecible](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [La evolución de las redes de Ethereum](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
