---
title: Padrão de token ERC-777
description: Token
lang: pt-br
---

## Atenção {#warning}

**ERC-777 é difícil de implementar adequadamente, devido à sua [suscetibilidade a diferentes formas de ataque](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620). Recomenda-se usar [ERC-20](/developers/docs/standards/tokens/erc-20/) em vez disso.** Esta página permanece como um arquivo histórico.

## Introdução {#introduction}

ERC-777 é um padrão de token fungível com o objetivo de aprimorar o padrão [ERC-20](/developers/docs/standards/tokens/erc-20/) existente.

## Pré-Requisitos {#prerequisites}

Para entender melhor essa página, recomendamos primeiramente uma leitura sobre [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Quais as melhorias do ERC-777 em relação ao ERC-20? {#-erc-777-vs-erc-20}

O ERC-777 proporciona as seguintes melhorias em relação ao ERC-20.

### Hooks {#hooks}

Os hooks são funções descritas no código de um contrato inteligente. Eles são invocados quando os tokens são enviados ou recebidos pelo contrato. Isso possibilita que o contrato inteligente reaja aos tokens recebidos ou enviados.

Os hooks são registrados e descobertos utilizando o padrão [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820).

#### Porque os hooks são uma vantagem? {#why-are-hooks-great}

1. Os hooks possibilitam o envio de tokens para um contrato e a notificação do contrato em apenas uma transação. O [ERC-20](https://eips.ethereum.org/EIPS/eip-20), porém, necessita de duas chamadas (`approve`/`transferFrom`) para fazer isso.
2. Contratos que não possuem hooks registrados são incompatíveis com o ERC-777. O contrato enviado irá abortar a transação quando o receptor não estiver com um hook registrado. Isso previne transferências acidentais para contratos inteligentes fora do padrão ERC-777.
3. Hooks podem rejeitas transações.

### Decimais {#decimals}

O padrão ERC-777 também soluciona a confusão referente a `decimals` causada pelo ERC-20. Esta clareza melhora a experiência do desenvolvedor.

### Retrocompatibilidade com o ERC-20 {#backwards-compatibility-with-erc-20}

Contratos ERC-777 permitem interação como se fossem contratos ERC-20.

## Leitura Adicional {#further-reading}

[EIP-777: Padrão de token](https://eips.ethereum.org/EIPS/eip-777)
