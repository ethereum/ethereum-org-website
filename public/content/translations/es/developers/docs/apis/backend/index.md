---
title: Bibliotecas de API de backend
description: Una introducción a las API del cliente de Ethereum, que permiten interactuar con la blockchain desde tu aplicación.
lang: es
---

Para que una aplicación de software interactúe con la blockchain de Ethereum (por ejemplo, para que lea datos de la blockchain y/o envíe transacciones a la red), debe conectarse a un nodo de Ethereum.

Para ello, cada cliente de Ethereum implementa la especificación JSON-RPC para ofrecer un conjunto uniforme de endpoints con los que pueden contar las aplicaciones.

Si deseas utilizar un lenguaje de programación específico para conectarte a un nodo Ethereum, inicia tu propia solución y ten en cuenta que hay varias bibliotecas dentro del ecosistema que lo hacen mucho más fácil. Mediante estas bibliotecas, los desarrolladores pueden escribir métodos intuitivos de una línea para iniciar solicitudes JSON RPC (de manera invisible), que interactúan con Ethereum.

## Requisitos previos {#prerequisites}

Comprender el [bloque de Ethereum](/developers/docs/ethereum-stack/) y a los [clientes de Ethereum](/docs/nodes-and-clients/) puede resultar útil.

## ¿Por qué usar una biblioteca? {#why-use-a-library}

Estas bibliotecas eliminan en gran parte la complejidad de interactuar directamente con un nodo Ethereum. También proporcionan funciones útiles (por ejemplo, convertir ETH a Gwei) de modo que, como desarrollador, puedas dedicar menos tiempo a lidiar con las complejidades de los clientes de Ethereum y centrarte más en las características únicas de tu aplicación.

## Bibliotecas disponibles {#available-libraries}

**Alchemy:** **_Plataforma de desarrollo de Ethereum._**

- [alchemyapi.io](https://alchemyapi.io)
- [Documentación](https://docs.alchemyapi.io/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.gg/kwqVnrA)

**BlockCypher:** **_API web de Ethereum_**

- [blockcypher.com](https://www.blockcypher.com/)
- [Documentación](https://www.blockcypher.com/dev/ethereum/)

**Infura: ** **_La API de Ethereum como servicio._**

- [infura.io](https://infura.io)
- [Documentación](https://infura.io/docs)
- [GitHub](https://github.com/INFURA)

**La puerta de enlace de Ethereum Cloudflare.**

- [cloudflare-eth.com](https://cloudflare-eth.com)

**Nodesmith:** **_Acceso de API JSON-RPC a la red principal de Ethereum y a redes de prueba._**

- [nodesmith.io](https://nodesmith.io/network/ethereum/)
- [Documentación](https://nodesmith.io/docs/#/ethereum/apiRef)

**Ethercluster:** **_Inicia tu propio servicio API de Ethereum compatible con ETH y ETC._**

- [ethercluster.com](https://www.ethercluster.com/)

**Chainstack:** **_Nodos de Ethereum como un servicio compartidos y exclusivos._**

- [chainstack.com](https://chainstack.com)
- [Documentación](https://docs.chainstack.com)

**QuikNode:** **_Plataforma de desarrollo de blockchain._**

- [quiknode.io](https://quiknode.io)

**Herramientas de Python:** **_Variedad de bibliotecas para interactuar con Ethereum a través de Python._**

- [py.ethereum.org](http://python.ethereum.org/)
- [GitHub de web3.py](https://github.com/ethereum/web3.py)
- [Chat de web3.py](https://gitter.im/ethereum/web3.py)

**web3j:** **_Biblioteca de integración de Java/Android/Kotlin/Scala para Ethereum._**

- [GitHub](https://github.com/web3j/web3j)
- [Documentación](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

**Rivet: ** **_API de Ethereum y Ethereum Classic como un servicio impulsado por software de código abierto._**

- [rivet.cloud](https://rivet.cloud)
- [Documentación](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Nethereum:** **_Una biblioteca de integración .NET de código abierto para blockchain._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Documentación](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

## Más información {#further-reading}

_¿Conoces algún recurso en la comunidad que te haya servido de ayuda? Edita esta página y añádelo._

## Temas relacionados {#related-topics}

- [Nodos y clientes](/developers/docs/nodes-and-clients/)
- [Frameworks de desarrollo](/developers/docs/frameworks/)

## Tutoriales relacionados {#related-tutorials}

- [Configurar Web3js para utilizar la blockchain de Ethereum en JavaScript:](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _ Instrucciones para configurar web3.js en tu proyecto._
- [Solicitar un contrato inteligente desde JavaScript:](/developers/tutorials/calling-a-smart-contract-from-javascript/) _ con ayuda del token Dai, ver como invocar funciones de contratos usando JavaScript._
