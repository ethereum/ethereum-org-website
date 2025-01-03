---
title: Registrando dados de contratos inteligentes com eventos
description: Uma introdução aos eventos de contrato inteligentes e como você pode usá-los para registrar os dados
author: "jdourlens"
tags:
  - "contratos inteligentes"
  - "remix"
  - "solidity"
  - "eventos"
skill: intermediate
lang: pt-br
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

No Solidity, [eventos](/developers/docs/smart-contracts/anatomy/#events-and-logs) são sinais enviados que os contratos inteligentes podem disparar. Dapps, ou qualquer coisa conectada à API Ethereum JSON-RPC, podem reconhecer esses eventos e agir em conformidade. Um evento também pode ser indexado para que o histórico de eventos seja pesquisável posteriormente.

## Eventos {#events}

O evento mais comum na blockchain Ethereum no momento da redação deste artigo é o evento Transfer, que é emitido por tokens ERC20 quando alguém transfere tokens.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

A assinatura do evento é declarada dentro do código do contrato e pode ser emitida com a palavra-chave de emissão. Por exemplo, os registros de eventos de transferência que enviaram a transferência (_from_), para quem foram transferidos (_to_) e quantos tokens foram transferidos (_value_).

Se voltarmos ao nosso contrato inteligente Contador e decidirmos registrar toda vez que o valor for alterado. Como este contrato não é para ser usado, mas serve como uma base para a construção de outro contrato, estendendo-o: é chamado de contrato abstrato. No caso de nosso exemplo de contador, ele ficaria assim:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Private variable of type unsigned int to keep the number of counts
    uint256 private count = 0;

    // Function that increments our counter
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Getter to get the count value
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Observe que:

- **Linha 5**: declaramos nosso evento e o que ele contém, o valor antigo e o novo valor.

- **Linha 13**: Quando incrementamos nossa variável de contagem, emitimos o evento.

Se implementarmos o contrato e chamarmos a função de incremento, veremos que o Remix será exibido automaticamente se você clicar na nova transação dentro de um array de logs nomeados.

![Captura de tela Remix](./remix-screenshot.png)

Os logs são muito úteis para depurar seus contratos inteligentes, mas também são importantes se você criar aplicativos usados por diferentes pessoas e tornar mais fácil fazer análises para rastrear e entender como seu contrato inteligente é usado. Os registros gerados pelas transações são exibidos em exploradores de blocos populares e você também pode, por exemplo, usá-los para criar 'scripts' fora da cadeia para ver eventos específicos e agir quando eles ocorrerem.
