---
title: Estándares de desarrollo de Ethereum
description:
lang: es
incomplete: true
---

## Resumen de estándares {#standards-overview}

La comunidad Ethereum ha adoptado muchos estándares que ayudan a mantener interoperables proyectos (como [clientes Ethereum](/developers/docs/nodes-and-clients/) y carteras) a través de implementaciones, y asegurar que los contratos inteligentes y dapps sigan siendo compuestos.

Normalmente se introducen estándares como [Propuestas de mejora de Ethereum](/eips/) (EIP), que se someten a un debate entre los miembros de la comunidad a través de un [proceso estándar](https://eips.ethereum.org/EIPS/eip-1).

- [Introducción a EIP](/eips/)
- [Lista de EIP](https://eips.ethereum.org/)
- [Repositorio de GitHub de EIP](https://github.com/ethereum/EIPs)
- [Tablón de discusión de EIP](https://ethereum-magicians.org/c/eips)
- [Introducción a la Gobernanza de Ethereum](/governance/)
- [Resumen de gobernanza de Ethereum](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _31 de marzo de 2019, Mann Boris_
- [Gobernanza de desarrollo del protocolo de Ethereum y coordinación de actualización de la red](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _23 de marzo de 2020, Hudson Jameson_
- [Lista de reproducción de todas las reuniones de desarrolladores principales de Ethereum](https://www.youtube.com/@EthereumProtocol) _(lista de reproducción de YouTube)_

## Tipos de estándares {#types-of-standards}

Hay tres tipos de EIP:

- Standards Track: describe cualquier cambio que afecte a la mayoría o a todas las implementaciones de Ethereum
- [Meta Track](https://eips.ethereum.org/meta): describe un proceso en torno a Ethereum o propone un cambio en un proceso
- [Informational Track](https://eips.ethereum.org/informational): describe un problema de diseño de Ethereum o proporciona directrices generales o información a la comunidad de Ethereum

Además, el Standard Track se subdivide en 4 categorías:

- [Core](https://eips.ethereum.org/core): mejoras que requieren una bifurcación de consenso
- [Networking](https://eips.ethereum.org/networking): mejoras en torno a devp2p y el Light Ethereum Subprotocol (LES), así como propuestas de mejoras a las especificaciones de protocolo de red de whisper y swarm.
- [Interface](https://eips.ethereum.org/interface): mejoras en torno a especificaciones y estándares API/RPC del cliente, y ciertos estándares a nivel del lenguaje, como nombres de métodos y ABI de contratos.
- [ERC](https://eips.ethereum.org/erc): estándares y convenciones a nivel de aplicación

Puede encontrar información más detallada sobre estos diferentes tipos y categorías en [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)

### Estándares de tokens {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/): Una interfaz para tokens fungibles (intercambiables), como tokens de votación, tokens de staking o monedas virtuales.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/): Estándar de tokens fungibles que hace que los tokens se comporten idénticos a ether y admite el manejo de transferencias de tokens en el lado del destinatario.
  - [ERC-1363](https://eips.ethereum.org/EIPS/eip-1363): Define una interfaz de token para los tokens ERC que soporta la ejecución del código del destinatario después de la transferencia o transferFrom, o código spender después de la aprobación.
- [ERC-721](/developers/docs/standards/tokens/erc-721/): Una interfaz para tokens no fungibles (NFT), como un deed de una obra de arte o una canción.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309): Un evento estandarizado emitido al crear/transferir uno, o muchos tokens no fungibles usando identificadores consecutivos de token.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400): Extensión de interfaz para el rol de consumidor EIP-721.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907): Añada un rol de tiempo limitado con permisos restringidos a los tokens ERC-721.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(NO RECOMENDEDO**: Un mejora de estándar de tokens respecto de ERC-20.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/): Un estándar de token que puede contener activos fungibles y no fungibles.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/): Estándar de bóveda tokenizada diseñado para optimizar y unificar los parámetros técnicos de las bóvedas que otorgan rendimiento.

Obtenga más información sobre los [estándar de tokens](/developers/docs/standards/tokens/).

## Más lectura {#further-reading}

- [Propuestas de mejora de Ethereum (EIP)](/eips/)

_¿Conoces algún recurso en la comunidad que te haya servido de ayuda? Edita esta página y añádelo._
