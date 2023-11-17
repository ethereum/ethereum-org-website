---
title: Bibliotecas de API de backend
description: Una introducción a las API del cliente de Ethereum, que permiten interactuar con la blockchain desde tu aplicación.
lang: es
---

Para que una aplicación de software interactúe con la blockchain de Ethereum (por ejemplo, para que lea datos de la blockchain y/o envíe transacciones a la red), debe conectarse a un nodo de Ethereum.

Para este propósito, cada cliente de Ethereum implementa la especificación [JSON-RPC](/developers/docs/apis/json-rpc/) de modo que exista un conjunto uniforme de [métodos](/developers/docs/apis/json-rpc/#json-rpc-methods) para las aplicaciones.

Si deseas utilizar un lenguaje de programación específico para conectarte a un nodo Ethereum, inicia tu propia solución y ten en cuenta que hay varias bibliotecas dentro del ecosistema que lo hacen mucho más fácil. Mediante estas bibliotecas, los desarrolladores pueden escribir métodos intuitivos de una línea para iniciar solicitudes JSON RPC (de manera invisible), que interactúan con Ethereum.

## Requisitos previos {#prerequisites}

Comprender la [pila de Ethereum](/developers/docs/ethereum-stack/) y los [clientes de Ethereum](/developers/docs/nodes-and-clients/) puede resultar útil.

## ¿Por qué usar una biblioteca? {#why-use-a-library}

Estas bibliotecas eliminan en gran parte la complejidad de interactuar directamente con un nodo Ethereum. También proporcionan funciones útiles (por ejemplo, convertir ETH a Gwei) de modo que, como desarrollador, puedas dedicar menos tiempo a lidiar con las complejidades de los clientes de Ethereum y centrarte más en las características únicas de tu aplicación.

## Bibliotecas disponibles {#available-libraries}

**Alchemy:** **_Plataforma de desarrollo de Ethereum._**

- [alchemy.com](https://www.alchemy.com/)
- [Documentación](https://docs.alchemyapi.io/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/A39JVCM)

**BlockCypher:** **_API web de Ethereum._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Documentación](https://www.blockcypher.com/dev/ethereum/)

**Blast by Bware Labs:** **_API descentralizadas para redes de prueba y la red principal de Ethereum._**

- [blastapi.io](https://blastapi.io/)
- [Documentación](https://docs.blastapi.io)
- [Discord](https://discord.com/invite/VPkWESgtvV)

**Infura: ** **_La API de Ethereum como servicio._**

- [infura.io](https://infura.io)
- [Documentación](https://infura.io/docs)
- [GitHub](https://github.com/INFURA)

**Cloudflare Ethereum Gateway.**

- [cloudflare-eth.com](https://cloudflare-eth.com)

**Coinbase Cloud Node:** **_API de infraestructura de cadena de bloques._**

- [Coinbase Cloud Node](https://www.coinbase.com/cloud/products/node)
- [Documentación](https://docs.cloud.coinbase.com/node/reference/welcome-to-node)

**DataHub by Figment:\*\*** _Servicios de API web3 con redes de prueba y la red principal de Ethereum._\*\*

- [DataHub](https://www.figment.io/datahub)
- [Documentación](https://docs.figment.io/introduction/what-is-datahub)

**NFTPort:** **_API de datos y minteo de Ethereum._**

- [puertonft.xyz](https://www.nftport.xyz/)
- [Documentación](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Nodesmith:** **_Acceso de API JSON-RPC a redes de prueba y la red principal de Ethereum._**

- [nodesmith.io](https://nodesmith.io/network/ethereum/)
- [Documentación](https://nodesmith.io/docs/#/ethereum/apiRef)

**Ethercluster:** **_Inicie su propio servicio de API de Ethereum compatible con ETH y ETC._**

- [ethercluster.com](https://www.ethercluster.com/)

**Chainstack:** **_Nodos elásticos y dedicados de Ethereum como servicio._**

- [chainstack.com](https://chainstack.com)
- [Documentación](https://docs.chainstack.com)
- [Referencia de API de Ethereum](https://docs.chainstack.com/api/ethereum/ethereum-api-reference)

**QuickNode:** **_Infraestructura de cadena de bloques como servicio._**

- [quicknode.com](https://quicknode.com)
- [Documentación](https://www.quicknode.com/docs)
- [Discord](https://discord.gg/NaR7TtpvJq)

**Herramientas de Python:** **_Variedad de bibliotecas para interactuar con Ethereum a través de Python._**

- [py.ethereum.org](http://python.ethereum.org/)
- [Github de web3.py](https://github.com/ethereum/web3.py)
- [Chat de web3.py](https://gitter.im/ethereum/web3.py)

**web3j:** **_Biblioteca de integración de Java/Android/Kotlin/Scala para Ethereum._**

- [GitHub](https://github.com/web3j/web3j)
- [Documentos](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

**Rivet:** **_API de Ethereum y Ethereum Classic como servicio impulsadas por software de código abierto._**

- [rivet.cloud](https://rivet.cloud)
- [Documentación](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Nethereum:** **_Biblioteca de integración .NET de código abierto para la cadena de bloques._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Documentación](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Tatum:** **_Plataforma definitiva de desarrollo de cadena de bloques._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Documentación](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**Watchdata:** **_Proporcione acceso sencillo y seguro de API a la cadena de bloques de Ethereum._**

- [Watchdata](https://watchdata.io/)
- [Documentación](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Zmok:** **_Nodos Ethereum orientados a la velocidad como API JSON-RPC/WebSockets._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Documentación](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

**NOWNodes: _Nodos completos y exploradores de bloques._**

- [NOWNodes.io](https://nownodes.io/)
- [Documentación](https://documenter.getpostman.com/view/13630829/TVmFkLwy#intro)

**Moralis:** **_Proveedor de API de EVM de nivel empresarial._**

- [moralis.io](http://moralis.io)
- [Documentación](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://discord.com/invite/KYswaxwEtg)
- [Foro](https://forum.moralis.io/)

**Chainbase:** **_Infraestructura de datos web3 de Ethereum todo en uno._**

- [chainbase.com](https://chainbase.com/)
- [Documentación](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**GetBlock:** **_Cadena de bloques como servicio para el desarrollo web3_**

- [GetBlock.io](https://getblock.io/)
- [Documentación](https://getblock.io/docs/)

**BlockPi:\*\***_ Proporcione servicios RPC más eficientes y rápidos._\*\*

- [blockpi.io](https://blockpi.io/)
- [Documentación](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Tokenview:** **_La plataforma general de API de Blockchain Multi-Crypto._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Documentación](https://services.tokeniew/docs?type=api)
- [Github](https://github.com/Tokenview)

## Más información {#further-reading}

_¿Conoce algún recurso de la comunidad que le haya servido de ayuda? Edite esta página y añádalo._

## Temas relacionados {#related-topics}

- [ Nodos y clientes](/developers/docs/nodes-and-clients/)
- [Entornos de desarrollo](/developers/docs/frameworks/)

## Tutoriales relacionados {#related-tutorials}

- [Configurar Web3js para utilizar la cadena de bloques de Ethereum en Javascript:](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _Instrucciones para configurar web3.js en su proyecto._
- [Invocar un contrato inteligente desde JavaScript:](/developers/tutorials/calling-a-smart-contract-from-javascript/) _ con el token DAI, vea cómo invocar funciones de contratos usando Javascript._
