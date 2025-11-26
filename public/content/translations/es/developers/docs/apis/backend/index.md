---
title: Bibliotecas de API de backend
description: Una introducción a las API del cliente de Ethereum, que permiten interactuar con la blockchain desde tu aplicación.
lang: es
---

Para que una aplicación de software pueda interactuar con la blockchain de Ethereum (es decir, leer datos de la blockchain y/o enviar transacciones a la red), debe conectarse a un nodo de Ethereum.

Para este propósito, cada cliente de Ethereum implementa la especificación [JSON-RPC](/developers/docs/apis/json-rpc/), de modo que existe un conjunto uniforme de [métodos](/developers/docs/apis/json-rpc/#json-rpc-methods) en los que las aplicaciones pueden confiar.

Si desea utilizar un lenguaje de programación específico para conectarse con un nodo de Ethereum, existen muchas bibliotecas de conveniencia dentro del ecosistema que facilitan mucho esta tarea. Con estas bibliotecas, los desarrolladores pueden crear métodos intuitivos de una sola línea para inicializar solicitudes JSON-RPC (de manera interna) que interactúan con Ethereum.

## Requisitos previos {#prerequisites}

Puede ser útil comprender la [pila de Ethereum](/developers/docs/ethereum-stack/) y los [clientes de Ethereum](/developers/docs/nodes-and-clients/).

## ¿Por qué usar una biblioteca? {#why-use-a-library}

Estas bibliotecas eliminan en gran parte la complejidad de interactuar directamente con un nodo Ethereum. También proporcionan funciones utilitarias (por ejemplo, convertir ETH a Gwei), para que como desarrollador dedique menos tiempo a las complejidades de los clientes de Ethereum y pueda enfocarse más en la funcionalidad única de su aplicación.

## Bibliotecas disponibles {#available-libraries}

### Infraestructura y servicios de nodo {#infrastructure-and-node-services}

**Alchemy -** **_Plataforma de desarrollo de Ethereum._**

- [alchemy.com](https://www.alchemy.com/)
- [Documentación](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node -** **_Node-as-a-Service._**

- [All That Node.com](https://www.allthatnode.com/)
- [Documentación](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs -** **_APIs descentralizadas para Ethereum Mainnet y Testnets._**

- [blastapi.io](https://blastapi.io/)
- [Documentación](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_Brinda servicios RPC más eficientes y rápidos_**

- [blockpi.io](https://blockpi.io/)
- [Documentación](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare Ethereum Gateway.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan: Explorador de bloques y API de transacción**

- [Documentación](https://docs.etherscan.io/)

**Blockscout - Explorador de bloques de código abierto**

- [Documentación](https://docs.blockscout.com/)

**GetBlock-** **_Blockchain-as-a-service para el desarrollo Web3_**

- [GetBlock.io](https://getblock.io/)
- [Documentación](https://docs.getblock.io/)

**Infura -** **_La API de Ethereum como servicio._**

- [infura.io](https://infura.io)
- [Documentación](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _Proveedor EVM JSON-RPC rentable_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Documentación](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _Nodos completos y exploradores de bloques._**

- [NOWNodes.io](https://nownodes.io/)
- [Documentación](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_Infraestructura Blockchain como Servicio._**

- [quicknode.com](https://quicknode.com)
- [Documentación](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_APIs para Ethereum y Ethereum Classic como servicio impulsadas por software de código abierto._**

- [rivet.cloud](https://rivet.cloud)
- [Documentación](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_Nodos de Ethereum orientados a la velocidad como API JSON-RPC/WebSockets._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Documentación](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Herramientas de desarrollo {#development-tools}

**ethers-kt -** **_Librería asíncrona y de alto rendimiento en Kotlin/Java/Android para blockchains basados en EVM._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Ejemplos](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_Una biblioteca de integración .NET de código abierto para blockchain._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Documentación](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Python Tooling -** **_Variedad de bibliotecas para la interacción con Ethereum vía Python._**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Chat](https://gitter.im/ethereum/web3.py)

**Tatum -** **_La plataforma de desarrollo blockchain definitiva._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Documentación](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_Una biblioteca de integración Java/Android/Kotlin/Scala para Ethereum._**

- [GitHub](https://github.com/web3j/web3j)
- [Docs](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Servicios blockchain {#blockchain-services}

**BlockCypher -** **_APIs web de Ethereum._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Documentación](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_Infraestructura de datos web3 todo en uno para Ethereum._**

- [chainbase.com](https://chainbase.com/)
- [Documentación](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_Nodos elásticos y dedicados de Ethereum como servicio._**

- [chainstack.com](https://chainstack.com)
- [Documentación](https://docs.chainstack.com/)
- [Referencia API Ethereum](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_API de infraestructura blockchain._**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [Documentación](https://docs.cdp.coinbase.com/)

**DataHub by Figment -** **_Servicios de API Web3 con Ethereum Mainnet y testnets._**

- [DataHub](https://www.figment.io/)
- [Documentación](https://docs.figment.io/)

**Moralis -** **_Proveedor de API EVM a nivel empresarial._**

- [moralis.io](https://moralis.io)
- [Documentación](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Foro](https://forum.moralis.io/)

**NFTPort -** **_APIs de Datos y Mint de Ethereum._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Documentación](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_La plataforma general de APIs para múltiples blockchains de criptomonedas._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Documentación](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_Proporciona acceso a la API del blockchain de Ethereum de forma simple y confiable._**

- [Watchdata](https://watchdata.io/)
- [Documentación](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent -** **_APIs enriquecidas de blockchain para más de 200 cadenas._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Documentación](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

## Lecturas adicionales {#further-reading}

_¿Conoce algún recurso de la comunidad que le haya sido de ayuda? Editar esta página y agregarla!_

## Temas relacionados {#related-topics}

- [Nodos y clientes](/developers/docs/nodes-and-clients/)
- [Frameworks de desarrollo](/developers/docs/frameworks/)

## Tutoriales relacionados {#related-tutorials}

- [Configure Web3js para usar la blockchain de Ethereum en JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Instrucciones para configurar web3.js en su proyecto._
- [Llamar a un smart contract desde JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Usando el token DAI, vea cómo llamar funciones de contratos utilizando JavaScript._
