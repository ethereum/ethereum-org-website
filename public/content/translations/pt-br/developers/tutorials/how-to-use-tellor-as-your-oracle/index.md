---
title: Como configurar o Tellor como seu Oráculo
description: Um guia para começar a integrar o oráculo Tellor ao seu protocolo
author: "Tellor"
lang: pt-br
tags: [ "solidez", "smart contracts", "oráculos" ]
skill: beginner
published: 2021-06-29
source: Documentação do Tellor
sourceUrl: https://docs.tellor.io/tellor/
---

Pop Quiz: seu protocolo está quase pronto, mas precisa de um oráculo para ter acesso a dados fora da cadeia... O que você faz?

## (Pré-requisitos básicos) {#soft-prerequisites}

Esta publicação visa tornar o acesso a uma fonte de dados de oráculo o mais simples e direto possível. Dito isso, estamos assumindo o seguinte sobre o seu nível de habilidade de programação para focar no aspecto do oráculo.

Suposições:

- você consegue navegar em um terminal
- você tem o npm instalado
- você sabe como usar o npm para gerenciar dependências

Tellor é um oráculo ativo e de código aberto pronto para implementação. Este guia para iniciantes está aqui para mostrar a facilidade com que se pode começar a trabalhar com o Tellor, fornecendo ao seu projeto um oráculo totalmente descentralizado e resistente à censura.

## Visão geral {#overview}

Tellor é um sistema de oráculo onde as partes podem solicitar o valor de um ponto de dados fora da cadeia (p. ex., BTC/USD) e os relatores competem para adicionar esse valor a um banco de dados em cadeia, acessível a todos os contratos inteligentes da Ethereum. As entradas para este banco de dados são protegidas por uma rede de relatores em staking. O Tellor utiliza mecanismos de incentivo criptoeconômicos, recompensando os envios de dados honestos por relatores e punindo os agentes mal-intencionados através da emissão do token do Tellor, Tributes (TRB), e de um mecanismo de disputa.

Neste tutorial, abordaremos:

- Configurar o kit de ferramentas inicial que você precisará para começar a usar.
- Analisar um exemplo simples.
- Listar os endereços de redes de teste nas quais você pode testar o Tellor atualmente.

## UsingTellor {#usingtellor}

A primeira coisa que você vai querer fazer é instalar as ferramentas básicas necessárias para usar o Tellor como seu oráculo. Use [este pacote](https://github.com/tellor-io/usingtellor) para instalar os Contratos de Usuário do Tellor:

`npm install usingtellor`

Uma vez instalado, isso permitirá que seus contratos herdem as funções do contrato 'UsingTellor'.

Ótimo! Agora que você tem as ferramentas prontas, vamos fazer um exercício simples em que recuperamos o preço do bitcoin:

### Exemplo de BTC/USD {#btcusd-example}

Herde o contrato UsingTellor, passando o endereço do Tellor como um argumento do construtor:

Aqui está um exemplo:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //Este contrato agora tem acesso a todas as funções em UsingTellor

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
