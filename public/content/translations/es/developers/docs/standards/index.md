---
title: "Estándares de desarrollo de Ethereum"
description: "Conzca los estándares de Ethereum, incluidos los EIP, los estándares de tókenes como ERC-20 y ERC-721, y las convenciones de desarrollo."
lang: es
incomplete: true
---

## Resumen de los estándares {#standards-overview}

La comunidad de Ethereum ha adoptado muchos estándares que ayudan a mantener la interoperabilidad de los proyectos (como los [clientes de Ethereum](/developers/docs/nodes-and-clients/) y las billeteras) entre implementaciones, y garantizan que los contratos inteligentes y las dapps sigan siendo componibles.

Normalmente, los estándares se presentan como [Propuestas de Mejora de Ethereum](/eips/) (EIP), que son debatidas por los miembros de la comunidad a través de un [proceso estándar](https://eips.ethereum.org/EIPS/eip-1).

- [Introducción a las EIP](/eips/)
- [Lista de EIP](https://eips.ethereum.org/)
- [Repositorio de GitHub de las EIP](https://github.com/ethereum/EIPs)
- [Foro de debate de las EIP](https://ethereum-magicians.org/c/eips)
- [Introducción a la gobernanza de Ethereum](/governance/)
- [Resumen de la gobernanza de Ethereum](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _31 de marzo de 2019 - Boris Mann_
- [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _23 de marzo de 2020 - Hudson Jameson_
- [Lista de reproducción de todas las reuniones de los desarrolladores del núcleo de Ethereum](https://www.youtube.com/@EthereumProtocol) _(Lista de reproducción de YouTube)_

## Tipos de estándares {#types-of-standards}

Hay tres tipos de EIP:

- Standards Track: describe cualquier cambio que afecte a la mayoría o a todas las implementaciones de Ethereum
- [Meta Track](https://eips.ethereum.org/meta): describe un proceso en torno a Ethereum o propone un cambio en un proceso
- [Informational Track](https://eips.ethereum.org/informational): describe un problema de diseño de Ethereum o proporciona directrices generales o información a la comunidad de Ethereum

Además, el Standard Track se subdivide en 4 categorías:

- [Núcleo](https://eips.ethereum.org/core): mejoras que requieren una bifurcación de consenso
- [Redes](https://eips.ethereum.org/networking): mejoras en torno a devp2p y el subprotocolo ligero de Ethereum, así como mejoras propuestas en las especificaciones del protocolo de red de Whisper y Swarm.
- [Interfaz](https://eips.ethereum.org/interface): mejoras en torno a las especificaciones y estándares de la API/RPC del cliente, y ciertos estándares a nivel de lenguaje, como los nombres de los métodos y las ABI de los contratos.
- [ERC](https://eips.ethereum.org/erc): estándares y convenciones a nivel de aplicación

Puede encontrar información más detallada sobre estos diferentes tipos y categorías en [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)

### Estándares de tokens {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - Una interfaz estándar para tokens fungibles (intercambiables), como los tokens de votación, los tokens de staking o las monedas virtuales.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - Un estándar de tokens fungibles que hace que los tokens se comporten de forma idéntica al ether y admite el manejo de las transferencias de tokens por parte del destinatario.
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) - Una interfaz de extensión para tokens ERC-20 que permite ejecutar una retrollamada en los contratos de los destinatarios en una única transacción.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - Una interfaz estándar para tokens no fungibles, como un título de propiedad para una obra de arte o una canción.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - Un evento estandarizado que se emite al crear/transferir uno o varios tokens no fungibles utilizando identificadores de token consecutivos.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - Extensión de la interfaz para la función de consumidor de EIP-721.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - Añade una función de tiempo limitado con permisos restringidos a los tokens ERC-721.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(NO RECOMENDADO)** Un estándar de token que mejora el ERC-20.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - Un estándar de token que puede contener tanto activos fungibles como no fungibles.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - Un estándar de bóveda tokenizada diseñado para optimizar y unificar los parámetros técnicos de las bóvedas que generan rendimiento.

Más información sobre los [estándares de tokens](/developers/docs/standards/tokens/).

## Lecturas adicionales {#further-reading}

- [Propuestas de Mejora de Ethereum (EIP)](/eips/)

_¿Conoce algún recurso de la comunidad que le haya sido de ayuda? ¡Edite esta página y agréguela!_
