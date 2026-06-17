---
title: Como configurar o Tellor como seu oráculo
description: Um guia para começar a integrar o oráculo Tellor ao seu protocolo
author: "Tellor"
lang: pt-br
tags: ["solidity", "contratos inteligentes", "oráculos"]
skill: beginner
breadcrumb: Oráculo Tellor
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Teste rápido: Seu protocolo está quase pronto, mas precisa de um oráculo para ter acesso a dados offchain... O que você faz?

## Pré-requisitos (básicos) {#soft-prerequisites}

Esta publicação tem como objetivo tornar o acesso a um feed de oráculo o mais simples e direto possível. Dito isso, estamos presumindo o seguinte sobre o seu nível de habilidade de programação para focar no aspecto do oráculo.

Premissas:

- você sabe navegar em um terminal
- você tem o npm instalado
- você sabe como usar o npm para gerenciar dependências

O Tellor é um oráculo ativo e de código aberto pronto para implementação. Este guia para iniciantes está aqui para mostrar a facilidade com que se pode começar a usar o Tellor, fornecendo ao seu projeto um oráculo totalmente descentralizado e resistente à censura.

## Visão geral {#overview}

O Tellor é um sistema de oráculo onde as partes podem solicitar o valor de um ponto de dados offchain (por exemplo, BTC/USD) e os relatores competem para adicionar esse valor a um banco de dados onchain, acessível por todos os contratos inteligentes do Ethereum. As entradas para este banco de dados são protegidas por uma rede de relatores com stake. O Tellor utiliza mecanismos de incentivo cripto-econômicos, recompensando envios de dados honestos por relatores e punindo agentes mal-intencionados por meio da emissão do token do Tellor, Tributes (TRB), e de um mecanismo de disputa.

Neste tutorial, abordaremos:

- A configuração do kit de ferramentas inicial que você precisará para começar.
- Um passo a passo de um exemplo simples.
- A listagem de endereços de rede de teste de redes nas quais você pode testar o Tellor atualmente.

## UsingTellor {#usingtellor}

A primeira coisa que você vai querer fazer é instalar as ferramentas básicas necessárias para usar o Tellor como seu oráculo. Use [este pacote](https://github.com/tellor-io/usingtellor) para instalar os Contratos de Usuário do Tellor (Tellor User Contracts):

`npm install usingtellor`

Uma vez instalado, isso permitirá que seus contratos herdem as funções do contrato 'UsingTellor'.

Ótimo! Agora que você tem as ferramentas prontas, vamos fazer um exercício simples onde recuperamos o preço do Bitcoin:

### Exemplo BTC/USD {#btcusd-example}

Herde o contrato UsingTellor, passando o endereço do Tellor como um argumento do construtor:

Aqui está um exemplo:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //Este Contrato agora tem acesso a todas as funções em UsingTellor

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

Para obter uma lista completa de endereços de contrato, consulte [aqui](https://docs.tellor.io/tellor/the-basics/contracts-reference).

Para facilitar o uso, o repositório UsingTellor vem com uma versão do contrato [Tellor Playground](https://github.com/tellor-io/TellorPlayground) para uma integração mais fácil. Veja [aqui](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) uma lista de funções úteis.

Para uma implementação mais robusta do oráculo Tellor, confira a lista completa de funções disponíveis [aqui](https://github.com/tellor-io/usingtellor/blob/master/README.md).