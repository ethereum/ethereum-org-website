---
title: Padrão Multi-Token ERC-1155
description: Saiba mais sobre o ERC-1155, um padrão de múltiplos tokens que combina tokens fungíveis e não fungíveis em um único contrato.
lang: pt-br
---

## Introdução {#introduction}

Uma interface padrão para contratos que gerenciam vários tipos de tokens. Um único contrato implementado pode incluir qualquer combinação de tokens fungíveis, tokens não fungíveis ou outras configurações (por exemplo, tokens semifungíveis).

**O que se entende por padrão Multi-Token?**

A ideia é simples e trata-se de criar uma interface de contratos inteligentes que possa representar e controlar qualquer número de tipos de token, fungíveis ou não fungíveis. Dessa forma, o token ERC-1155 pode executar as mesmas funções de um token [ERC-20](/developers/docs/standards/tokens/erc-20/) e [ERC-721](/developers/docs/standards/tokens/erc-721/), e até mesmo de ambos ao mesmo tempo. Ele melhora a funcionalidade de ambos os padrões ERC-20 e ERC-721, tornando-os mais eficientes e corrigindo erros óbvios de implementação.

O token ERC-1155 é descrito em detalhes na [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155).

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, recomendamos que você leia primeiro sobre os [padrões de token](/developers/docs/standards/tokens/), o [ERC-20](/developers/docs/standards/tokens/erc-20/) e o [ERC-721](/developers/docs/standards/tokens/erc-721/).

## Funções e características do ERC-1155: {#body}

- [Transferência em lote](#batch_transfers): transfira vários ativos em uma única chamada.
- [Saldo em lote](#batch_balance): obtenha os saldos de vários ativos em uma única chamada.
- [Aprovação em lote](#batch_approval): aprove todos os tokens para um endereço.
- [Hooks](#receive_hook): hook para recebimento de tokens.
- [Suporte a NFT](#nft_support): se o fornecimento for de apenas 1, trate-o como um NFT.
- [Regras de transferência segura](#safe_transfer_rule): conjunto de regras para transferência segura.

### Transferências em lote {#batch-transfers}

As transferências em lote funcionam de forma muito semelhante às transferências regulares do ERC-20. Vejamos a função `transferFrom` regular do ERC-20:

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

A única diferença no ERC-1155 é que passamos os valores como um array e também passamos um array de ‘ids’. Por exemplo, dados `ids=[3, 6, 13]` e `values=[100, 200, 5]`, as transferências resultantes serão

1. Transferir 100 tokens com o id 3 de `_from` para `_to`.
2. Transferir 200 tokens com o id 6 de `_from` para `_to`.
3. Transferir 5 tokens com o id 13 de `_from` para `_to`.

No ERC-1155, só temos `transferFrom`, não `transfer`. Para usá-lo como um `transfer` regular, basta definir o endereço de origem como o endereço que está chamando a função.

### Saldo em lote {#batch-balance}

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

Ainda mais simples para a chamada de saldo, podemos recuperar saldos múltiplos em uma única chamada. Passamos a matriz de proprietários, seguida pela matriz dos IDs dos tokens.

Por exemplo, dados `_ids=[3, 6, 13]` e `_owners=[0xbeef..., 0x1337..., 0x1111...]`, o valor de retorno será

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### Aprovação em lote {#batch-approval}

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

As aprovações são um pouco diferentes do ERC-20. Em vez de aprovar valores específicos, você define um operador como aprovado ou não aprovado através do `setApprovalForAll`.

A leitura do status atual pode ser feita através do `isApprovedForAll`. Como você pode ver, é uma operação de tudo ou nada. Você não pode definir quantos tokens aprovar ou mesmo quais classes de token.

Isto é intencionalmente concebido pensando na simplicidade. Você só pode aprovar tudo para um endereço.

### Hook de recebimento {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

Com o suporte da [EIP-165](https://eips.ethereum.org/EIPS/eip-165), o ERC-1155 suporta hooks de recebimento apenas para contratos inteligentes. A função de hook deve retornar um valor mágico predefinido de 4 bytes que é dado como:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Quando o contrato de recebimento devolve este valor, assume-se que o contrato aceita a transferência e sabe como lidar com os tokens ERC-1155. Ótimo, nenhum token bloqueados em um contrato!

### Suporte a NFT {#nft-support}

Quando a oferta é apenas uma, o token é essencialmente um token não-fungível (NFT, pela sigla em inglês) E como é padrão para o ERC-721, você pode definir um URL de metadados. A URL pode ser lida e modificada pelos clientes, veja [aqui](https://eips.ethereum.org/EIPS/eip-1155#metadata).

### Regra de transferência segura {#safe-transfer-rule}

Já abordamos algumas regras de transferência segura nas explicações anteriores. Mas vamos analisar as regras mais importantes:

1. O chamador deve ser aprovado para gastar os tokens do endereço `_from` ou o chamador deve ser igual a `_from`.
2. A chamada de transferência deve ser revertida caso
   1. O endereço `_to` é 0.
   2. O comprimento de `_ids` não é o mesmo que o comprimento de `_values`.
   3. qualquer um dos saldos dos detentores de tokens em `_ids` for menor que as respectivas quantias em `_values` enviadas ao destinatário.
   4. ocorra qualquer outro erro.

_Nota_: Todas as funções em lote, incluindo o hook, também existem como versões sem lote. Isto é feito para fins de eficiência do gás, já que é provável que a transferência de apenas um ativo continue sendo a maneira habitualmente mais utilizada. Por simplificar as explicações, as deixamos de lado, incluindo as regras de transferência segura. Os nomes são idênticos, basta eliminar a palavra "lote".

## Leitura adicional {#further-reading}

- [EIP-1155: Padrão de múltiplos tokens](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: Documentos da OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155: Repositório do GitHub](https://github.com/enjin/erc-1155)
- [API de NFT da Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)
