---
title: Estándares de desarrollo de Ethereum
description: Aprenda sobre los estándares de Ethereum, incluyendo los EIP, los estándares de tokens como ERC-20 y ERC-721, y las convenciones de desarrollo.
lang: es
incomplete: true
---

## Descripción general de los estándares {#standards-overview}

La comunidad de Ethereum ha adoptado muchos estándares que ayudan a mantener los proyectos (como los [clientes de Ethereum](/developers/docs/nodes-and-clients/) y las billeteras) interoperables entre implementaciones, y aseguran que los contratos inteligentes y las aplicaciones descentralizadas (dapps) sigan siendo componibles.

Por lo general, los estándares se introducen como [Propuestas de mejora de Ethereum](/eips/) (EIP), que los miembros de la comunidad discuten a través de un [proceso estándar](https://eips.ethereum.org/EIPS/eip-1).

- [Introducción a las EIP](/eips/)
- [Lista de EIP](https://eips.ethereum.org/)
- [Repositorio de GitHub de las EIP](https://github.com/ethereum/EIPs)
- [Foro de discusión de las EIP](https://ethereum-magicians.org/c/eips)
- [Introducción a la gobernanza de Ethereum](/governance/)
- [Descripción general de la gobernanza de Ethereum](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _31 de marzo de 2019 - Boris Mann_
- [Gobernanza del desarrollo del protocolo de Ethereum y coordinación de actualizaciones de la red](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _23 de marzo de 2020 - Hudson Jameson_
- [Lista de reproducción de todas las reuniones de desarrolladores principales de Ethereum](https://www.youtube.com/@EthereumProtocol) _(Lista de reproducción de YouTube)_

## Tipos de estándares {#types-of-standards}

Hay 3 tipos de EIP:

- Vía de estándares (Standards Track): describe cualquier cambio que afecte a la mayoría o a todas las implementaciones de Ethereum.
- [Vía meta (Meta Track)](https://eips.ethereum.org/meta): describe un proceso en torno a Ethereum o propone un cambio en un proceso.
- [Vía informativa (Informational Track)](https://eips.ethereum.org/informational): describe un problema de diseño de Ethereum o proporciona pautas generales o información a la comunidad de Ethereum.

Además, la vía de estándares se subdivide en 4 categorías:

- [Núcleo (Core)](https://eips.ethereum.org/core): mejoras que requieren una bifurcación de consenso.
- [Redes (Networking)](https://eips.ethereum.org/networking): mejoras en torno a devp2p y el subprotocolo ligero de Ethereum (Light Ethereum Subprotocol), así como mejoras propuestas a las especificaciones del protocolo de red de whisper y enjambre (swarm).
- [Interfaz (Interface)](https://eips.ethereum.org/interface): mejoras en torno a las especificaciones y estándares de la API/RPC del cliente, y ciertos estándares a nivel de lenguaje como los nombres de métodos y las ABI de los contratos.
- [ERC](https://eips.ethereum.org/erc): estándares y convenciones a nivel de aplicación.

Puede encontrar información más detallada sobre estos diferentes tipos y categorías en la [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types).

### Estándares de tokens {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/): una interfaz estándar para tokens fungibles (intercambiables), como tokens de voto, tokens de staking o monedas virtuales.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/): un estándar de tokens fungibles que hace que los tokens se comporten de manera idéntica al ether y admite el manejo de transferencias de tokens en el lado del destinatario.
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/): una interfaz de extensión para tokens ERC-20 que admite la ejecución de devoluciones de llamada (callbacks) en los contratos receptores en una sola transacción.
- [ERC-721](/developers/docs/standards/tokens/erc-721/): una interfaz estándar para tokens no fungibles, como un título de propiedad para una obra de arte o una canción.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309): un evento estandarizado que se emite al crear o transferir uno o varios tokens no fungibles utilizando identificadores de tokens consecutivos.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400): extensión de interfaz para el rol de consumidor de la EIP-721.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907): agrega un rol de tiempo limitado con permisos restringidos a los tokens ERC-721.
- [ERC-777](/developers/docs/standards/tokens/erc-777/): **(NO RECOMENDADO)** un estándar de tokens que mejora el ERC-20.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/): un estándar de tokens que puede contener tanto activos fungibles como no fungibles.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/): un estándar de bóveda tokenizada diseñado para optimizar y unificar los parámetros técnicos de las bóvedas que generan rendimiento.

Obtenga más información sobre los [estándares de tokens](/developers/docs/standards/tokens/).

## Lecturas adicionales {#further-reading}

- [Propuestas de mejora de Ethereum (EIP)](/eips/)

_¿Conoce algún recurso de la comunidad que le haya servido de ayuda? ¡Edite esta página y agréguelo!_