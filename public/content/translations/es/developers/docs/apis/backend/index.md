---
title: Bibliotecas de API de backend
description: Una introducción a las API de clientes de Ethereum que le permiten interactuar con la cadena de bloques desde su aplicación.
lang: es
---

Para que una aplicación de software interactúe con la cadena de bloques de [Ethereum](/) (es decir, leer datos de la cadena de bloques y/o enviar transacciones a la red), debe conectarse a un nodo de Ethereum.

Para este propósito, cada cliente de Ethereum implementa la especificación [JSON-RPC](/developers/docs/apis/json-rpc/), por lo que hay un conjunto uniforme de [métodos](/developers/docs/apis/json-rpc/#json-rpc-methods) en los que las aplicaciones pueden confiar.

Si desea utilizar un lenguaje de programación específico para conectarse con un nodo de Ethereum, hay muchas bibliotecas de conveniencia dentro del ecosistema que lo hacen mucho más fácil. Con estas bibliotecas, los desarrolladores pueden escribir métodos intuitivos de una sola línea para inicializar solicitudes JSON-RPC (internamente) que interactúan con Ethereum.

## Requisitos previos {#prerequisites}

Puede ser útil comprender la [pila de Ethereum](/developers/docs/ethereum-stack/) y los [clientes de Ethereum](/developers/docs/nodes-and-clients/).

## ¿Por qué usar una biblioteca? {#why-use-a-library}

Estas bibliotecas abstraen gran parte de la complejidad de interactuar directamente con un nodo de Ethereum. También proporcionan funciones de utilidad (por ejemplo, convertir ETH a Gwei) para que, como desarrollador, pueda pasar menos tiempo lidiando con las complejidades de los clientes de Ethereum y más tiempo centrado en la funcionalidad única de su aplicación.

## Bibliotecas disponibles {#available-libraries}

### Infraestructura y servicios de nodos {#infrastructure-and-node-services}

**Alchemy:** **_Plataforma de desarrollo de Ethereum._**

- [alchemy.com](https://www.alchemy.com/)
- [Documentación](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)
  
**All That Node:** **_Nodo como servicio._**

- [All That Node.com](https://www.allthatnode.com/)
- [Documentación](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast de Bware Labs:** **_API descentralizadas para la red principal de Ethereum y redes de prueba._**

- [blastapi.io](https://blastapi.io/)
- [Documentación](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi:** **_Proporciona servicios RPC más eficientes y rápidos_**

- [blockpi.io](https://blockpi.io/)
- [Documentación](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare Ethereum Gateway.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan: explorador de bloques y API de transacciones**
- [Documentación](https://docs.etherscan.io/)

**Blockscout: explorador de bloques de código abierto**
- [Documentación](https://docs.blockscout.com/)

**GetBlock:** **_Cadena de bloques como servicio para el desarrollo de Web3_**

- [GetBlock.io](https://getblock.io/)
- [Documentación](https://docs.getblock.io/)

**Infura:** **_La API de Ethereum como servicio._**

- [infura.io](https://infura.io)
- [Documentación](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC: _Proveedor rentable de JSON-RPC para EVM_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Documentación](https://docs.noderpc.xyz/node-rpc)

**NOWNodes: _Nodos completos y exploradores de bloques._**

- [NOWNodes.io](https://nownodes.io/)
- [Documentación](https://nownodes.gitbook.io/documentation)

**QuickNode:** **_Infraestructura de cadena de bloques como servicio._**

- [quicknode.com](https://quicknode.com)
- [Documentación](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet:** **_API de Ethereum y Ethereum Classic como servicio impulsadas por software de código abierto._**

- [rivet.cloud](https://rivet.cloud)
- [Documentación](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok:** **_Nodos de Ethereum orientados a la velocidad como API JSON-RPC/WebSockets._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Documentación](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Herramientas de desarrollo {#development-tools}

**ethers-kt:** **_Biblioteca asíncrona de alto rendimiento en Kotlin/Java/Android para cadenas de bloques basadas en EVM._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Ejemplos](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum:** **_Una biblioteca de integración .NET de código abierto para cadenas de bloques._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Documentación](https://docs.nethereum.com/docs/getting-started/welcome/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Herramientas de Python:** **_Variedad de bibliotecas para la interacción con Ethereum a través de Python._**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [GitHub de Web3.py](https://github.com/ethereum/web3.py)
- [Chat de Web3.py](https://gitter.im/ethereum/web3.py)

**Tatum:** **_La plataforma de desarrollo de cadenas de bloques definitiva._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Documentación](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**Web3j:** **_Una biblioteca de integración en Java/Android/Kotlin/Scala para Ethereum._**

- [GitHub](https://github.com/web3j/web3j)
- [Documentación](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Servicios de cadena de bloques {#blockchain-services}

**BlockCypher:** **_API web de Ethereum._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Documentación](https://www.blockcypher.com/dev/ethereum/)

**Chainbase:** **_Infraestructura de datos Web3 todo en uno para Ethereum._**

- [chainbase.com](https://chainbase.com/)
- [Documentación](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack:** **_Nodos de Ethereum elásticos y dedicados como servicio._**

- [chainstack.com](https://chainstack.com)
- [Documentación](https://docs.chainstack.com/)
- [Referencia de la API de Ethereum](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node:** **_API de infraestructura de cadena de bloques._**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [Documentación](https://docs.cdp.coinbase.com/)

**DataHub de Figment:** **_Servicios de API Web3 con la red principal de Ethereum y redes de prueba._**

- [DataHub](https://www.figment.io/)
- [Documentación](https://docs.figment.io/)

**Moralis:** **_Proveedor de API de EVM de nivel empresarial._**

- [moralis.io](https://moralis.io)
- [Documentación](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Foro](https://forum.moralis.io/)

**NFTPort:** **_API de datos y acuñación de Ethereum._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Documentación](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview:** **_La plataforma general de API de cadenas de bloques multicripto._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Documentación](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata:** **_Proporciona un acceso a la API simple y confiable a la cadena de bloques de Ethereum._**

- [Watchdata](https://watchdata.io/)
- [Documentación](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Codex:** **_API de datos de cadenas de bloques enriquecidos en tiempo real en docenas de cadenas._**

- [codex.io](https://www.codex.io/)
- [Documentación](https://docs.codex.io)
- [Explorador](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Covalent:** **_API de cadenas de bloques enriquecidas para más de 200 cadenas._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Documentación](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)


## Lecturas adicionales {#further-reading}

_¿Conoce algún recurso de la comunidad que le haya ayudado? ¡Edite esta página y agréguelo!_

## Temas relacionados {#related-topics}

- [Nodos y clientes](/developers/docs/nodes-and-clients/)
- [Entornos de desarrollo](/developers/docs/frameworks/)

## Tutoriales relacionados {#related-tutorials}

- [Configurar Web3.js para usar la cadena de bloques de Ethereum en JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Instrucciones para configurar Web3.js en su proyecto._
- [Llamar a un contrato inteligente desde JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Usando el token DAI, vea cómo llamar a la función de contratos usando JavaScript._