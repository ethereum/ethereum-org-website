---
title: Padrão de token ERC-777
description: Saiba mais sobre o ERC-777, um padrão de token fungível aprimorado com ganchos, embora o ERC-20 seja recomendado por questões de segurança.
lang: pt-br
---

## Aviso {#warning}

\*\*ERC-777 é difícil de implementar propriamente, devido à sua [suscetibilidade a diferentes formas de ataque](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620). É recomendável usar [ERC-20](/developers/docs/standards/tokens/erc-20/) ao invés. \*\* Essa página mantém um histórico de arquivos.

## Introdução? {#introduction}

ERC-777 é um padrão de token fungível superior aos anteriores [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Pré-requisitos {#prerequisites}

Para entender melhor essa página, recomendamos que leia sobre[ERC-20] (/developers/docs/standards/tokens/erc-20/).

## Quais as melhorias do ERC-777 em relação ao ERC-20? {#-erc-777-vs-erc-20}

O ERC-777 proporciona as seguintes melhorias em relação ao ERC-20.

### Ganchos {#hooks}

Os hooks são funções descritas no código de um smart contract. Eles são invocados quando os tokens são enviados ou recebidos pelo contrato. Isso possibilita que o smart contract reaja aos tokens recebidos ou enviados.

Os hooks são registrados e descobertos por meio do padrão [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820).

#### Porque os hooks são uma vantagem? {#why-are-hooks-great}

1. Eles possibilitam o envio de tokens para um contrato e a notificação do contrato em apenas uma transação. O [ERC-20], porém, necessita de duas chamadas (approve/transferFrom) para fazer isso.
2. Contratos que não possuem hooks registrados são incompatíveis com o ERC-777. O contrato enviado irá abortar a transação quando o receptor não estiver com um hook registrado. Isso previne transferências acidentais para smart contracts fora do padrão ERC-777.
3. Hooks podem rejeitar transações.

### Decimais {#decimals}

O padrão ERC-777 também soluciona a confusão referente a decimais causada pelo ERC-20. Esta clareza melhora a experiência do desenvolvedor.

### Retrocompatibilidade com ERC-20 {#backwards-compatibility-with-erc-20}

Contratos ERC-777 podem ter interações como se fossem contratos ERC-20.

## Leitura adicional {#further-reading}

[EIP-777: Padrão de Token] (https://eips.ethereum.org/EIPS/eip-777)
