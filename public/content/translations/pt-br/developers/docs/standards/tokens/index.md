---
title: "Padrões de token"
description: "Explorar os padrões de tokens Ethereum, incluindo ERC-20, ERC-721, e ERC-1155 para tokens substituível e não substituível."
lang: pt-br
incomplete: true
---

## Introdução {#introduction}

Muitos padrões de desenvolvimento do Ethereum focam em interfaces de tokens. Esses padrões ajudam a garantir que os contratos inteligentes permaneçam componíveis, para que, quando um novo projeto emitir um token, ele permaneça compatível com as corretoras e aplicativos descentralizados existentes.

Os padrões de token definem como os tokens se comportam e interagem em todo o ecossistema Ethereum. Eles facilitam a criação para os desenvolvedores sem reinventar a roda, garantindo que os tokens funcionem perfeitamente com carteiras, corretoras e plataformas DeFi. Seja em jogos, governança ou outros casos de uso, esses padrões fornecem consistência e tornam o Ethereum mais interconectado.

## Pré-requisitos {#prerequisites}

- [Padrões de desenvolvimento do Ethereum](/developers/docs/standards/)
- [Contratos inteligentes](/developers/docs/smart-contracts/)

## Padrões de token {#token-standards}

Aqui estão alguns dos padrões mais populares de token no Ethereum:

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - Uma interface padrão para tokens fungíveis (intercambiáveis), como tokens de votação, tokens de staking ou moedas virtuais.

### Padrões de NFT {#nft-standards}

- [ERC-721](/developers/docs/standards/tokens/erc-721/) - Uma interface padrão para tokens não fungíveis, como um título de propriedade para uma obra de arte ou uma música.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - O ERC-1155 permite negociações mais eficientes e o agrupamento de transações, economizando custos. Este padrão de token permite a criação tanto de tokens utilitários, como $BNB ou $BAT, quanto de tokens não-fungíveis, por exemplo, os CryptoPunks.

A lista completa de propostas [ERC](https://eips.ethereum.org/erc).

## Leitura adicional {#further-reading}

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-a!_

## Tutoriais relacionados {#related-tutorials}

- [Lista de verificação da integração de tokens](/developers/tutorials/token-integration-checklist/) _– Uma lista de verificação de itens a serem considerados ao interagir com tokens._
- [Entenda o contrato inteligente do token ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _– Uma introdução à implantação do seu primeiro contrato inteligente em uma rede de teste Ethereum._
- [Transferências e aprovação de tokens ERC20 a partir de um contrato inteligente em Solidity](/developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/) _– Como usar um contrato inteligente para interagir com um token usando a linguagem Solidity._
- [Implementando um mercado ERC721 [um guia prático]](/developers/tutorials/how-to-implement-an-erc721-market/) _– Como colocar itens tokenizados à venda em um quadro de classificados descentralizado._
