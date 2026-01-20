---
title: Padrões de desenvolvimento Ethereum
description: Aprenda sobre padrões de Ethereum, incluindo EIPs, padrões de token como ERC-20 e ERC-721 e convenções de desenvolvimento.
lang: pt-br
incomplete: true
---

## Visão geral dos padrões {#standards-overview}

A comunidade Ethereum adotou muitos padrões que ajudam a manter os projetos (como [clientes Ethereum](/developers/docs/nodes-and-clients/) e carteiras) interoperáveis entre implementações e garantem que os contratos inteligentes e dapps permaneçam componíveis.

Normalmente, os padrões são introduzidos como [Propostas de Melhoria do Ethereum](/eips/) (EIPs), que são discutidas pelos membros da comunidade por meio de um [processo padrão](https://eips.ethereum.org/EIPS/eip-1).

- [Introdução às EIPs](/eips/)
- [Lista de EIPs](https://eips.ethereum.org/)
- [Repositório GitHub de EIPs](https://github.com/ethereum/EIPs)
- [Fórum de discussão sobre EIPs](https://ethereum-magicians.org/c/eips)
- [Introdução à Governança do Ethereum](/governance/)
- [Visão geral da Governança do Ethereum](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _31 de março de 2019 - Boris Mann_
- [Governança de Desenvolvimento do Protocolo Ethereum e Coordenação de Upgrade da Rede](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _23 de março de 2020 - Hudson Jameson_
- [Playlist de todas as reuniões de desenvolvedores do núcleo do Ethereum](https://www.youtube.com/@EthereumProtocol) _(Playlist do YouTube)_

## Tipos de padrões {#types-of-standards}

Existem 3 tipos de EIP:

- Acompanhemento padrão: descreve qualquer mudança que afeta a maioria ou todas as implementações do Ethereum
- [Trilha Meta](https://eips.ethereum.org/meta): descreve um processo em torno do Ethereum ou propõe uma mudança a um processo
- [Trilha Informativa](https://eips.ethereum.org/informational): descreve um problema de design do Ethereum ou fornece diretrizes gerais ou informações para a comunidade Ethereum

Além disso, o acompanhamento padrão é subdividido em 4 categorias:

- [Núcleo (Core)](https://eips.ethereum.org/core): melhorias que exigem uma bifurcação de consenso
- [Rede (Networking)](https://eips.ethereum.org/networking): melhorias em torno do devp2p e do Subprotocolo Leve do Ethereum (Light Ethereum Subprotocol), bem como melhorias propostas para especificações de protocolo de rede do whisper e do swarm.
- [Interface](https://eips.ethereum.org/interface): melhorias em torno de especificações e padrões de API/RPC do cliente, e certos padrões de nível de linguagem como nomes de métodos e ABIs de contrato.
- [ERC](https://eips.ethereum.org/erc): padrões e convenções de nível de aplicativo

Informações mais detalhadas sobre esses diferentes tipos e categorias podem ser encontradas na [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)

### Padrões de token {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - Uma interface padrão para tokens fungíveis (intercambiáveis), como tokens de votação, tokens de staking ou moedas virtuais.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - Um padrão de tokens fungíveis que faz com que os tokens se comportem de forma idêntica ao ether e oferece suporte ao tratamento de transferências de tokens no lado do destinatário.
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) - Uma interface de extensão para tokens ERC-20 que suporta a execução de um callback em contratos de destinatário em uma única transação.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - Uma interface padrão para tokens não fungíveis, como um título de propriedade para uma obra de arte ou uma música.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - Um evento padronizado emitido ao criar/transferir um ou muitos tokens não fungíveis usando identificadores de token consecutivos.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - Extensão de interface para a função de consumidor da EIP-721.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - Adiciona uma função com tempo limitado e com permissões restritas aos tokens ERC-721.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(NÃO RECOMENDADO)** Um padrão de token que melhora o ERC-20.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - Um padrão de token que pode conter ativos fungíveis e não fungíveis.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - Um padrão de cofre tokenizado projetado para otimizar e unificar os parâmetros técnicos de cofres de rendimento.

Saiba mais sobre [padrões de token](/developers/docs/standards/tokens/).

## Leitura adicional {#further-reading}

- [Propostas de Melhoria do Ethereum (EIPs)](/eips/)

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-a!_
