---
title: Padrão de token ERC-777
description: Aprenda sobre o ERC-777, um padrão de token fungível aprimorado com hooks, embora o ERC-20 seja recomendado por segurança.
lang: pt-br
---

## Aviso {#warning}

**O ERC-777 é difícil de implementar corretamente, devido à sua [suscetibilidade a diferentes formas de ataque](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620). Recomenda-se usar o [ERC-20](/developers/docs/standards/tokens/erc-20/) em vez disso.** Esta página permanece como um arquivo histórico.

## Introdução? {#introduction}

O ERC-777 é um padrão de token fungível que melhora o padrão [ERC-20](/developers/docs/standards/tokens/erc-20/) existente.

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, recomendamos que você leia primeiro sobre o [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Quais melhorias o ERC-777 propõe em relação ao ERC-20? {#-erc-777-vs-erc-20}

O ERC-777 fornece as seguintes melhorias em relação ao ERC-20.

### Hooks {#hooks}

Hooks são uma função descrita no código de um contrato inteligente. Os hooks são chamados quando tokens são enviados ou recebidos por meio do contrato. Isso permite que um contrato inteligente reaja à entrada ou saída de tokens.

Os hooks são registrados e descobertos usando o padrão [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820).

#### Por que os hooks são ótimos? {#why-are-hooks-great}

1. Os hooks permitem enviar tokens para um contrato e notificar o contrato em uma única transação, ao contrário do [ERC-20](https://eips.ethereum.org/EIPS/eip-20), que requer uma chamada dupla (`approve`/`transferFrom`) para conseguir isso.
2. Contratos que não registraram hooks são incompatíveis com o ERC-777. O contrato remetente abortará a transação quando o contrato receptor não tiver registrado um hook. Isso evita transferências acidentais para contratos inteligentes não ERC-777.
3. Os hooks podem rejeitar transações.

### Decimais {#decimals}

O padrão também resolve a confusão em torno de `decimals` causada no ERC-20. Essa clareza melhora a experiência do desenvolvedor.

### Retrocompatibilidade com o ERC-20 {#backwards-compatibility-with-erc-20}

É possível interagir com contratos ERC-777 como se fossem contratos ERC-20.

## Leitura adicional {#further-reading}

[EIP-777: Padrão de token](https://eips.ethereum.org/EIPS/eip-777)