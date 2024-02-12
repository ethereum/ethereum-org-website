---
title: Padrão Multi-Token ERC-1155
description: Token
lang: pt-br
---

## Introdução {#introduction}

Uma interface padrão para contratos que gerenciam vários tipos de tokens. Um único contrato implementado pode incluir qualquer combinação de tokens fungíveis, tokens não fungíveis ou outras configurações, por exemplo, tokens semifungíveis.

**O que se entende por padrão Multi-Token?**

A ideia é simples e trata-se de criar uma interface de contratos inteligentes que possa representar e controlar qualquer número de tipos de token, fungíveis ou não fungíveis. Dessa forma, o token ERC-1155 pode fazer as mesmas funções que um token [ERC-20](/developers/docs/standards/tokens/erc-20/) ou um token [ERC-721](/developers/docs/standards/tokens/erc-721/), ou ainda as duas funções simultaneamente. Ele melhora a funcionalidade de ambos os padrões ERC-20 e ERC-721, tornando-os mais eficientes e corrigindo erros óbvios de implementação.

O token ERC-1155 é descrito com profundidade em [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155).

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, recomendamos ler primeiro sobre [padrões de token](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) e [ERC-721](/developers/docs/standards/tokens/erc-721/).

## Funções e características do ERC-1155: {#body}

- [Transferências em lote](#batch_transfers): transfira vários ativos em uma única chamada.
- [Saldo em lote](#batch_balance): obtenha os saldos de vários ativos em uma única chamada.
- [Aprovação em lote](#batch_approval): aprove todos os tokens de um endereço.
- [Hooks](#recieve_hook): receba hook de tokens.
- [Suporte para NFT](#nft_support): se a cunhagem for de apenas 1, tratar como NFT.
- [Regras de transferência segura](#safe_transfer_rule): conjunto de regras para transferências seguras.

### Transferências em lote {#batch-transfers}

As transferências em lote funcionam de forma muito semelhante às transferências regulares do ERC-20. Vejamos a função `transferFrom` da ERC-20 habitual:

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

A única diferença no ERC-1155 é que passamos os valores como um array e também passamos um array de ‘ids’. Por exemplo, dadas as matrizes `ids=[3, 6, 13]` e `values=[100, 200, 5]`, as transferências resultantes serão

1. Transferir 100 tokens da ID 3 de `_from` para `_to`.
2. Transferir 200 tokens da ID 6 de `_from` para `_to`.
3. Transferir 5 tokens da ID 13 de `_from` to `_to`.

No ERC-1155, só temos `transferFrom`, ou seja, não há `transfer`. Para usá-lo como uma transferência regular, ou `transfer`, defina o endereço de origem como o endereço que está chamando a função.

### Saldo em lote {#batch-balance}

A respectiva chamada `balanceOf` do ERC-20 também tem sua função parceira com suporte para lotes. Como lembrete, esta é a versão do ERC-20:

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

Por exemplo, dado `_ids=[3, 6, 13]` e `_owners=[0xbeef..., 0x1337..., 0x11...]`, o valor de retorno será

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

As aprovações são um pouco diferentes do ERC-20. Em vez de aprovar valores específicos, você define um operador para aprovados ou não aprovados via `setApprovalForAll`.

Ler o status atual pode ser feito via `isApprovedForAll`. Como você pode ver, é uma operação de tudo ou nada. Você não pode definir quantos tokens aprovar ou mesmo quais classes de token.

Isto é intencionalmente concebido pensando na simplicidade. Você só pode aprovar tudo para um endereço.

### Receber hooks {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

Dado o suporte da [EIP-165](https://eips.ethereum.org/EIPS/eip-165), o ERC-1155 pode receber hooks apenas por contratos inteligentes. A função de hook deve retornar um valor mágico predefinido de 4 bytes que é dado como:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Quando o contrato de recebimento devolve este valor, assume-se que o contrato aceita a transferência e sabe como lidar com os tokens ERC-1155. Ótimo, nenhum token bloqueados em um contrato!

### Suporte para NFTs {#nft-support}

Quando a oferta é apenas uma, o token é essencialmente um token não-fungível (NFT, pela sigla em inglês) E como é padrão para o ERC-721, você pode definir um URL de metadados. Esse URL pode ser lido e modificado pelos clientes; veja [aqui](https://eips.ethereum.org/EIPS/eip-1155#metadata).

### Regra de transferência segura {#safe-transfer-rule}

Já abordamos algumas regras de transferência segura nas explicações anteriores. Mas vamos analisar as regras mais importantes:

1. O chamador deve ser aprovado para gastar os tokens para o endereço `_from` ou o chamador deve ser igual ao endereço `_from`.
2. A chamada de transferência deve ser revertida caso
   1. o enderaço `_to` seja 0.
   2. o comprimento dos `_ids` não seja o mesmo que o comprimento dos `_values`.
   3. qualquer um do saldos dos titulares dos tokens em `_ids` seja menor que as respectivas quantidades em `_values` enviados para o destinatário.
   4. ocorra qualquer outro erro.

_Nota_: Todas as funções por lotes, incluindo o hook, também existem como versões sem lotes. Isto é feito para fins de eficiência do gás, já que é provável que a transferência de apenas um ativo continue sendo a maneira habitualmente mais utilizada. Por simplificar as explicações, as deixamos de lado, incluindo as regras de transferência segura. Os nomes são idênticos, basta eliminar a palavra "lote".

## Leitura adicional {#further-reading}

- [EIP-1155: Padrão Multi-Token](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: Documentos da Openzeppelin](https://docs.openzeppelin.com/contracts/3.x/erc1155)
- [ERC-1155: Repositório no GitHub](https://github.com/enjin/erc-1155)
- [NFT API do Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
