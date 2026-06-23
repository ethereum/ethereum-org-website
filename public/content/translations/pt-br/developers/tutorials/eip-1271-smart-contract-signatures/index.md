---
title: "EIP-1271: Assinando e verificando assinaturas de contratos inteligentes"
description: "Uma visão geral da geração e verificação de assinaturas de contratos inteligentes com a EIP-1271. Também analisamos a implementação da EIP-1271 usada no Safe (anteriormente Gnosis Safe) para fornecer um exemplo concreto para os desenvolvedores de contratos inteligentes se basearem."
author: Nathan H. Leung
lang: pt-br
tags: ["eip-1271", "contratos inteligentes", "verificação", "assinatura"]
skill: intermediate
breadcrumb: Assinaturas EIP-1271
published: 2023-01-12
---

O padrão [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) permite que contratos inteligentes verifiquem assinaturas.

Neste tutorial, damos uma visão geral das assinaturas digitais, do contexto da EIP-1271 e da implementação específica da EIP-1271 usada pelo [Safe](https://safe.global/) (anteriormente Gnosis Safe). Tudo isso, em conjunto, pode servir como um ponto de partida para implementar a EIP-1271 em seus próprios contratos.

## O que é uma assinatura? {#what-is-a-signature}

Neste contexto, uma assinatura (mais precisamente, uma "assinatura digital") é uma mensagem mais algum tipo de prova de que a mensagem veio de uma pessoa/remetente/endereço específico.

Por exemplo, uma assinatura digital pode ser assim:

1. Mensagem: "Quero fazer login neste site com minha carteira Ethereum."
2. Signatário: Meu endereço é `0x000…`
3. Prova: Aqui está uma prova de que eu, `0x000…`, realmente criei toda essa mensagem (isso geralmente é algo criptográfico).

É importante notar que uma assinatura digital inclui tanto uma "mensagem" quanto uma "assinatura".

Por quê? Por exemplo, se você me desse um contrato para assinar e, em seguida, eu cortasse a página de assinatura e devolvesse apenas minhas assinaturas sem o resto do contrato, o contrato não seria válido.

Da mesma forma, uma assinatura digital não significa nada sem uma mensagem associada!

## Por que a EIP-1271 existe? {#why-does-eip-1271-exist}

Para criar uma assinatura digital para uso em blockchains baseadas no Ethereum, você geralmente precisa de uma chave privada secreta que ninguém mais conhece. É isso que torna a sua assinatura, sua (ninguém mais pode criar a mesma assinatura sem o conhecimento da chave secreta).

Sua conta Ethereum (ou seja, sua conta de propriedade externa/EOA) tem uma chave privada associada a ela, e essa é a chave privada que normalmente é usada quando um site ou aplicativo descentralizado (dapp) pede uma assinatura (por exemplo, para "Fazer login com Ethereum").

Um aplicativo pode [verificar uma assinatura](https://www.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum) que você cria usando uma biblioteca de terceiros como Ethers.js [sem saber sua chave privada](https://en.wikipedia.org/wiki/Public-key_cryptography) e ter certeza de que _você_ foi quem criou a assinatura.

> De fato, como as assinaturas digitais de EOA usam criptografia de chave pública, elas podem ser geradas e verificadas **offchain**! É assim que funciona a votação sem gás em DAOs — em vez de enviar votos onchain, as assinaturas digitais podem ser criadas e verificadas offchain usando bibliotecas criptográficas.

Embora as contas EOA tenham uma chave privada, as contas de contratos inteligentes não têm nenhum tipo de chave privada ou secreta (portanto, "Fazer login com Ethereum", etc., não pode funcionar nativamente com contas de contratos inteligentes).

O problema que a EIP-1271 visa resolver: como podemos saber se uma assinatura de contrato inteligente é válida se o contrato inteligente não tem nenhum "segredo" que possa incorporar à assinatura?

## Como a EIP-1271 funciona? {#how-does-eip-1271-work}

Contratos inteligentes não têm chaves privadas que possam ser usadas para assinar mensagens. Então, como podemos saber se uma assinatura é autêntica?

Bem, uma ideia é que podemos simplesmente _perguntar_ ao contrato inteligente se uma assinatura é autêntica!

O que a EIP-1271 faz é padronizar essa ideia de "perguntar" a um contrato inteligente se uma determinada assinatura é válida.

Um contrato que implementa a EIP-1271 deve ter uma função chamada `isValidSignature` que recebe uma mensagem e uma assinatura. O contrato pode então executar alguma lógica de validação (a especificação não impõe nada específico aqui) e, em seguida, retornar um valor indicando se a assinatura é válida ou não.

Se `isValidSignature` retornar um resultado válido, é basicamente o contrato dizendo "sim, eu aprovo esta assinatura + mensagem!"

### Interface {#interface}

Aqui está a interface exata na especificação da EIP-1271 (falaremos sobre o parâmetro `_hash` abaixo, mas por enquanto, pense nele como a mensagem que está sendo verificada):

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Deve retornar se a assinatura fornecida é válida para o hash fornecido
   * @param _hash      Hash dos dados a serem assinados
   * @param _signature Array de bytes da assinatura associada ao _hash
   *
   * DEVE retornar o valor mágico bytes4 0x1626ba7e quando a função passar.
   * NÃO DEVE modificar o estado (usando STATICCALL para solc < 0.5, modificador view para solc > 0.5)
   * DEVE permitir chamadas externas
   */
  function isValidSignature(
    bytes32 _hash,
    bytes memory _signature)
    public
    view
    returns (bytes4 magicValue);
}
```

## Exemplo de implementação da EIP-1271: Safe {#example-eip-1271-implementation-safe}

Os contratos podem implementar `isValidSignature` de várias maneiras — a especificação não diz muito sobre a implementação exata.

Um contrato notável que implementa a EIP-1271 é o Safe (anteriormente Gnosis Safe).

No código do Safe, `isValidSignature` [é implementado](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol) de forma que as assinaturas possam ser criadas e verificadas de [duas maneiras](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support):

1. Mensagens onchain
   1. Criação: um proprietário do cofre (safe) cria uma nova transação do cofre para "assinar" uma mensagem, passando a mensagem como dados para a transação. Quando proprietários suficientes assinarem a transação para atingir o limite da multisig, a transação é transmitida e executada. Na transação, há uma função do cofre chamada (`signMessage(bytes calldata _data)`) que adiciona a mensagem a uma lista de mensagens "aprovadas".
   2. Verificação: chame `isValidSignature` no contrato do Safe e passe a mensagem a ser verificada como o parâmetro da mensagem e [um valor vazio para o parâmetro da assinatura](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (ou seja, `0x`). O Safe verá que o parâmetro da assinatura está vazio e, em vez de verificar criptograficamente a assinatura, saberá que deve apenas prosseguir e verificar se a mensagem está na lista de mensagens "aprovadas".
2. Mensagens offchain:
   1. Criação: um proprietário do cofre cria uma mensagem offchain e, em seguida, faz com que outros proprietários do cofre assinem a mensagem individualmente até que haja assinaturas suficientes para superar o limite de aprovação da multisig.
   2. Verificação: chame `isValidSignature`. No parâmetro da mensagem, passe a mensagem a ser verificada. No parâmetro da assinatura, passe as assinaturas individuais de cada proprietário do cofre, todas concatenadas juntas, uma após a outra. O Safe verificará se há assinaturas suficientes para atingir o limite **e** se cada assinatura é válida. Se sim, ele retornará um valor indicando a verificação bem-sucedida da assinatura.

## O que exatamente é o parâmetro `_hash`? Por que não passar a mensagem inteira? {#what-exactly-is-the-hash-parameter-why-not-pass-the-whole-message}

Você deve ter notado que a função `isValidSignature` na [interface da EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) não recebe a mensagem em si, mas sim um parâmetro `_hash`. O que isso significa é que, em vez de passar a mensagem completa de comprimento arbitrário para `isValidSignature`, passamos um hash de 32 bytes da mensagem (geralmente keccak256).

Cada byte de dados de chamada (calldata) — ou seja, dados de parâmetros de função passados para uma função de contrato inteligente — [custa 16 de gás (4 de gás se for um byte zero)](https://eips.ethereum.org/EIPS/eip-2028), então isso pode economizar muito gás se uma mensagem for longa.

### Especificações anteriores da EIP-1271 {#previous-eip-1271-specifications}

Existem especificações da EIP-1271 na prática que têm uma função `isValidSignature` com um primeiro parâmetro do tipo `bytes` (comprimento arbitrário, em vez de um `bytes32` de comprimento fixo) e nome de parâmetro `message`. Esta é uma [versão mais antiga](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206) do padrão EIP-1271.

## Como a EIP-1271 deve ser implementada em meus próprios contratos? {#how-should-eip-1271-be-implemented-in-my-own-contracts}

A especificação é muito aberta aqui. A implementação do Safe tem algumas boas ideias:

- Você pode considerar válidas as assinaturas de EOA do "proprietário" do contrato.
- Você pode armazenar uma lista de mensagens aprovadas e considerar apenas essas como válidas.

No final, a decisão é sua como desenvolvedor do contrato!

## Conclusão {#conclusion}

A [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) é um padrão versátil que permite que contratos inteligentes verifiquem assinaturas. Ela abre as portas para que os contratos inteligentes atuem mais como EOAs — por exemplo, fornecendo uma maneira de o "Fazer login com Ethereum" funcionar com contratos inteligentes — e pode ser implementada de várias maneiras (o Safe tem uma implementação não trivial e interessante a ser considerada).