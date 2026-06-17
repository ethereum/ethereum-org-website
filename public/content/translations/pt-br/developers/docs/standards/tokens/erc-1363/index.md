---
title: "Padrão de Token Pagável ERC-1363"
description: "O ERC-1363 é uma interface de extensão para tokens ERC-20 que suporta a execução de lógica personalizada em um contrato receptor após transferências, ou em um contrato gastador após aprovações, tudo dentro de uma única transação."
lang: pt-br
---

## Introdução {#introduction}

### O que é o ERC-1363? {#what-is-erc1363}

O ERC-1363 é uma interface de extensão para tokens ERC-20 que suporta a execução de lógica personalizada em um contrato receptor após transferências, ou em um contrato gastador após aprovações, tudo dentro de uma única transação.

### Diferenças em relação ao ERC-20 {#erc20-differences}

Operações padrão do ERC-20, como `transfer`, `transferFrom` e `approve`, não permitem a execução de código no contrato receptor ou gastador sem uma transação separada.
Isso introduz complexidade no desenvolvimento de interfaces de usuário (UI) e atrito na adoção, porque os usuários devem esperar que a primeira transação seja executada para então enviar a segunda.
Eles também devem pagar gás duas vezes.

O ERC-1363 torna os tokens fungíveis capazes de realizar ações mais facilmente e funcionar sem o uso de qualquer ouvinte offchain.
Ele permite fazer um callback em um contrato receptor ou gastador, após uma transferência ou uma aprovação, em uma única transação.

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, recomendamos que você leia primeiro sobre:

- [Padrões de token](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Corpo {#body}

O ERC-1363 introduz uma API padrão para tokens ERC-20 interagirem com contratos inteligentes após `transfer`, `transferFrom` ou `approve`.

Este padrão fornece funcionalidade básica para transferir tokens, bem como permitir que tokens sejam aprovados para que possam ser gastos por outro terceiro onchain, e então fazer um callback no contrato receptor ou gastador.

Existem muitos usos propostos de contratos inteligentes que podem aceitar callbacks ERC-20.

Exemplos podem ser:

- **Crowdsales**: tokens enviados acionam a alocação instantânea de recompensa.
- **Serviços**: o pagamento ativa o acesso ao serviço em uma única etapa.
- **Faturas**: tokens liquidam faturas automaticamente.
- **Assinaturas**: aprovar a taxa anual ativa a assinatura no pagamento do primeiro mês.

Por essas razões, foi originalmente chamado de **"Token Pagável"** ("Payable Token").

O comportamento de callback expande ainda mais sua utilidade, permitindo interações contínuas como:

- **Staking**: tokens transferidos acionam o bloqueio automático em um contrato de staking.
- **Votação**: tokens recebidos registram votos em um sistema de governança.
- **Troca**: aprovações de token ativam a lógica de troca em uma única etapa.

Tokens ERC-1363 podem ser usados para utilidades específicas em todos os casos que exigem que um callback seja executado após uma transferência ou uma aprovação recebida.
O ERC-1363 também é útil para evitar a perda de tokens ou o bloqueio de tokens em contratos inteligentes, verificando a capacidade do receptor de lidar com tokens.

Diferente de outras propostas de extensão do ERC-20, o ERC-1363 não substitui os métodos `transfer` e `transferFrom` do ERC-20 e define os IDs de interfaces a serem implementados mantendo a compatibilidade com versões anteriores do ERC-20.

Do [EIP-1363](https://eips.ethereum.org/EIPS/eip-1363):

### Métodos {#methods}

Contratos inteligentes que implementam o padrão ERC-1363 **DEVEM** implementar todas as funções na interface `ERC1363`, bem como as interfaces `ERC20` e `ERC165`.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev Uma interface de extensão para tokens ERC-20 que suporta a execução de código em um contrato destinatário
 * após `transfer` ou `transferFrom`, ou código em um contrato gastador após `approve`, em uma única transação.
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * NOTE: o identificador ERC-165 para esta interface é 0xb0202a11.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev Move uma quantidade `value` de tokens da conta do chamador para `to`
   * e então chama `ERC1363Receiver::onTransferReceived` em `to`.
   * @param to O endereço para o qual os tokens estão sendo transferidos.
   * @param value A quantidade de tokens a ser transferida.
   * @return Um valor booleano indicando que a operação foi bem-sucedida, a menos que lance uma exceção.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev Move uma quantidade `value` de tokens da conta do chamador para `to`
   * e então chama `ERC1363Receiver::onTransferReceived` em `to`.
   * @param to O endereço para o qual os tokens estão sendo transferidos.
   * @param value A quantidade de tokens a ser transferida.
   * @param data Dados adicionais sem formato especificado, enviados na chamada para `to`.
   * @return Um valor booleano indicando que a operação foi bem-sucedida, a menos que lance uma exceção.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Move uma quantidade `value` de tokens de `from` para `to` usando o mecanismo de permissão
   * e então chama `ERC1363Receiver::onTransferReceived` em `to`.
   * @param from O endereço do qual enviar os tokens.
   * @param to O endereço para o qual os tokens estão sendo transferidos.
   * @param value A quantidade de tokens a ser transferida.
   * @return Um valor booleano indicando que a operação foi bem-sucedida, a menos que lance uma exceção.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev Move uma quantidade `value` de tokens de `from` para `to` usando o mecanismo de permissão
   * e então chama `ERC1363Receiver::onTransferReceived` em `to`.
   * @param from O endereço do qual enviar os tokens.
   * @param to O endereço para o qual os tokens estão sendo transferidos.
   * @param value A quantidade de tokens a ser transferida.
   * @param data Dados adicionais sem formato especificado, enviados na chamada para `to`.
   * @return Um valor booleano indicando que a operação foi bem-sucedida, a menos que lance uma exceção.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Define uma quantidade `value` de tokens como a permissão de `spender` sobre os tokens do chamador
   * e então chama `ERC1363Spender::onApprovalReceived` em `spender`.
   * @param spender O endereço que gastará os fundos.
   * @param value A quantidade de tokens a ser gasta.
   * @return Um valor booleano indicando que a operação foi bem-sucedida, a menos que lance uma exceção.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev Define uma quantidade `value` de tokens como a permissão de `spender` sobre os tokens do chamador
   * e então chama `ERC1363Spender::onApprovalReceived` em `spender`.
   * @param spender O endereço que gastará os fundos.
   * @param value A quantidade de tokens a ser gasta.
   * @param data Dados adicionais sem formato especificado, enviados na chamada para `spender`.
   * @return Um valor booleano indicando que a operação foi bem-sucedida, a menos que lance uma exceção.
   */
  function approveAndCall(address spender, uint256 value, bytes calldata data) external returns (bool);
}

interface ERC20 {
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
  function transfer(address to, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function approve(address spender, uint256 value) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
}

interface ERC165 {
  function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
```

Um contrato inteligente que deseja aceitar tokens ERC-1363 via `transferAndCall` ou `transferFromAndCall` **DEVE** implementar a interface `ERC1363Receiver`:

```solidity
/**
 * @title ERC1363Receiver
 * @dev Interface para qualquer contrato que queira suportar `transferAndCall` ou `transferFromAndCall` de contratos de token ERC-1363.
 */
interface ERC1363Receiver {
  /**
   * @dev Sempre que tokens ERC-1363 são transferidos para este contrato via `ERC1363::transferAndCall` ou `ERC1363::transferFromAndCall`
   * por `operator` a partir de `from`, esta função é chamada.
   *
   * NOTA: Para aceitar a transferência, isso deve retornar
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (ou seja, 0x88a7ca5c, ou seu próprio seletor de função).
   *
   * @param operator O endereço que chamou a função `transferAndCall` ou `transferFromAndCall`.
   * @param from O endereço do qual os tokens são transferidos.
   * @param value A quantidade de tokens transferida.
   * @param data Dados adicionais sem formato especificado.
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` se a transferência for permitida, a menos que lance uma exceção.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

Um contrato inteligente que deseja aceitar tokens ERC-1363 via `approveAndCall` **DEVE** implementar a interface `ERC1363Spender`:

```solidity
/**
 * @title ERC1363Spender
 * @dev Interface para qualquer contrato que queira suportar `approveAndCall` de contratos de token ERC-1363.
 */
interface ERC1363Spender {
  /**
   * @dev Sempre que um `owner` de tokens ERC-1363 aprova este contrato via `ERC1363::approveAndCall`
   * para gastar seus tokens, esta função é chamada.
   *
   * NOTA: Para aceitar a aprovação, isso deve retornar
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (ou seja, 0x7b04a2d0, ou seu próprio seletor de função).
   *
   * @param owner O endereço que chamou a função `approveAndCall` e anteriormente possuía os tokens.
   * @param value A quantidade de tokens a ser gasta.
   * @param data Dados adicionais sem formato especificado.
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` se a aprovação for permitida, a menos que lance uma exceção.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## Leitura adicional {#further-reading}

- [ERC-1363: Padrão de Token Pagável](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: Repositório no GitHub](https://github.com/vittominacori/erc1363-payable-token)