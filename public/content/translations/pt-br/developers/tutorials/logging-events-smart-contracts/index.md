---
title: Registrando dados de contratos inteligentes com eventos
description: "Uma introdução aos eventos de contrato inteligente e como você pode usá-los para registrar dados"
author: "jdourlens"
tags: [ "smart contracts", "remix", "solidez", "eventos" ]
skill: intermediate
lang: pt-br
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Em Solidity, [eventos](/developers/docs/smart-contracts/anatomy/#events-and-logs) são sinais despachados que os contratos inteligentes podem disparar. Dapps, ou qualquer coisa conectada à API JSON-RPC do Ethereum, podem escutar esses eventos e agir de acordo. Um evento também pode ser indexado para que o histórico de eventos seja pesquisável posteriormente.

## Eventos {#events}

O evento mais comum na blockchain Ethereum, no momento em que este artigo foi escrito, é o evento Transfer, emitido por tokens ERC20 quando alguém transfere tokens.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

A assinatura do evento é declarada dentro do código do contrato e pode ser emitida com a palavra-chave emit. Por exemplo, o evento de transferência registra quem enviou a transferência (_from_), para quem (_to_) e quantos tokens foram transferidos (_value_).

Se voltarmos ao nosso contrato inteligente Counter e decidirmos registrar toda vez que o valor é alterado. Como este contrato não se destina a ser implantado, mas a servir como base para a construção de outro contrato estendendo-o: ele é chamado de contrato abstrato. No caso do nosso exemplo de contador, ficaria assim:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Variável privada do tipo inteiro não assinado para manter o número de contagens
    uint256 private count = 0;

    // Função que incrementa nosso contador
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Getter para obter o valor da contagem
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Observe que:

- **Linha 5**: declaramos nosso evento e o que ele contém: o valor antigo e o novo valor.

- **Linha 13**: Quando incrementamos nossa variável de contagem, emitimos o evento.

Se implantarmos o contrato agora e chamarmos a função de incremento, veremos que o Remix o exibirá automaticamente se você clicar na nova transação dentro de um array chamado logs.

![Captura de tela do Remix](./remix-screenshot.png)

Os logs são muito úteis para depurar seus contratos inteligentes, mas também são importantes se você constrói aplicações usadas por pessoas diferentes, o que facilita a análise para rastrear e entender como seu contrato inteligente é usado. Os logs gerados pelas transações são exibidos nos exploradores de bloco populares e você também pode, por exemplo, usá-los para criar scripts fora da cadeia para escutar eventos específicos e agir quando eles ocorrerem.
