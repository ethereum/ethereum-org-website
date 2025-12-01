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

Las dos redes públicas de prueba que los desarrolladores de clientes están manteniendo actualmente son Sepolia y Hoodi. Sepolia es una red de desarrolladores de contratos y aplicaciones para probar sus aplicaciones. La red Hoodi permite a los desarrolladores de protocolos probar actualizaciones de red y permite a los participantes probar validadores en ejecución.

#### Sepolia {#sepolia}

****Sepolia es la red de prueba predeterminada recomendada para el desarrollo de aplicaciones. La red Sepolia usa un conjunto de validadores que requiere permisos controlado por equipos de clientes y de pruebas.

##### Recursos

- [Sitio web](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Faucets

- [Grifo de Sepolia de QuickNode](https://faucet.quicknode.com/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Grifo de prueba de trabajo](https://sepolia-faucet.pk910.de/)
- [Grifo Sepolia de Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Grifo Sepolia de Infura](https://www.infura.io/faucet)
- [Grifo Chainstack de Sepolia](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [Grifo del ecosistema de Ethereum](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [Grifo de Sepolia de Google Cloud Web3](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi es una red de prueba para probar la validación y la participación. La red Hoodi está abierta para usuarios que quieren ejecutar un validador en una red de pruebas. Los participantes que quieran probar actualizaciones del protocolo antes de que sean desplegadas en la red principal, por tanto, deberían usar Hoodi.

- Conjunto de validador abierto, los participantes pueden probar las actualizaciones de la red
- Estado grande, útil para probar interacciones complejas de contratos inteligentes
- Tarda más en sincronizarse y requiere más almacenamiento para ejecutar un nodo

##### Recursos

- [Sitio web](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Explorador](https://explorer.hoodi.ethpandaops.io/)
- [Sincronización de punto de control](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)
- [Blockscout](https://hoodi.cloud.blockscout.com/)

##### Faucets

- [Grifo de Hoodi](https://hoodi.ethpandaops.io/)
- [Grifo de prueba de trabajo](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery es un tipo único de red de prueba que se reinicia por completo cada mes. El estado de ejecución y consenso vuelve a la génesis cada 28 días, lo que significa que cualquier cosa que suceda en la red de prueba es efímera. Esto lo convierte en idóneo para una prueba a corto plazo, arranque rápido de nodos y aplicaciones de «hola mundo» que no necesitan permanencia.

- Estado siempre nuevo, pruebas a corto plazo de validadores y aplicaciones
- Incluye solo un conjunto básico de contratos
- Conjunto de validador abierto y de fácil acceso a grandes cantidades de fondos
- Los requisitos de nodo más pequeños y la sincronización más rápida, &lt;5Gb de media

##### Recursos

- [Sitio web](https://ephemery.dev/)
- [Github](https://github.com/ephemery-testnet/ephemery-resources)
- [Chat de la comunidad](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [Explorador de baliza](https://beaconlight.ephemery.dev/)
- [Sincronización de punto de control](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Lanzador](https://launchpad.ephemery.dev/)

#### Faucets

- [Grifo de Bordel](https://faucet.bordel.wtf/)
- [Grifo Pk910 Pow](https://ephemery-faucet.pk910.de/)

#### Holesky {#holesky}

La red de pruebas Holesky se [descontinuará a partir de septiembre de 2025](https://blog.ethereum.org/en/2025/03/18/hoodi-holesky). Los operadores de participación y los proveedores de infraestructura deberían usar Hoodi en su lugar para pruebas del validador.

##### Recursos

- [Sitio web](https://holesky.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/holesky)
- [Otterscan](https://holesky.otterscan.io/)
- [Etherscan](https://holesky.etherscan.io/)
- [Blockscout](https://eth-holesky.blockscout.com/)

##### Faucets

- [Grifo de Holesky de QuickNode](https://faucet.quicknode.com/ethereum/holesky)
- [Grifo de prueba de trabajo](https://holesky-faucet.pk910.de/)
- [Grifo de Holesky de Alchemy](https://www.alchemy.com/faucets/ethereum-holesky)
- [Grifo de Holesky de Chainstack](https://faucet.chainstack.com/holesky-testnet-faucet)
- [Grifo del ecosistema de Ethereum](https://www.ethereum-ecosystem.com/faucets/ethereum-holesky)
- [Grifo de Holesky de Google Cloud Web3](https://cloud.google.com/application/web3/faucet/ethereum/holesky)

Para lanzar un validador de la red de prueba de Hoodi, use [el lanzador de Hoodi](https://hoodi.launchpad.ethereum.org/en/).

### Redes de pruebas de Capa 2 {#layer-2-testnets}

[Capa 2 (L2)](/layer-2/) es un término colectivo para describir un conjunto específico de soluciones de escalabilidad de Ethereum. Una capa 2 es una cadena de bloques por separado que amplía Ethereum y hereda las garantías de seguridad de Ethereum. Las redes de prueba de capa 2 suelen estar estrechamente acopladas a redes de pruebas públicas de Ethereum.

#### Arbitrum Sepolia {#arbitrum-sepolia}

Una red de pruebas para [Arbitrum](https://arbitrum.io/).

##### Recursos

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Faucets

- [Grifo Chainlink](https://faucets.chain.link/arbitrum-sepolia)
- [Grifo Alchemy](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Grifo de Arbitrum Sepolia de QuickNode](https://faucet.quicknode.com/arbitrum/sepolia)
- [Grifo de Arbitrum Sepolia de Alchemy](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Grifo de Arbitrum Sepolia de Chainlink](https://faucets.chain.link/arbitrum-sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

Una red de pruebas para [Optimism](https://www.optimism.io/).

##### Recursos

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### Faucets

- [Grifo Chainlink](https://faucets.chain.link/optimism-sepolia)
- [Grifo Alchemy](https://www.alchemy.com/faucets/optimism-sepolia)
- [Grifos de red de prueba](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

Una red de prueba para [Starknet](https://www.starknet.io).

##### Recursos

- [Starkscan](https://sepolia.starkscan.co/)

##### Faucets

- [Grifo Alchemy](https://www.alchemy.com/faucets/starknet-sepolia)
- [Grifo de Starknet](https://starknet-faucet.vercel.app/)
- [Grifo de Starknet Sepolia de Blast](https://blastapi.io/faucets/starknet-sepolia-eth)

## Redes privadas {#private-networks}

Una red de Ethereum es una red privada si sus nodos no están conectados a una red pública (es decir, a una red principal o una red de pruebas). En este contexto, el término privado solo significa reservado o aislado, en lugar de protegido o seguro.

### Redes de desarrollo {#development-networks}

Para desarrollar una aplicación Ethereum, se recomienda ejecutarla en una red privada para ver cómo funciona antes de implementarla. De igual modo que crea un servidor local en su ordenador para el desarrollo web, puede crear una instancia de cadena de bloques local para probar su DApp. Esto permite realizar una repetición mucho más rápida que en una red de prueba pública.

Existen proyectos y herramientas exclusivos para ayudarle con esto. Más información sobre [redes de desarrollo](/developers/docs/development-networks/).

### Redes de consorcio {#consortium-networks}

El proceso de consenso se controla mediante un conjunto predefinido de nodos de confianza. Por ejemplo, una red privada de instituciones académicas conocidas en las que cada una gestiona un único nodo y los bloques se validan mediante un umbral de signatarios en la red.

Si una red pública de Ethereum es como la red pública de internet, puede entender una red de consorcio como una intranet privada.

## Herramientas relacionadas {#related-tools}

- [Lista de cadena](https://chainlist.org/) _lista de redes EVM para conectar carteras y proveedores a las ID de cadena y red apropiados_
- [Cadenas basadas en EVM](https://github.com/ethereum-lists/chains) _Repositorio de GitHub con metadatos de cadena que alimenta la lista de cadena_

## Más información {#further-reading}

- [Propuesta: ciclo de vida de red de prueba Ethereum predecible](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [La evolución de las redes de Ethereum](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
