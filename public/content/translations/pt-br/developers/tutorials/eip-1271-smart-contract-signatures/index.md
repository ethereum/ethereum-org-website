---
title: "EIP-1271: Assinatura e verificação de contratos inteligentes"
description: "Uma visão geral de geração de assinatura de contratos inteligentes e verificação com a EIP-1271. Também passaremos pela implementação da EIP-1271 usada no Safe (anteriormente Gnosis Safe) para fornecer um exemplo concreto de contrato inteligente para que desenvolvedores possam construir por cima dele."
author: Nathan H. Leung
lang: pt-br
tags:
  [
    "eip-1271",
    "smart contracts",
    "verificando",
    "signing"
  ]
skill: intermediate
published: 2023-01-12
---

O padrão [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) permite que contratos inteligentes verifiquem assinaturas.

Neste tutorial, damos uma visão geral de assinaturas digitais, o histórico do EIP-1271 e a implementação específica do EIP-1271 usada pelo [Safe](https://safe.global/) (anteriormente Gnosis Safe). Tudo isso pode servir como ponto de partida para a implementação da EIP-1271 nos seus próprios contratos.

## O que é assinatura?

Nesse contexto, uma assinatura (mais precisamente, uma “assinatura digital”) é uma mensagem, acompanhada de um tipo de prova de que a mensagem veio de uma pessoa, remetente ou endereço específico.

Por exemplo, uma assinatura digital pode se parecer com isto:

1. Mensagem: “Quero me conectar a este website com minha carteira Ethereum.”
2. Assinante: Meu endereço é `0x000…`
3. Prova: aqui está uma prova de que eu, `0x000…`, realmente criei esta mensagem inteira (geralmente é algo criptográfico).

É importante observar que uma assinatura digital inclui ambos, uma “mensagem” e uma “assinatura”.

Por quê? Por exemplo, se você me der um contrato para assinar, e eu retirar a página de assinatura e devolver somente a minha assinatura sem o resto do contrato, o contrato não seria válido.

Da mesma maneira, uma assinatura digital não significa nada sem uma mensagem associada!

## Por que a EIP-1271 existe?

Para criar uma assinatura digital para uso em blockchains baseados em Ethereum, você geralmente precisa de uma chave secreta que ninguém mais conhece. Isto é o que faz sua assinatura, sua (ninguém mais pode criar a mesma assinatura sem o conhecimento da chave secreta).

Sua conta Ethereum (ou seja, sua conta de propriedade externa/EOA) tem uma chave privada associada a ela, e essa é a chave privada que normalmente é usada quando um site ou dapp solicita sua assinatura (por exemplo, para “Fazer login com a Ethereum”).

Um aplicativo pode [verificar uma assinatura](https://www.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum) que você cria usando uma biblioteca de terceiros como o ethers.js [sem saber sua chave privada](https://en.wikipedia.org/wiki/Public-key_cryptography) e ter a certeza de que foi _você_ quem criou a assinatura.

> Na verdade, como as assinaturas digitais de EOA usam criptografia de chave pública, elas podem ser geradas e verificadas **fora da cadeia**! É assim que a votação em DAO sem gás funciona — em vez de enviar votos na cadeia, as assinaturas digitais podem ser criadas e verificadas fora da cadeia usando bibliotecas criptográficas.

Enquanto as contas EOA têm uma chave privada, as contas de contrato inteligente não têm nenhum tipo de chave privada ou secreta (portanto, “Entrar com Ethereum”, etc. não pode funcionar nativamente com contas de contratos inteligentes).

O problema que a EIP-1271 visa resolver: como podemos dizer que uma assinatura de contrato inteligente é válida se o contrato inteligente não tem um “segredo” que ele possa incorporar na assinatura?

## Como a EIP-1271 funciona?

Contratos inteligentes não têm chaves privadas que possam ser usadas para assinar mensagens. Então, como podemos saber se uma assinatura é autêntica?

Bem, uma ideia é que podemos simplesmente _perguntar_ ao contrato inteligente se uma assinatura é autêntica!

O que o EIP-1271 faz é padronizar a ideia de "perguntar" ao contrato inteligente se uma dada assinatura é válida.

Um contrato que implementa o EIP-1271 deve ter uma função chamada `isValidSignature` que recebe uma mensagem e uma assinatura. O contrato pode então executar alguma lógica de validação (a especificação não força nada específico aqui) e então retornar um valor indicando se a assinatura é válida ou não.

Se `isValidSignature` retornar um resultado válido, é basicamente o contrato dizendo: “sim, eu aprovo esta assinatura + mensagem!”

### Interface

Aqui está a interface exata na especificação do EIP-1271 (falaremos sobre o parâmetro `_hash` abaixo, mas, por enquanto, pense nele como a mensagem que está sendo verificada):

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Deve retornar se a assinatura fornecida é válida para o hash fornecido
   * @param _hash      Hash dos dados a serem assinados
   * @param _signature Array de bytes de assinatura associado a _hash
   *
   * DEVE retornar o valor mágico bytes4 0x1626ba7e quando a função for bem-sucedida.
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

## Exemplo de implementação da EIP-1271: Safe

Os contratos podem implementar `isValidSignature` de muitas maneiras — a especificação não diz muito sobre a implementação exata.

Um contrato importante que implementa a EIP-1271 é o Safe (anteriormente Gnosis Safe).

No código do Safe, `isValidSignature` [é implementado](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol) para que as assinaturas possam ser criadas e verificadas de [duas maneiras](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support):

1. Mensagens na cadeia
   1. Criação: um proprietário Safe cria uma nova transação Safe para “assinar” a mensagem, passando a mensagem como um dado na transação. Uma vez que proprietários suficientes assinam a transação para alcançar o limite multisig, a transação é enviada e executada. Na transação, há uma função do Safe chamada (`signMessage(bytes calldata _data)`) que adiciona a mensagem a uma lista de mensagens “aprovadas”.
   2. Verificação: chame `isValidSignature` no contrato Safe e passe a mensagem a ser verificada como o parâmetro da mensagem e [um valor vazio para o parâmetro da assinatura](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (ou seja, `0x`). O Safe verá que o parâmetro da assinatura está vazio e, em vez de verificar a assinatura criptograficamente, ele saberá que deve prosseguir e verificar se a mensagem está na lista de mensagens “aprovadas”.
2. Mensagens fora da cadeia:
   1. Criação: um proprietário do Safe cria uma mensagem fora da cadeia, em seguida, faz com que outros proprietários do Safe assinem a mensagem individualmente, até que haja assinaturas suficientes para atingir o limite de aprovação da multisig.
   2. Verificação: chame `isValidSignature`. No parâmetro da mensagem, passa a mensagem para ser verificada. No parâmetro da assinatura, passa cada assinatura individual de proprietário Safe todas concatenadas juntas. O Safe verificará se há assinaturas suficientes para atingir o limite **e** se cada assinatura é válida. Acontecendo isso, ele retornará um valor indicando verificação da assinatura com sucesso.

## O que é exatamente o parâmetro `_hash`? Por que não passar a mensagem inteira?

Você deve ter notado que a função `isValidSignature` na [interface do EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) não recebe a mensagem em si, mas sim um parâmetro `_hash`. O que isso significa é que, em vez de passar a mensagem completa de tamanho arbitrário para `isValidSignature`, nós passamos um hash de 32 bytes da mensagem (geralmente keccak256).

Cada byte de calldata — ou seja, dados de parâmetro de função passados para uma função de contrato inteligente — [custa 16 de gás (4 de gás se for um byte zero)](https://eips.ethereum.org/EIPS/eip-2028), então isso pode economizar muito gás se uma mensagem for longa.

### Especificações EIP-1271 anteriores

Existem especificações EIP-1271 por aí que têm uma função `isValidSignature` com um primeiro parâmetro do tipo `bytes` (comprimento arbitrário, em vez de um `bytes32` de comprimento fixo) e o nome de parâmetro `message`. Esta é uma [versão mais antiga](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206) do padrão EIP-1271.

## Como o EIP-1271 poderia ser implementado nos meus próprios contratos?

A especificação é bem aberta aqui. A implementação Safe tem algumas boas ideias:

- Você pode considerar assinaturas EOA do "proprietário" do contrato serem válidas.
- Você poderia armazenar uma lista de mensagens aprovadas e somente considerar estas serem válidas.

No final, depende de você, como desenvolvedor do contrato!

## Conclusão

O [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) é um padrão versátil que permite que contratos inteligentes verifiquem assinaturas. Ele abre a porta para contratos inteligentes que funcionam mais como EOAs - por exemplo fornecendo uma maneira de se "conectar via Ethereum" para trabalhar com contratos inteligentes - e ele pode ser implementado de várias maneiras (Safe tendo uma implementação interessante e não trivial a se considerar).
