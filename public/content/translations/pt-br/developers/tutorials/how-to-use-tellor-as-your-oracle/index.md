---
title: Como configurar Tellor como seu Oráculo
description: Um guia para começar a integrar o oráculo Tellor ao seu protocolo
author: "Tellor"
lang: pt-br
tags:
  - "solidity"
  - "contratos inteligentes"
  - "oráculos"
skill: intermediate
published: 2021-06-29
source: Documentação Tellor
sourceUrl: https://docs.tellor.io/tellor/
---

Pop Quiz: Seu protocolo está quase pronto, mas precisa de um oráculo para obter acesso aos dados off-chain... O que você faz?

## (Soft) Pré-requisitos {#soft-prerequisites}

Esse texto tem como objetivo tornar o acesso a um conjunto de dados através do uso de um oráculo o mais simples e direto possível. Dito isso, estamos assumindo o seguinte sobre seu nível de habilidade de codificação para focar no aspecto do oráculo.

Suposições:

- você pode navegar em um terminal
- você tem o npm instalado
- você sabe como usar o npm para gerenciar dependências

Tellor é um oráculo vivo e de código aberto pronto para implementação. Este guia para iniciantes está aqui para mostrar a facilidade com que se pode começar a trabalhar com Tellor, fornecendo ao seu projeto um oráculo totalmente descentralizado e resistente à censura.

## Visão geral {#overview}

Tellor é um sistema de oráculo onde as partes podem solicitar o valor de um ponto de dados off-chain (por exemplo, BTC/USD) e os repórteres (nós ou participantes) competem para adicionar esse valor a um banco de dados on-chain, acessível por todos os contratos inteligentes do Ethereum. As entradas para este banco de dados são asseguradas por uma rede de repórteres participantes. Tellor utiliza mecanismos de incentivo cripto-econômico, recompensando envios de dados honestos por repórteres e punindo maus atores por meio da emissão do token Tellor, Tributos (TRB) e um mecanismo de disputa.

Neste tutorial, nós iremos ver:

- Configurar o kit de ferramentas inicial, que você precisará para começar a trabalhar.
- Percorra por um exemplo simples.
- Listar os endereços de teste das redes as quais você pode testar o Tellor atualmente.

## UsingTellor {#usingtellor}

A primeira coisa que você vai querer fazer é instalar as ferramentas básicas necessárias para usar o Tellor como seu oráculo. Use [este pacote](https://github.com/tellor-io/usingtellor) para instalar os contratos de usuário do Tellor:

`npm install usingtellor`

Uma vez instalado, isso permitirá que seus contratos herdem as funções do contrato 'UsingTellor'.

Excelente! Agora que você tem as ferramentas prontas, vamos passar por um simples exercício onde recuperamos o preço do bitcoin:

### Exemplo BTC/USD {#btcusd-example}

Herde o contrato UsingTellor, passando o endereço do Tellor como um argumento do construtor:

Aqui está um exemplo:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //This Contract now has access to all functions in UsingTellor

constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

function setBtcPrice() public {
    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryId = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

Para uma lista completa de endereços de contrato, consulte [aqui](https://docs.tellor.io/tellor/the-basics/contracts-reference).

Para facilidade de uso, o repositório UsingTellor vem com uma versão do contrato [Tellor Playground](https://github.com/tellor-io/TellorPlayground) para facilitar a integração. Consulte [aqui](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) para obter uma lista de funções úteis.

Para uma implementação mais robusta do oráculo Tellor, confira a lista completa de funções, disponíveis [aqui](https://github.com/tellor-io/usingtellor/blob/master/README.md).
