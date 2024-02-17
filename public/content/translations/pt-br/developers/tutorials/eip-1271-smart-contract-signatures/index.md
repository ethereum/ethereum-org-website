---
title: "EIP-1271: Assinatura e verificação de contratos inteligentes"
description: Uma visão geral de geração de assinatura de contratos inteligentes e verificação com a EIP-1271. Também passaremos pela implementação da EIP-1271 usada no Safe (anteriormente Gnosis Safe) para fornecer um exemplo concreto de contrato inteligente para que desenvolvedores possam construir por cima dele.
author: Nathan H. Leung
lang: pt-br
tags:
  - "eip-1271"
  - "contratos inteligentes"
  - "verificando"
  - "assinatura"
skill: intermediate
published: 2023-01-12
---

A norma [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) permite a contratos inteligentes verificarem assinaturas.

Neste tutorial, forneceremos uma visão geral das assinaturas digitais, noções básicas sobre a EIP-1271, e a implementação específica da EIP-1271 usada pelo [Safe](https://safe.global/) (previamente Gnosis Safe). Tudo isso pode servir como ponto de partida para a implementação da EIP-1271 nos seus próprios contratos.

## O que é assinatura?

Nesse contexto, uma assinatura (mais precisamente, uma “assinatura digital”) é uma mensagem, acompanhada de um tipo de prova de que a mensagem veio de uma pessoa, remetente ou endereço específico.

Por exemplo, uma assinatura digital pode se parecer com isto:

1. Mensagem: “Quero me conectar a este website com minha carteira Ethereum.”
2. Assinante: Meu endereço é `0x000…`
3. Prova: Aqui está uma prova de que eu, `0x000…`, realmente criei esta mensagem inteira (isto é geralmente algo criptográfico).

É importante observar que uma assinatura digital inclui ambos, uma “mensagem” e uma “assinatura”.

Por quê? Por exemplo, se você me der um contrato para assinar, e eu retirar a página de assinatura e devolver somente a minha assinatura sem o resto do contrato, o contrato não seria válido.

Da mesma maneira, uma assinatura digital não significa nada sem uma mensagem associada!

## Por que a EIP-1271 existe?

Para criar uma assinatura digital para uso em blockchains baseados em Ethereum, você geralmente precisa de uma chave secreta que ninguém mais conhece. Isto é o que faz sua assinatura, sua (ninguém mais pode criar a mesma assinatura sem o conhecimento da chave secreta).

Sua conta Ethereum (ou seja, conta de propriedade externa / EOA) tem uma chave privada associada a ela quando um website ou dapp pergunta por sua assinatura (por exemplo: “Log in with Ethereum”).

Um app pode [verificar uma assinatura](https://docs.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum) que você criou usando uma biblioteca de terceiros, como ethers.js [sem conhecer sua chave privada](https://en.wikipedia.org/wiki/Public-key_cryptography) e estar confiante de que foi _você_ quem criou a assinatura.

> De fato, como as assinaturas digitais EOA usam criptografia de chave pública, elas podem ser geradas e verificadas **off-chain**! É assim que a votação em DAO sem gás funciona — em vez de submeter votos on-chain, as assinaturas digitais podem ser criadas e verificadas off-chain usando bibliotecas criptográficas.

Enquanto as contas EOA têm uma chave privada, as contas de contrato inteligente não têm nenhum tipo de chave privada ou secreta (portanto, “Entrar com Ethereum”, etc. não pode funcionar nativamente com contas de contratos inteligentes).

O problema que a EIP-1271 visa resolver: como podemos dizer que uma assinatura de contrato inteligente é válida se o contrato inteligente não tem um “segredo” que ele possa incorporar na assinatura?

## Como a EIP-1271 funciona?

Contratos inteligentes não têm chaves privadas que possam ser usadas para assinar mensagens. Então, como podemos saber se uma assinatura é autêntica?

Bem, uma ideia é que podemos _perguntar_ ao contrato inteligente se uma assinatura é autêntica!

O que o EIP-1271 faz é padronizar a ideia de "perguntar" ao contrato inteligente se uma dada assinatura é válida.

Um contrato que implementa EIP-1271 deve ter uma função chamada `isValidSignature` que recebe a mensagem e a assinatura. O contrato pode então executar alguma lógica de validação (a especificação não força nada específico aqui) e então retornar um valor indicando se a assinatura é válida ou não.

Se `isValidSignature` retornar um resultado válido, isso é basicamente o contrato dizendo “sim, eu aprovo esta assinatura + mensagem!”

### Interface

Aqui está a interface exata na especificação da EIP-1271 (falaremos sobre o parâmetro `_hash` abaixo, mas por enquanto, pense nele como a mensagem que está sendo verificada):

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Should return whether the signature provided is valid for the provided hash
   * @param _hash      Hash of the data to be signed
   * @param _signature Signature byte array associated with _hash
   *
   * MUST return the bytes4 magic value 0x1626ba7e when function passes.
   * MUST NOT modify state (using STATICCALL for solc < 0.5, view modifier for solc > 0.5)
   * MUST allow external calls
   */
  function isValidSignature(
    bytes32 _hash,
    bytes memory _signature)
    public
    view
    returns (bytes4 magicValue);
}
```

## Exemplo de implementação da EIP-1271: Safe

Os contratos podem implementar `isValidSignature` de várias maneiras — a especificação somente não diz muito sobre a implementação exata.

Um contrato importante que implementa a EIP-1271 é o Safe (anteriormente Gnosis Safe).

No código do Safe, `isValidSignature` [ é implementada](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol) para que assinaturas possam ser criadas e verificadas de [duas maneiras](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support):

1. Mensagens on-chain
   1. Criação: um proprietário Safe cria uma nova transação Safe para “assinar” a mensagem, passando a mensagem como um dado na transação. Uma vez que proprietários suficientes assinam a transação para alcançar o limite multisig, a transação é enviada e executada. Na transação, há uma função Safe chamada, que adiciona a mensagem à lista de mensagens “aprovadas”.
   2. Verificação: chame `isValidSignature` no contrato Safe, e transmita a mensagem para verificar enquanto parâmetro da mensagem e [ um parâmetro vazio como parâmetro da assinatura](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (i.e. `0x`). O Safe verá que o parâmetro da assinatura está vazio e, em vez de verificar a assinatura criptograficamente, ele saberá que deve prosseguir e verificar se a mensagem está na lista de mensagens “aprovadas”.
2. Mensagens off-chain:
   1. Criação: um proprietário Safe cria uma mensagem off-chain, e então consegue outros proprietários Safe para assinar a mensagem, cada um individualmente, até que haja assinaturas suficientes para conseguir a aprovação pelo limite do multisig.
   2. Verificação: chama `isValidSignature`. No parâmetro da mensagem, passa a mensagem para ser verificada. No parâmetro da assinatura, passa cada assinatura individual de proprietário Safe todas concatenadas juntas. O Safe irá checar que há assinaturas suficientes para atingir o limite **e** que cada assinatura é válida. Acontecendo isso, ele retornará um valor indicando verificação da assinatura com sucesso.

## O que é exatamente o parâmetro `_hash`? Por que não passar a mensagem inteira?

Você pode ter notado que a função `isValidSignature` na interface [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) não pega a mensagem propriamente dita, mas, em vezés disso, um parâmetro `_hash`. O que isto significa é que ao invés de passar a mensagem inteira de tamanho arbitrário para `isValidSignature`, nós passamos um hash de 32-bytes da mensagem (geralmente keccak256).

Cada byte de calldata — ou seja, dados de parâmetro da função passados para uma função de contrato inteligente — [custa16 gás (4 gás se zero byte)](https://eips.ethereum.org/EIPS/eip-2028), então, isso pode economizar um monte de gás se a mensagem for longa.

### Especificações EIP-1271 anteriores

Existem outras especificações EIP-1271 por aí, que têm uma função `isValidSignature` com um primeiro parâmetro do tipo `bytes` (tamanho arbitrário, em vez de tamanho fixo `bytes32`) e nome de parâmetro `message`. Essa é uma [versão mais antiga](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206) da norma EIP-1271.

## Como o EIP-1271 poderia ser implementado nos meus próprios contratos?

A especificação é bem aberta aqui. A implementação Safe tem algumas boas ideias:

- Você pode considerar assinaturas EOA do "proprietário" do contrato serem válidas.
- Você poderia armazenar uma lista de mensagens aprovadas e somente considerar estas serem válidas.

No final, depende de você, como desenvolvedor do contrato!

## Conclusão

A [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) é uma norma versátil que permite contratos inteligentes verificar assinaturas. Ele abre a porta para contratos inteligentes que funcionam mais como EOAs - por exemplo fornecendo uma maneira de se "conectar via Ethereum" para trabalhar com contratos inteligentes - e ele pode ser implementado de várias maneiras (Safe tendo uma implementação interessante e não trivial a se considerar).
