---
title: Log de dados de contratos inteligentes com eventos
description: "Uma introdução aos eventos de contratos inteligentes e como você pode usá-los para fazer log de dados"
author: "jdourlens"
tags: ["contratos inteligentes", "Remix", "Solidity", "eventos"]
skill: intermediate
breadcrumb: Log de eventos
lang: pt-br
published: 2020-04-03
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Na Solidity, [eventos](/developers/docs/smart-contracts/anatomy/#events-and-logs) são sinais despachados que os contratos inteligentes podem disparar. Aplicativos descentralizados (dapps), ou qualquer coisa conectada à API JSON-RPC do Ethereum, podem escutar esses eventos e agir de acordo. Um evento também pode ser indexado para que o histórico de eventos seja pesquisável posteriormente.

## Eventos {#events}

Um dos eventos mais comuns na blockchain do Ethereum é o evento `Transfer` que é emitido por tokens ERC-20 quando alguém transfere tokens.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

A assinatura do evento é declarada dentro do código do contrato e pode ser emitida com a palavra-chave emit. Por exemplo, o evento transfer faz o log de quem enviou a transferência (_from_), para quem (_to_) e quantos tokens foram transferidos (_value_).

Vamos voltar ao contrato inteligente `Counter` de [implantando seu primeiro contrato inteligente](/developers/tutorials/deploying-your-first-smart-contract/) e fazer o log toda vez que o valor for alterado. Ficaria assim:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {

    event ValueChanged(uint256 oldValue, uint256 newValue);

    // Variável pública do tipo unsigned int para guardar o número de contagens
    uint256 public count = 0;

    // Função que incrementa nosso contador
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Getter desnecessário para obter o valor da contagem
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Observe que:

- **Linha 6**: declaramos nosso evento e o que ele contém, o valor antigo e o novo valor.

- **Linha 14**: Quando incrementamos nossa variável de contagem, emitimos o evento.

Se agora implantarmos o contrato e chamarmos a função de incremento, veremos que o Remix o exibirá automaticamente se você clicar na nova transação dentro de um array chamado logs.

![Captura de tela do Remix](./remix-screenshot.png)

Os logs são muito úteis para depurar seus contratos inteligentes, mas também são importantes se você constrói aplicativos usados por diferentes pessoas, pois facilitam a criação de análises para rastrear e entender como seu contrato inteligente é usado. Os logs gerados por transações são exibidos em exploradores de blocos populares e você também pode, por exemplo, usá-los para criar scripts offchain para escutar eventos específicos e tomar medidas quando eles ocorrerem.
