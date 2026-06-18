---
title: Como implementar um mercado ERC-721
description: Como colocar itens tokenizados à venda em um quadro de classificados descentralizado
author: "Alberto Cuesta Cañada"
tags: ["contratos inteligentes", "erc-721", "solidity", "tokens"]
skill: intermediate
breadcrumb: Mercado ERC-721
lang: pt-br
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

Neste artigo, vou mostrar como programar o Craigslist para a blockchain do Ethereum.

Antes do Gumtree, Ebay e Craigslist, os quadros de classificados eram feitos principalmente de cortiça ou papel. Havia quadros de classificados em corredores de escolas, jornais, postes de luz, vitrines de lojas.

Tudo isso mudou com a internet. O número de pessoas que podiam ver um quadro de classificados específico multiplicou-se por muitas ordens de grandeza. Com isso, os mercados que eles representam tornaram-se muito mais eficientes e escalaram para um tamanho global. O Ebay é um negócio gigantesco que tem suas origens nesses quadros de classificados físicos.

Com a blockchain, esses mercados estão prestes a mudar mais uma vez, deixe-me mostrar como.

## Monetização {#monetization}

O modelo de negócios de um quadro de classificados em uma blockchain pública precisará ser diferente do modelo do Ebay e companhia.

Primeiro, há [o ângulo da descentralização](/developers/docs/web2-vs-web3/). As plataformas existentes precisam manter seus próprios servidores. Uma plataforma descentralizada é mantida por seus usuários, então o custo de execução da plataforma principal cai para zero para o proprietário da plataforma.

Depois, há o front-end, o site ou interface que dá acesso à plataforma. Aqui existem muitas opções. Os proprietários da plataforma podem restringir o acesso e forçar todos a usar sua interface, cobrando uma taxa. Os proprietários da plataforma também podem decidir abrir o acesso (Poder para o Povo!) e permitir que qualquer pessoa construa interfaces para a plataforma. Ou os proprietários podem decidir por qualquer abordagem no meio desses extremos.

_Líderes de negócios com mais visão do que eu saberão como monetizar isso. Tudo o que vejo é que isso é diferente do status quo e provavelmente lucrativo._

Além disso, há o ângulo da automação e dos pagamentos. Algumas coisas podem ser [efetivamente tokenizadas](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) e negociadas em um quadro de classificados. Ativos tokenizados são facilmente transferidos em uma blockchain. Métodos de pagamento altamente complexos podem ser facilmente implementados em uma blockchain.

Estou apenas farejando uma oportunidade de negócios aqui. Um quadro de classificados sem custos operacionais pode ser facilmente implementado, com caminhos de pagamento complexos incluídos em cada transação. Tenho certeza de que alguém terá uma ideia sobre para que usar isso.

Estou apenas feliz em construí-lo. Vamos dar uma olhada no código.

## Implementação {#implementation}

Há algum tempo, iniciamos um [repositório de código aberto](https://github.com/HQ20/contracts?ref=hackernoon.com) com exemplos de implementações de casos de negócios e outras coisas boas, por favor, dê uma olhada.

O código para este [Quadro de Classificados do Ethereum](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) está lá, por favor, use e abuse dele. Apenas esteja ciente de que o código não foi auditado e você precisa fazer sua própria devida diligência antes de colocar dinheiro nele.

O básico do quadro não é complexo. Todos os anúncios no quadro serão apenas um struct com alguns campos:

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Aberto, Executado, Cancelado
}
```

Então, há alguém postando o anúncio. Um item à venda. Um preço para o item. O status da negociação, que pode ser aberta, executada ou cancelada.

Todas essas negociações serão mantidas em um mapping. Porque tudo em Solidity parece ser um mapping. Também porque é conveniente.

```solidity
mapping(uint256 => Trade) public trades;
```

Usar um mapping significa apenas que temos que criar um id para cada anúncio antes de postá-lo, e precisaremos saber o id de um anúncio antes de podermos operar nele. Existem várias maneiras de lidar com isso, seja no contrato inteligente ou no front-end. Por favor, pergunte se precisar de algumas dicas.

Em seguida, vem a questão de quais são esses itens com os quais lidamos e qual é essa moeda usada para pagar pela transação.

Para os itens, vamos apenas pedir que eles implementem a interface [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com), que na verdade é apenas uma maneira de representar itens do mundo real em uma blockchain, embora [funcione melhor com ativos digitais](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com). Vamos especificar nosso próprio contrato ERC721 no construtor, o que significa que quaisquer ativos em nosso quadro de classificados precisam ter sido tokenizados de antemão.

Para os pagamentos, vamos fazer algo semelhante. A maioria dos projetos de blockchain define sua própria criptomoeda [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com). Alguns outros preferem usar uma mais popular, como DAI. Neste quadro de classificados, você só precisa decidir na construção qual será a sua moeda. Fácil.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

Estamos chegando lá. Temos anúncios, itens para negociação e uma moeda para pagamentos. Fazer um anúncio significa colocar um item em custódia (escrow) para mostrar tanto que você o tem quanto que não o postou duas vezes, possivelmente em um quadro diferente.

O código abaixo faz exatamente isso. Coloca o item em custódia, cria o anúncio e faz algumas tarefas de organização.

```solidity
function openTrade(uint256 _item, uint256 _price)
  public
{
  itemToken.transferFrom(msg.sender, address(this), _item);
  trades[tradeCounter] = Trade({
    poster: msg.sender,
    item: _item,
    price: _price,
    status: "Open"
  });
  tradeCounter += 1;
  emit TradeStatusChange(tradeCounter - 1, "Open");
}
```

Aceitar a negociação significa escolher um anúncio (negociação), pagar o preço e receber o item. O código abaixo recupera uma negociação. Verifica se está disponível. Paga o item. Recupera o item. Atualiza o anúncio.

```solidity
function executeTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(trade.status == "Open", "Trade is not Open.");
  currencyToken.transferFrom(msg.sender, trade.poster, trade.price);
  itemToken.transferFrom(address(this), msg.sender, trade.item);
  trades[_trade].status = "Executed";
  emit TradeStatusChange(_trade, "Executed");
}
```

Finalmente, temos uma opção para os vendedores desistirem de uma negociação antes que um comprador a aceite. Em alguns modelos, os anúncios ficariam ativos por um período de tempo antes de expirarem. A escolha é sua, dependendo do design do seu mercado.

O código é muito semelhante ao usado para executar uma negociação, apenas que não há moeda mudando de mãos e o item volta para quem postou o anúncio.

```solidity
function cancelTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(
    msg.sender == trade.poster,
    "Trade can be cancelled only by poster."
  );
  require(trade.status == "Open", "Trade is not Open.");
  itemToken.transferFrom(address(this), trade.poster, trade.item);
  trades[_trade].status = "Cancelled";
  emit TradeStatusChange(_trade, "Cancelled");
}
```

É isso. Você chegou ao fim da implementação. É bastante surpreendente quão compactos alguns conceitos de negócios são quando expressos em código, e este é um desses casos. Confira o contrato completo [em nosso repositório](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol).

## Conclusão {#conclusion}

Quadros de classificados são uma configuração de mercado comum que escalou massivamente com a internet, tornando-se um modelo de negócios extremamente popular com alguns vencedores monopolistas.

Quadros de classificados também são uma ferramenta fácil de replicar em um ambiente blockchain, com recursos muito específicos que tornarão possível um desafio aos gigantes existentes.

Neste artigo, fiz uma tentativa de conectar a realidade de negócios de um quadro de classificados com a implementação tecnológica. Esse conhecimento deve ajudá-lo a criar uma visão e um roteiro para a implementação, se você tiver as habilidades certas.

Como sempre, se você está prestes a construir algo divertido e gostaria de alguns conselhos, por favor, [entre em contato comigo](https://albertocuesta.es/)! Estou sempre feliz em ajudar.