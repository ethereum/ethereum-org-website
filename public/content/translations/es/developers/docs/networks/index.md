---
title: Redes
description: "Una descripción general de las redes de Ethereum y dónde obtener ether (ETH) de red de prueba para probar tu aplicación."
lang: es
---

Las redes de [Ethereum](/) son grupos de computadoras conectadas que se comunican utilizando el protocolo de Ethereum. Solo hay una red principal de Ethereum, pero se pueden crear redes independientes que cumplan con las mismas reglas del protocolo para fines de prueba y desarrollo. Hay muchas "redes" independientes que cumplen con el protocolo sin interactuar entre sí. Incluso puedes iniciar una localmente en tu propia computadora para probar tus contratos inteligentes y aplicaciones Web3.

Tu cuenta de Ethereum funcionará en las diferentes redes, pero el saldo de tu cuenta y el historial de transacciones no se transferirán desde la red principal de Ethereum. Para fines de prueba, es útil saber qué redes están disponibles y cómo obtener ETH de red de prueba para experimentar. En general, por consideraciones de seguridad, no se recomienda reutilizar cuentas de la Red principal en redes de prueba o viceversa.

## Requisitos previos {#prerequisites}

Deberías comprender los [conceptos básicos de Ethereum](/developers/docs/intro-to-ethereum/) antes de leer sobre las diferentes redes, ya que las redes de prueba te brindarán una versión económica y segura de Ethereum para experimentar.

## Redes públicas {#public-networks}

Las redes públicas son accesibles para cualquier persona en el mundo con una conexión a Internet. Cualquiera puede leer o crear transacciones en una cadena de bloques pública y validar las transacciones que se están ejecutando. El consenso entre pares decide sobre la inclusión de transacciones y el estado de la red.

### Red principal de Ethereum {#ethereum-mainnet}

La Red principal es la cadena de bloques de producción pública principal de Ethereum, donde ocurren transacciones de valor real en el libro mayor distribuido.

Cuando las personas y los intercambios discuten los precios de ETH, están hablando de ETH de la Red principal.

### Redes de prueba de Ethereum {#ethereum-testnets}

Además de la Red principal, existen redes de prueba públicas. Estas son redes utilizadas por desarrolladores de protocolos o desarrolladores de contratos inteligentes para probar tanto las actualizaciones del protocolo como los posibles contratos inteligentes en un entorno similar al de producción antes de su despliegue en la Red principal. Piensa en esto como un análogo a los servidores de producción frente a los de preproducción (staging).

Debes probar cualquier código de contrato que escribas en una red de prueba antes de desplegarlo en la Red principal. Entre las aplicaciones descentralizadas (dapp) que se integran con contratos inteligentes existentes, la mayoría de los proyectos tienen copias desplegadas en redes de prueba.

La mayoría de las redes de prueba comenzaron utilizando un mecanismo de consenso de prueba de autoridad (PoA) con permisos. Esto significa que se elige un pequeño número de nodos para validar transacciones y crear nuevos bloques, haciendo staking de su identidad en el proceso. Alternativamente, algunas redes de prueba cuentan con un mecanismo de consenso de prueba de participación (PoS) abierto donde todos pueden probar ejecutar un validador, al igual que en la red principal de Ethereum.

Se supone que el ETH en las redes de prueba no tiene valor real; sin embargo, se han creado mercados para ciertos tipos de ETH de red de prueba que se han vuelto escasos o difíciles de obtener. Dado que necesitas ETH para interactuar realmente con Ethereum (incluso en redes de prueba), la mayoría de las personas obtienen ETH de red de prueba de forma gratuita a través de faucets. La mayoría de los faucets son aplicaciones web donde puedes ingresar una dirección a la que solicitas que se envíe ETH.

#### ¿Qué red de prueba debería usar? {#which-testnet-should-i-use}

Las dos redes de prueba públicas que los desarrolladores de clientes mantienen actualmente son Sepolia y Hoodi. Sepolia es una red para que los desarrolladores de contratos y aplicaciones prueben sus aplicaciones. La red Hoodi permite a los desarrolladores de protocolos probar actualizaciones de la red y permite a los stakers probar la ejecución de validadores.

#### Sepolia {#sepolia}

**Sepolia es la red de prueba predeterminada recomendada para el desarrollo de aplicaciones**. La red Sepolia utiliza un conjunto de validadores con permisos controlado por equipos de clientes y pruebas.

##### Recursos

- [Sitio web](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Faucets

- [Faucet de Sepolia de Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Faucet de Sepolia de Chain Platform](https://faucet.chainplatform.co/faucets/ethereum-sepolia/)
- [Faucet de Sepolia de Chainstack](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [Faucet del ecosistema de Ethereum](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [Faucet de Sepolia de ethfaucet.com](https://ethfaucet.com/networks/ethereum)
- [Faucet de Sepolia de Google Cloud Web3](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Faucet de Sepolia de Infura](https://www.infura.io/faucet)
- [Faucet PoW](https://sepolia-faucet.pk910.de/)
- [Faucet de Sepolia de QuickNode](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi es una red de prueba para probar la validación y el staking. La red Hoodi está abierta para los usuarios que deseen ejecutar un validador de red de prueba. Por lo tanto, los stakers que deseen probar las actualizaciones del protocolo antes de que se desplieguen en la Red principal deben usar Hoodi.

- Conjunto de validadores abierto, los stakers pueden probar actualizaciones de la red
- Estado grande, útil para probar interacciones complejas de contratos inteligentes
- Mayor tiempo de sincronización y requiere más almacenamiento para ejecutar un nodo

##### Recursos

- [Sitio web](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Explorador](https://explorer.hoodi.ethpandaops.io/)
- [Sincronización de punto de control](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### Faucets

- [Faucet de Hoodi de Chain Platform](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Faucet de Hoodi](https://hoodi.ethpandaops.io/)
- [Faucet PoW](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery es un tipo único de red de prueba que se reinicia por completo cada mes. El estado de ejecución y consenso vuelve al génesis cada 28 días, lo que significa que cualquier cosa que suceda en la red de prueba es efímera. Esto la hace ideal para pruebas a corto plazo, un arranque rápido de nodos y aplicaciones del tipo "hola mundo" que no necesitan permanencia.

- Estado siempre nuevo, pruebas a corto plazo de validadores y aplicaciones
- Incluye solo un conjunto básico de contratos
- Conjunto de validadores abierto y fácil acceso a grandes cantidades de fondos
- Requisitos de nodo más pequeños y sincronización más rápida, &lt;5 GB en promedio

##### Recursos

- [Sitio web](https://ephemery.dev/)
- [GitHub](https://github.com/ephemery-testnet/ephemery-resources)
- [Chat de la comunidad](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [Explorador de Beacon](https://beaconlight.ephemery.dev/)
- [Sincronización de punto de control](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad](https://launchpad.ephemery.dev/)

#### Faucets {#faucets}

- [Faucet de Bordel](https://faucet.bordel.wtf/)
- [Faucet PoW de Pk910](https://ephemery-faucet.pk910.de/)

#### Holesky (obsoleta) {#holesky}

La red de prueba Holesky está obsoleta a partir de septiembre de 2025. Los operadores de staking y los proveedores de infraestructura deben usar Hoodi para las pruebas de validadores en su lugar.

- [Anuncio de cierre de la red de prueba Holesky](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _Blog de la EF, 1 de septiembre de 2025_
- [Actualizaciones de las redes de prueba Holesky y Hoodi](https://blog.ethereum.org/2025/03/18/hoodi-holesky) - _Blog de la EF, 18 de marzo de 2025_

### Redes de prueba de capa 2 {#layer-2-testnets}

[Capa 2 (L2)](/layer-2/) es un término colectivo para describir un conjunto específico de soluciones de escalado de Ethereum. Una capa 2 es una cadena de bloques separada que amplía Ethereum y hereda las garantías de seguridad de Ethereum. Las redes de prueba de capa 2 suelen estar estrechamente acopladas a las redes de prueba públicas de Ethereum.

#### Arbitrum Sepolia {#arbitrum-sepolia}

Una red de prueba para [Arbitrum](https://arbitrum.io/).

##### Recursos

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Faucets

- [Faucet de Arbitrum Sepolia de Alchemy](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Faucet de Arbitrum Sepolia de Chainlink](https://faucets.chain.link/arbitrum-sepolia)
- [Faucet de Arbitrum Sepolia de ethfaucet.com](https://ethfaucet.com/networks/arbitrum)
- [Faucet de Arbitrum Sepolia de QuickNode](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

Una red de prueba para [Optimism](https://www.optimism.io/).

##### Recursos

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### Faucets

- [Faucet de Alchemy](https://www.alchemy.com/faucets/optimism-sepolia)
- [Faucet de Chainlink](https://faucets.chain.link/optimism-sepolia)
- [Faucet de Optimism Sepolia de ethfaucet.com](https://ethfaucet.com/networks/optimism)
- [Faucet de red de prueba](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

Una red de prueba para [Starknet](https://www.starknet.io).

##### Recursos

- [Voyager Sepolia Scan](https://sepolia.voyager.online/)

##### Faucets

- [Faucet de Alchemy](https://www.alchemy.com/faucets/starknet-sepolia)
- [Faucet de Starknet Sepolia de Blast](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Faucet de Starknet](https://starknet-faucet.vercel.app/)

## Redes privadas {#private-networks}

Una red de Ethereum es una red privada si sus nodos no están conectados a una red pública (es decir, la Red principal o una red de prueba). En este contexto, privada solo significa reservada o aislada, en lugar de protegida o segura.

### Redes de desarrollo {#development-networks}

Para desarrollar una aplicación de Ethereum, querrás ejecutarla en una red privada para ver cómo funciona antes de desplegarla. De manera similar a cómo creas un servidor local en tu computadora para el desarrollo web, puedes crear una instancia de cadena de bloques local para probar tu aplicación descentralizada (dapp). Esto permite una iteración mucho más rápida que una red de prueba pública.

Existen proyectos y herramientas dedicados a ayudar con esto. Obtén más información sobre las [redes de desarrollo](/developers/docs/development-networks/).

### Redes de consorcio {#consortium-networks}

El proceso de consenso está controlado por un conjunto predefinido de nodos de confianza. Por ejemplo, una red privada de instituciones académicas conocidas que gobiernan cada una un solo nodo, y los bloques son validados por un umbral de firmantes dentro de la red.

Si una red pública de Ethereum es como la Internet pública, una red de consorcio es como una intranet privada.

## <Emoji text="🚉" /> ¿Por qué las redes de prueba de Ethereum llevan nombres de estaciones de metro? {#why-naming}

Muchas redes de prueba de Ethereum llevan el nombre de estaciones de metro o tren del mundo real. Esta tradición de nombres comenzó temprano y refleja las ciudades globales donde los contribuyentes han vivido o trabajado. Es simbólico, memorable y práctico. Al igual que las redes de prueba están aisladas de la red principal de Ethereum, las líneas de metro funcionan separadas del tráfico de la superficie.

### <Emoji text="🚧" /> Redes de prueba de uso común y heredadas {#common-and-legacy-testnets}

- **Sepolia**: un vecindario conectado por metro en Atenas, Grecia. Actualmente se utiliza para pruebas de contratos inteligentes y dapps.
- **Hoodi**: lleva el nombre de la estación de metro Hoodi en Bengaluru, India. Se utiliza para pruebas de validadores y actualizaciones de protocolos.
- **Goerli** _(obsoleta)_: lleva el nombre de Görlitzer Bahnhof en Berlín, Alemania.
- **Rinkeby** _(obsoleta)_: lleva el nombre de un suburbio de Estocolmo con una estación de metro.
- **Ropsten** _(obsoleta)_: se refiere a un área y antigua terminal de ferry/metro en Estocolmo.
- **Kovan** _(obsoleta)_: lleva el nombre de una estación de MRT de Singapur.
- **Morden** _(obsoleta)_: lleva el nombre de una estación del metro de Londres. La primera red de prueba pública de Ethereum.

### <Emoji text="🧪" /> Otras redes de prueba especializadas {#other-testnets}

Algunas redes de prueba se crearon para pruebas a corto plazo o específicas de actualizaciones y no necesariamente tienen una temática de metro:

- **Holesky** _(obsoleta)_: lleva el nombre de la estación Holešovice en Praga. Se utiliza para pruebas de validadores; obsoleta en 2025.
- **Kiln**, **Zhejiang**, **Shandong**, **Prater**, **Pyrmont**, **Olympic** _(todas obsoletas)_ y **Ephemery**: creadas específicamente para simulaciones de actualizaciones como La Fusión, Shanghái o experimentos de validadores. Algunos nombres son regionales o temáticos en lugar de estar basados en el metro.

El uso de nombres de estaciones de metro ayuda a los desarrolladores a identificar y recordar rápidamente las redes de prueba sin necesidad de depender de ID de cadena numéricos. También refleja la cultura de Ethereum: práctica, global y centrada en el ser humano.

## Herramientas relacionadas {#related-tools}

- [Chainlist](https://chainlist.org/): _lista de redes EVM para conectar billeteras y proveedores al ID de cadena y al ID de red adecuados_
- [Cadenas basadas en EVM](https://github.com/ethereum-lists/chains): _repositorio de GitHub de metadatos de cadenas que impulsa Chainlist_

## Lecturas adicionales {#further-reading}

- [Propuesta: Ciclo de vida predecible de la red de prueba de Ethereum](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [La evolución de las redes de prueba de Ethereum](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)