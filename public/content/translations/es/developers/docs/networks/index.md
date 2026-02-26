---
title: Redes
description: "Una descripción general de las redes de Ethereum, así como de dónde obtener ether (ETH) en la red de prueba y cómo probar tu aplicación."
lang: es
---

Las redes de Ethereum son grupos de ordenadores conectados que se comunican utilizando el protocolo Ethereum. Solo existe una red principal de Ethereum, pero se pueden crear redes independientes que cumplan con las mismas reglas de protocolo con fines de pruebas y desarrollo. Existen múltiples «redes» independientes que siguen el protocolo pero que no interactúan entre ellas. Incluso puede comenzar una en su ordenador para probar sus contratos inteligentes y aplicaciones en Web3.

Su cuenta de Ethereum funcionará a través de las diferentes redes, pero el saldo de su cuenta y el historial de transacciones no se mantendrán desde la red principal de Ethereum. Con fines de realizar pruebas, es útil saber qué redes están disponibles y cómo hacer que la red de prueba ETH la experimente. En general, por razones de seguridad, no se recomienda reutilizar cuentas de la red principal en redes de pruebas o viceversa.

## Requisitos previos {#prerequisites}

Debe comprender los [conceptos básicos de Ethereum](/developers/docs/intro-to-ethereum/) antes de aprender sobre las diferentes redes, ya que las redes de prueba le ofrecerán una versión económica y segura de Ethereum para experimentar.

## Redes públicas {#public-networks}

Las redes públicas son accesibles para cualquier persona del mundo que disponga de una conexión al Internet. Cualquiera puede leer o crear transacciones en una blockchain pública y validar las transacciones que se están ejecutando. El consenso entre pares decide la inclusión de las transacciones y el estado de la red.

### Ethereum Mainnet {#ethereum-mainnet}

La red principal es la blockchain de producción de Ethereum pública primaria, en la que las transacciones de valor real se realizan en el libro de contabilidad distribuido.

Cuando las personas y los exchanges hablan de los precios de ETH, se están refiriendo al ETH de la Mainnet.

### Redes de prueba de Ethereum {#ethereum-testnets}

Además de Mainnet, existen redes de prueba públicas. Estas son redes utilizadas por desarrolladores de protocolos o de smart contracts para probar tanto actualizaciones del protocolo como posibles smart contracts en un entorno similar a producción antes de su implementación en Mainnet. Como ejemplo, podíamos pensar en los servidores de producción frente a los de almacenamiento.

En la mayoría de los casos es importante comprobar cualquier código de contrato que escriba en una red de pruebas antes de implementarlo en la red principal. Entre DApps que se integran con contratos inteligentes existentes, la mayoría de los proyectos tienen copias desplegadas en redes de pruebas.

La mayoría de las redes de prueba empezaron utilizando un mecanismo de consenso de prueba de autoridad permitido. Es decir, se escoge un pequeño número de nodos para validar las transacciones y crear nuevos bloques apostando sus identidades en el proceso. Alternativamente, algunas redes de pruebas cuentan con un mecanismo de consenso de prueba de participación abierto donde todos pueden hacer una prueba de ejecución de validador, al igual que en la red principal de Ethereum.

El ETH en las redes de prueba se supone que no tiene un valor real; sin embargo, se han creado mercados para ciertos tipos de ETH de red de prueba que se han vuelto escasos o difíciles de obtener. Dado que necesita ETH para interactuar con Ethereum (incluso en redes de prueba), la mayoría de las personas obtienen ETH de red de prueba de forma gratuita a través de «faucets» (o grifos). La mayoría de las faucets son aplicaciones web en las que puede introducir una dirección a la que pide que le envíen ETH.

#### ¿Qué red de prueba debo usar?

Las dos redes públicas de prueba que los desarrolladores de clientes están manteniendo actualmente son Sepolia y Hoodi. Sepolia es una red de desarrolladores de contratos y aplicaciones para probar sus aplicaciones. La red Hoodi permite a los desarrolladores de protocolos probar actualizaciones de red y permite a los participantes probar validadores en ejecución.

#### Sepolia {#sepolia}

**Sepolia es la red de prueba predeterminada recomendada para el desarrollo de aplicaciones**. La red Sepolia utiliza un conjunto de validadores con permisos controlados por los equipos de clientes y pruebas.

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
- [Faucet del Ecosistema Ethereum](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [Grifo de Sepolia de ethfaucet.com](https://ethfaucet.com/networks/ethereum)
- [Faucet de Google Cloud Web3 Sepolia](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Faucet de Sepolia de Infura](https://www.infura.io/faucet)
- [Faucet PoW](https://sepolia-faucet.pk910.de/)
- [Faucet de Sepolia de QuickNode](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi es una red de prueba para probar la validación y la participación. La red Hoodi está abierta para usuarios que quieren ejecutar un validador en una red de pruebas. Los participantes que quieran probar actualizaciones del protocolo antes de que sean desplegadas en la red principal, por tanto, deberían usar Hoodi.

- Conjunto de validador abierto, los participantes pueden probar las actualizaciones de la red
- Estado grande, útil para probar interacciones complejas de contratos inteligentes
- Tarda más en sincronizarse y requiere más almacenamiento para ejecutar un nodo

##### Recursos

- [Sitio web](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Explorador](https://explorer.hoodi.ethpandaops.io/)
- [Checkpoint Sync](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### Faucets

- [Faucet de Hoodi de Chain Platform](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Faucet de Hoodi](https://hoodi.ethpandaops.io/)
- [Faucet PoW](https://hoodi-faucet.pk910.de/)

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
- [Explorador Beacon](https://beaconlight.ephemery.dev/)
- [Checkpoint Sync](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad](https://launchpad.ephemery.dev/)

#### Faucets

- [Faucet de Bordel](https://faucet.bordel.wtf/)
- [Faucet PoW de Pk910](https://ephemery-faucet.pk910.de/)

#### Holesky (obsoleta) {#holesky}

La testnet Holesky está obsoleta desde septiembre de 2025. Los operadores de participación y los proveedores de infraestructura deberían usar Hoodi en su lugar para pruebas del validador.

- [Anuncio de cierre de la testnet Holesky](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _Blog de EF, 1 de septiembre de 2025_
- [Actualizaciones de las testnets Holesky y Hoodi](https://blog.ethereum.org/en/2025/03/18/hoodi-holesky) - _Blog de EF, 18 de marzo de 2025_

### Redes de prueba de capa 2 {#layer-2-testnets}

[Layer 2 (L2)](/layer-2/) es un término colectivo para describir un conjunto específico de soluciones de escalabilidad para Ethereum. Una capa 2 es una cadena de bloques por separado que amplía Ethereum y hereda las garantías de seguridad de Ethereum. Las redes de prueba de capa 2 suelen estar estrechamente acopladas a redes de pruebas públicas de Ethereum.

#### Arbitrum Sepolia {#arbitrum-sepolia}

Una testnet para [Arbitrum](https://arbitrum.io/).

##### Recursos

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Faucets

- [Faucet de Arbitrum Sepolia de Alchemy](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Faucet de Arbitrum Sepolia de Chainlink](https://faucets.chain.link/arbitrum-sepolia)
- [Grifo de Arbitrum Sepolia de ethfaucet.com](https://ethfaucet.com/networks/arbitrum)
- [Faucet de Arbitrum Sepolia de QuickNode](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

Una testnet para [Optimism](https://www.optimism.io/).

##### Recursos

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### Faucets

- [Faucet de Alchemy](https://www.alchemy.com/faucets/optimism-sepolia)
- [Faucet de Chainlink](https://faucets.chain.link/optimism-sepolia)
- [Grifo de Optimism Sepolia de ethfaucet.com](https://ethfaucet.com/networks/optimism)
- [Faucet de testnet](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

Una testnet para [Starknet](https://www.starknet.io).

##### Recursos

- [Voyager Sepolia Scan](https://sepolia.voyager.online/)

##### Faucets

- [Faucet de Alchemy](https://www.alchemy.com/faucets/starknet-sepolia)
- [Faucet de Blast Starknet Sepolia](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Faucet de Starknet](https://starknet-faucet.vercel.app/)

## Redes privadas {#private-networks}

Una red Ethereum es privada si sus nodos no están conectados a una red pública (es decir, Mainnet o una testnet). En este contexto, el término privado solo significa reservado o aislado, en lugar de protegido o seguro.

### Redes de desarrollo {#development-networks}

Para desarrollar una aplicación Ethereum, se recomienda ejecutarla en una red privada para ver cómo funciona antes de implementarla. De igual modo que crea un servidor local en su ordenador para el desarrollo web, puede crear una instancia de cadena de bloques local para probar su DApp. Esto permite realizar una repetición mucho más rápida que en una red de prueba pública.

Existen proyectos y herramientas exclusivos para ayudarle con esto. Más información sobre [redes de desarrollo](/developers/docs/development-networks/).

### Redes de consorcio {#consortium-networks}

El proceso de consenso se controla mediante un conjunto predefinido de nodos de confianza. Por ejemplo, una red privada de instituciones académicas conocidas en las que cada una gestiona un único nodo y los bloques se validan mediante un umbral de signatarios en la red.

Si una red pública de Ethereum es como la red pública de internet, puede entender una red de consorcio como una intranet privada.

## <Emoji text="🚉" /> ¿Por qué las testnets de Ethereum llevan nombres de estaciones de metro? {#why-naming}

Muchas testnets de Ethereum llevan el nombre de estaciones de metro o tren del mundo real. Esta tradición de nombrar comenzó temprano y refleja las ciudades globales donde han vivido o trabajado los colaboradores. Es simbólico, memorable y práctico. Al igual que las testnets están aisladas de la Ethereum mainnet, las líneas de metro funcionan separadas del tráfico superficial.

### <Emoji text="🚧" /> Testnets habituales y heredadas {#common-and-legacy-testnets}

- **Sepolia**: un barrio vinculado al metro en Atenas, Grecia. Actualmente se usa para pruebas de smart contracts y dApps.
- **Hoodi**: lleva el nombre de la estación de metro Hoodi en Bengaluru, India. Se utiliza para pruebas de validadores y actualizaciones de protocolo.
- **Goerli** _(obsoleta)_: lleva el nombre de Görlitzer Bahnhof en Berlín, Alemania.
- **Rinkeby** _(obsoleta)_: lleva el nombre de un barrio de Estocolmo con estación de metro.
- **Ropsten** _(obsoleta)_ — Se refiere a una zona y antiguo terminal de ferry/metro en Estocolmo.
- **Kovan** _(obsoleta)_ — Lleva el nombre de una estación de MRT en Singapur.
- **Morden** _(obsoleta)_ — Lleva el nombre de una estación del metro de Londres. La primera testnet pública de Ethereum.

### <Emoji text="🧪" /> Otras testnets especializadas {#other-testnets}

Algunas testnets se crearon para pruebas de corta duración o específicas de actualizaciones y no necesariamente tienen temática de metro:

- **Holesky** _(obsoleta)_ — Lleva el nombre de la estación Holešovice en Praga. Usada para pruebas de validadores; obsoleta desde 2025.
- **Kiln**, **Zhejiang**, **Shandong**, **Prater**, **Pyrmont**, **Olympic** _(todas obsoletas)_ y **Ephemery**: creadas para simulaciones de actualizaciones como The Merge, Shanghai o experimentos con validadores. Algunos nombres son regionales o temáticos en lugar de estar basados en estaciones de metro.

Usar nombres de estaciones de metro ayuda a los desarrolladores a identificar y recordar rápidamente las testnets sin tener que depender de IDs de cadena numéricos. También refleja la cultura de Ethereum: práctica, global y centrada en las personas.

## Herramientas relacionadas {#related-tools}

- [Chainlist](https://chainlist.org/) _lista de redes EVM para conectar billeteras y proveedores al Chain ID y Network ID correspondientes_
- [Cadenas basadas en EVM](https://github.com/ethereum-lists/chains) _Repositorio de GitHub con metadatos de cadenas que alimentan Chainlist_

## Lecturas adicionales {#further-reading}

- [Propuesta: Ciclo de vida predecible de los testnets de Ethereum](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [La evolución de los testnets de Ethereum](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
