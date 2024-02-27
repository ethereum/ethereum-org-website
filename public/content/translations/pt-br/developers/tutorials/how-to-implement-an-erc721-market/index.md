---
title: Como implementar um mercado ERC-721
description: Como colocar itens tokenizados para venda em um mercado descentralizado
author: "Alberto Cuesta Cañada"
tags:
  - "contratos inteligentes"
  - "erc-721"
  - "solidez"
  - "tokens"
skill: intermediate
lang: pt-br
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

Neste artigo, vou lhe mostrar como programar um Craigslist na blockchain Ethereum.

Antes de Gumtree, Ebay e Craigslist, classificados eram basicamente painéis de cortiça ou papel. Havia seções de classificados nos corredores da escola, jornais, postes de rua, e vitrines.

Tudo isso mudou com a internet. O número de pessoas que podiam ver um determinado quadro classificado foi multiplicado por muitas ordens de magnitude. Com isso, os mercados que representam tornaram-se muito mais eficientes e escalaram até à dimensão global. A Ebay é uma empresa gigantesca que rastreia a origem destes quadros de classificações físicas.

Com a blockchain, esses mercados estão definidos para mudar mais uma vez, deixe-me te mostrar como.

## Monetização {#monetization}

O modelo de negócio de um conselho de classificações públicas da blockchain precisará ser diferente do da Ebay e da empresa.

Primeiro, há [o ângulo de descentralização](/developers/docs/web2-vs-web3/). Plataformas existentes precisam manter seus próprios servidores. Uma plataforma descentralizada é mantida por seus usuários, então o custo de executar a plataforma principal cai para zero para o proprietário da plataforma.

Em seguida, há o front-end, o site ou a interface que dá acesso à plataforma. Aqui há muitas opções. Os proprietários da plataforma podem restringir o acesso e forçar todos a usar a interface, carregando uma taxa. Os proprietários da plataforma também podem decidir abrir o acesso (Poder para as Pessoas!) e deixar qualquer pessoa construir interfaces na plataforma. Ou os proprietários poderiam decidir qualquer abordagem no meio desses extremos.

_Os líderes empresariais com mais visão do que eu saberão bem como monetizar isso. Tudo o que entendo é que isto é diferente do status quo e é, provavelmente, lucrativo._

Além disso, há o ponto relativo à automação e aos pagamentos. Algumas coisas podem ser [efetivamente tokenizadas](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) e negociadas em um quadro de classificações. Ativos tokenizados são facilmente transferidos em uma blockchain. Métodos de pagamento altamente complexos podem ser facilmente implementados em uma blockchain.

Sinto uma oportunidade de negócios aqui. Um quadro de classificados sem custos correntes pode ser facilmente implementado, com caminhos de pagamento complexos incluídos em cada transação. Tenho certeza de que alguém vai ter uma ideia sobre em que usar isso.

Estou feliz construindo. Vamos dar uma olhada no código.

## Implementação {#implementation}

Há algum tempo iniciamos um [repositório de código aberto](https://github.com/HQ20/contracts?ref=hackernoon.com) com implementações de exemplos de casos de negócios e outros brindes, dê uma olhada.

O código para este [Ethereum Classifieds Board](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) está lá, por favor, use e abuse dele. Apenas esteja ciente de que o código não foi auditado e de que você precisa fazer a sua própria diligência antes de deixar o dinheiro entrar.

Os fundamentos do conselho não são complexos. Todos os anúncios no board serão apenas uma construção com alguns campos:

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Open, Executed, Cancelled
}
```

Portanto, há alguém que publique o anúncio. Item à venda. Um preço para o item. O status da operação que pode ser aberto, executado ou cancelado.

Todas essas trocas serão mantidas em um mapeamento. Porque tudo no Solidity parece ser um mapeamento. Também porque é conveniente.

```solidity
mapping(uint256 => Trade) public trades;
```

Usando um mapeamento significa apenas que temos que criar um id para cada anúncio antes de publicá-lo, e precisaremos saber a identificação de um anúncio antes de podermos operar sobre ele. Existem várias maneiras de lidar com isto, seja no contrato inteligente ou na parte front-end. Por favor pergunte se você precisa de alguns ponteiros.

Em seguida, a questão de quais são os itens com que lidamos, e qual é esta moeda que é usada para pagar a transação.

Para os itens, vamos apenas pedir que eles implementem a interface [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com), que realmente é apenas uma maneira de representar itens do mundo real em uma blockchain, embora [funcione melhor com os recursos digitais](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com). Vamos especificar o nosso próprio contrato ERC721 no construtor, significa que todos os ativos do nosso quadro de classificados precisam ter sido tokenizados previamente.

Quanto aos pagamentos, vamos fazer algo semelhante. A maioria dos projetos blockchain definem suas próprias criptomoedas [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com). Outros preferem usar um mainstream como a DAI. Neste quadro de classificações, você só precisa decidir em construção qual será a sua moeda. Fácil.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

Nós estamos chegando lá. Temos anúncios, itens para negociação e uma moeda para pagamentos. Fazer um anúncio significa colocar um item no escopo para mostrar que você o tem e que você não publicou duas vezes, possivelmente em um quadro diferente.

O código abaixo faz exatamente isso. Coloca o item no escrow, cria o anúncio, faz algum serviço doméstico.

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

Aceitar a troca significa escolher um anúncio (negociação), pagar o preço, receber o item. O código abaixo recupera uma troca. Verifica se está disponível. Paga o item. Recupera o item. Atualiza o anúncio.

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

Por último, temos uma opção para os vendedores recuarem numa negociação antes que um comprador a aceite. Em alguns modelos, os anúncios estariam vivos por um período de tempo antes de eles expirarem. Fica a sua escolha, dependendo do design do seu mercado.

O código é muito semelhante ao usado para executar uma negociação, apenas não há nenhuma mudança de moeda e o item volta para o cartaz anunciante.

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

É isso. Você chegou ao fim da implementação. É bastante surpreendente como alguns conceitos de negócios se tornam compactos quando são expressados em código, e este é um desses casos. Verifique o contrato completo [no nosso repositório](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol).

## Conclusão {#conclusion}

As seções de classificados são uma configuração comum de mercado que cresceu em grande escala com a internet, tornando-se um modelo de negócio extremamente popular com alguns vencedores monopolistas.

Também acontece de as seções de classificados serem uma ferramenta fácil de replicar em um ambiente blockchain, com características muito específicas que possibilitarão um desafio para os gigantes da atualidade.

Neste artigo, tentei fazer uma ponte entre a realidade comercial de um conselho de administração clássico com a implementação tecnológica. Este conhecimento deve ajudá-lo a criar uma visão e um roteiro para a implementação, se você tiver as habilidades certas.

Como sempre, se você for construir algo divertido e gostaria de alguns conselhos, por favor [envie-me uma mensagem](https://albertocuesta.es/)! Fico sempre feliz em ajudar.
