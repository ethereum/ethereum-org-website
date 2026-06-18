---
title: "Padrão de Múltiplos Tokens ERC-1155"
description: "Aprenda sobre o ERC-1155, um padrão de múltiplos tokens que combina tokens fungíveis e não fungíveis em um único contrato."
lang: pt-br
---

## Introdução {#introduction}

Uma interface padrão para contratos que gerenciam múltiplos tipos de tokens. Um único contrato implantado pode incluir qualquer combinação de tokens fungíveis, tokens não fungíveis ou outras configurações (por exemplo, tokens semifungíveis).

**O que significa Padrão de Múltiplos Tokens?**

A ideia é simples e busca criar uma interface de contrato inteligente que possa representar e controlar qualquer número de tipos de tokens fungíveis e não fungíveis. Dessa forma, o token ERC-1155 pode executar as mesmas funções que um token [ERC-20](/developers/docs/standards/tokens/erc-20/) e [ERC-721](/developers/docs/standards/tokens/erc-721/), e até mesmo ambos ao mesmo tempo. Ele melhora a funcionalidade dos padrões ERC-20 e ERC-721, tornando-o mais eficiente e corrigindo erros óbvios de implementação.

O token ERC-1155 é totalmente descrito no [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155).

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, recomendamos que você leia primeiro sobre [padrões de token](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) e [ERC-721](/developers/docs/standards/tokens/erc-721/).

## Funções e Recursos do ERC-1155: {#body}

- [Transferência em Lote](#batch-transfers): Transfere múltiplos ativos em uma única chamada.
- [Saldo em Lote](#batch-balance): Obtém os saldos de múltiplos ativos em uma única chamada.
- [Aprovação em Lote](#batch-approval): Aprova todos os tokens para um endereço.
- [Hooks](#receive-hook): Hook de recebimento de tokens.
- [Suporte a NFT](#nft-support): Se a oferta for apenas 1, trate-o como NFT.
- [Regras de Transferência Segura](#safe-transfer-rule): Conjunto de regras para transferência segura.

### Transferências em Lote {#batch-transfers}

A transferência em lote funciona de forma muito semelhante às transferências regulares do ERC-20. Vamos dar uma olhada na função `transferFrom` regular do ERC-20:

```solidity
// ERC-20
function transferFrom(address from, address to, uint256 value) external returns (bool);

// ERC-1155
function safeBatchTransferFrom(
    address _from,
    address _to,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external;
```

A única diferença no ERC-1155 é que passamos os valores como um array e também passamos um array de ids. Por exemplo, dados `ids=[3, 6, 13]` e `values=[100, 200, 5]`, as transferências resultantes serão

1. Transferência de 100 tokens com id 3 de `_from` para `_to`.
2. Transferência de 200 tokens com id 6 de `_from` para `_to`.
3. Transferência de 5 tokens com id 13 de `_from` para `_to`.

No ERC-1155, temos apenas `transferFrom`, sem `transfer`. Para usá-lo como um `transfer` regular, basta definir o endereço de origem para o endereço que está chamando a função.

### Saldo em Lote {#batch-balance}

A respectiva chamada `balanceOf` do ERC-20 também tem sua função parceira com suporte a lote. Como lembrete, esta é a versão do ERC-20:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

Ainda mais simples para a chamada de saldo, podemos recuperar múltiplos saldos em uma única chamada. Passamos o array de proprietários, seguido pelo array de ids de token.

Por exemplo, dados `_ids=[3, 6, 13]` e `_owners=[0xbeef..., 0x1337..., 0x1111...]`, o valor de retorno será

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### Aprovação em Lote {#batch-approval}

```solidity
// ERC-1155
function setApprovalForAll(
    address _operator,
    bool _approved
) external;

function isApprovedForAll(
    address _owner,
    address _operator
) external view returns (bool);
```

As aprovações são um pouco diferentes do ERC-20. Em vez de aprovar quantias específicas, você define um operador como aprovado ou não aprovado via `setApprovalForAll`.

A leitura do status atual pode ser feita via `isApprovedForAll`. Como você pode ver, é uma operação de tudo ou nada. Você não pode definir quantos tokens aprovar ou mesmo qual classe de token.

Isso foi intencionalmente projetado com a simplicidade em mente. Você só pode aprovar tudo para um endereço.

### Hook de Recebimento {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

Dado o suporte ao [EIP-165](https://eips.ethereum.org/EIPS/eip-165), o ERC-1155 suporta hooks de recebimento apenas para contratos inteligentes. A função de hook deve retornar um valor mágico predefinido de bytes4 que é dado como:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Quando o contrato receptor retorna esse valor, presume-se que o contrato aceita a transferência e sabe como lidar com os tokens ERC-1155. Ótimo, chega de tokens presos em um contrato!

### Suporte a NFT {#nft-support}

Quando a oferta é de apenas um, o token é essencialmente um token não fungível (NFT). E como é padrão para o ERC-721, você pode definir uma URL de metadados. A URL pode ser lida e modificada por clientes, veja [aqui](https://eips.ethereum.org/EIPS/eip-1155#metadata).

### Regra de Transferência Segura {#safe-transfer-rule}

Já abordamos algumas regras de transferência segura nas explicações anteriores. Mas vamos dar uma olhada na mais importante das regras:

1. O chamador deve ser aprovado para gastar os tokens para o endereço `_from` ou o chamador deve ser igual a `_from`.
2. A chamada de transferência deve reverter se
   1. O endereço `_to` for 0.
   2. O comprimento de `_ids` não for o mesmo que o comprimento de `_values`.
   3. Qualquer um dos saldos do(s) detentor(es) para o(s) token(s) em `_ids` for menor que a(s) respectiva(s) quantia(s) em `_values` enviada(s) ao destinatário.
   4. Ocorrer qualquer outro erro.

_Nota_: Todas as funções em lote, incluindo o hook, também existem como versões sem lote. Isso é feito para eficiência de gás, considerando que transferir apenas um ativo provavelmente ainda será a maneira mais comumente usada. Nós as deixamos de fora por simplicidade nas explicações, incluindo as regras de transferência segura. Os nomes são idênticos, basta remover o 'Batch'.

## Leitura adicional {#further-reading}

- [EIP-1155: Padrão de Múltiplos Tokens](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: Documentação da OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155: Repositório no GitHub](https://github.com/enjin/erc-1155)
- [API de NFT da Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)