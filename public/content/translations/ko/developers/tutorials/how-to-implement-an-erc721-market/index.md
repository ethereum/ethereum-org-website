---
title: ERC-721 마켓을 구현하는 방법
description: 토큰화된 아이템을 탈중앙화된 분류 게시판에 판매용으로 올리는 방법
author: "알베르토 쿠에스타 캐나다"
tags: [ "스마트 컨트랙트", "erc-721", "솔리디티", "토큰" ]
skill: intermediate
lang: ko
published: 2020-03-19
source: 해커눈
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

이 글에서는 이더리움 블록체인을 위한 Craigslist를 코딩하는 방법을 보여드리겠습니다.

Gumtree, Ebay, Craigslist 이전에는 분류 게시판이 주로 코르크나 종이로 만들어졌습니다. 학교 복도, 신문, 가로등, 상점 앞에 분류 게시판이 있었습니다.

인터넷의 등장으로 모든 것이 바뀌었습니다. 특정 분류 게시판을 볼 수 있는 사람들의 수가 몇 배로 증가했습니다. 그로 인해, 그들이 대표하는 시장은 훨씬 더 효율적이 되었고 글로벌 규모로 확장되었습니다. Ebay는 이러한 물리적 분류 게시판에서 기원한 거대한 사업입니다.

블록체인으로 이 시장들은 다시 한번 바뀔 것이며, 어떻게 바뀌는지 보여드리겠습니다.

## 수익화 {#monetization}

공개 블록체인 분류 게시판의 비즈니스 모델은 Ebay 및 그 회사의 모델과는 달라야 합니다.

첫째, [탈중앙화의 관점](/developers/docs/web2-vs-web3/)이 있습니다. 기존 플랫폼은 자체 서버를 유지해야 합니다. 탈중앙화된 플랫폼은 사용자에 의해 유지되므로, 핵심 플랫폼을 운영하는 비용이 플랫폼 소유자에게는 0으로 떨어집니다.

그리고 플랫폼에 대한 접근을 제공하는 웹사이트나 인터페이스인 프런트 엔드가 있습니다. 여기에는 많은 옵션이 있습니다. 플랫폼 소유자는 접근을 제한하고 모두가 자신의 인터페이스를 사용하도록 강제하며 수수료를 부과할 수 있습니다. 플랫폼 소유자는 접근을 개방하기로 결정할 수도 있습니다(권력을 민중에게!). 그리고 누구나 플랫폼에 대한 인터페이스를 구축하도록 허용할 수 있습니다. 또는 소유자는 이러한 극단적인 방법 사이의 어떤 접근 방식이든 결정할 수 있습니다.

_저보다 더 큰 비전을 가진 비즈니스 리더들은 이것을 어떻게 수익화할지 알 것입니다._ _제가 보기에는 이것이 현상 유지와는 다르며 아마도 수익성이 있을 것이라는 점입니다._

더욱이, 자동화 및 결제 관점이 있습니다. 어떤 것들은 매우 [효과적으로 토큰화](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com)될 수 있으며 분류 게시판에서 거래될 수 있습니다. 토큰화된 자산은 블록체인에서 쉽게 전송됩니다. 매우 복잡한 결제 방법도 블록체인에서 쉽게 구현될 수 있습니다.

저는 여기서 사업 기회를 보고 있습니다. 운영 비용이 없는 분류 게시판은 각 거래에 복잡한 결제 경로를 포함하여 쉽게 구현될 수 있습니다. 누군가 이것을 무엇에 사용할지에 대한 아이디어를 낼 것이라고 확신합니다.

저는 그냥 그것을 만드는 것이 행복합니다. 코드를 살펴보겠습니다.

## 구현 {#implementation}

얼마 전 우리는 비즈니스 사례 예제 구현 및 기타 유용한 것들이 포함된 [오픈 소스 리포지토리](https://github.com/HQ20/contracts?ref=hackernoon.com)를 시작했으니, 한번 살펴보세요.

이 [이더리움 분류 게시판](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com)의 코드가 거기에 있으니, 마음껏 활용하세요. 단, 이 코드는 감사를 받지 않았으므로 자금을 투입하기 전에 직접 실사를 해야 한다는 점을 유념하세요.

게시판의 기본 사항은 복잡하지 않습니다. 게시판의 모든 광고는 몇 개의 필드를 가진 구조체일 뿐입니다.

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // 개시됨, 실행됨, 취소됨
}
```

따라서 광고를 게시하는 사람이 있습니다. 판매용 아이템. 아이템의 가격. 거래의 상태는 개시됨, 실행됨 또는 취소됨일 수 있습니다.

이 모든 거래는 매핑에 보관될 것입니다. 솔리디티의 모든 것이 매핑인 것 같기 때문입니다. 또한 편리하기 때문이기도 합니다.

```solidity
mapping(uint256 => Trade) public trades;
```

매핑을 사용한다는 것은 각 광고를 게시하기 전에 ID를 만들어야 하며, 해당 광고에 대해 작업을 수행하기 전에 광고의 ID를 알아야 한다는 것을 의미합니다. 스마트 계약이나 프런트엔드에서 이를 처리하는 여러 방법이 있습니다. 조언이 필요하면 물어보세요.

다음은 우리가 다루는 아이템이 무엇인지, 그리고 거래에 사용되는 통화가 무엇인지에 대한 질문입니다.

아이템의 경우, 우리는 [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com) 인터페이스를 구현하도록 요구할 것입니다. 이는 실제로 블록체인에서 현실 세계의 아이템을 나타내는 방법일 뿐이지만, [디지털 자산에 가장 잘 작동](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com)합니다. 우리는 생성자에서 자체 ERC721 계약을 지정할 것이며, 이는 우리 분류 게시판의 모든 자산이 사전에 토큰화되어야 함을 의미합니다.

결제의 경우, 우리는 비슷한 작업을 할 것입니다. 대부분의 블록체인 프로젝트는 자체 [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com) 암호화폐를 정의합니다. 다른 일부는 DAI와 같은 주류 통화를 사용하는 것을 선호합니다. 이 분류 게시판에서는 구축 시 어떤 통화를 사용할지만 결정하면 됩니다. 쉽습니다.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

거의 다 됐습니다. 광고, 거래할 아이템, 결제할 통화가 있습니다. 광고를 만든다는 것은, 자신이 아이템을 가지고 있다는 것과 다른 게시판 등에 두 번 게시하지 않았다는 것을 모두 보여주기 위해 아이템을 에스크로에 넣는 것을 의미합니다.

아래 코드는 정확히 그 작업을 수행합니다. 아이템을 에스크로에 넣고, 광고를 생성하며, 몇 가지 정리 작업을 수행합니다.

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

거래를 수락한다는 것은 광고(거래)를 선택하고, 가격을 지불하며, 아이템을 받는 것을 의미합니다. 아래 코드는 거래를 검색합니다. 이용 가능한지 확인합니다. 아이템 대금을 지불합니다. 아이템을 받습니다. 광고를 업데이트합니다.

```solidity
function executeTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(trade.status == "Open", "거래가 개시되지 않았습니다.");
  currencyToken.transferFrom(msg.sender, trade.poster, trade.price);
  itemToken.transferFrom(address(this), msg.sender, trade.item);
  trades[_trade].status = "Executed";
  emit TradeStatusChange(_trade, "Executed");
}
```

마지막으로, 판매자가 구매자가 수락하기 전에 거래를 취소할 수 있는 옵션이 있습니다. 일부 모델에서는 광고가 만료되기 전 일정 기간 동안 활성화됩니다. 시장의 디자인에 따라 선택하면 됩니다.

코드는 거래를 실행하는 데 사용되는 코드와 매우 유사하며, 단지 통화가 오가지 않고 아이템이 광고 게시자에게 돌아간다는 점만 다릅니다.

```solidity
function cancelTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(
    msg.sender == trade.poster,
    "거래는 게시자만 취소할 수 있습니다."
  );
  require(trade.status == "Open", "거래가 개시되지 않았습니다.");
  itemToken.transferFrom(address(this), trade.poster, trade.item);
  trades[_trade].status = "Cancelled";
  emit TradeStatusChange(_trade, "Cancelled");
}
```

이것으로 끝입니다. 구현의 끝까지 오셨습니다. 일부 비즈니스 개념이 코드로 표현될 때 얼마나 간결해지는지는 꽤 놀라운데, 이것이 바로 그런 경우 중 하나입니다. 전체 계약은 [저희 리포지토리](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol)에서 확인하세요.

## 결론 {#conclusion}

분류 게시판은 인터넷과 함께 대규모로 확장된 일반적인 시장 구성으로, 소수의 독점적 승자와 함께 매우 인기 있는 비즈니스 모델이 되었습니다.

또한 분류 게시판은 블록체인 환경에서 복제하기 쉬운 도구이며, 기존의 거대 기업에 대한 도전을 가능하게 하는 매우 특정한 기능을 가지고 있습니다.

이 글에서 저는 분류 게시판 비즈니스의 비즈니스 현실과 기술적 구현을 연결하려고 시도했습니다. 이 지식은 여러분이 적절한 기술을 가지고 있다면 구현을 위한 비전과 로드맵을 만드는 데 도움이 될 것입니다.

언제나처럼, 재미있는 것을 만들고 있고 조언이 필요하다면 언제든지 [연락 주세요](https://albertocuesta.es/)! 언제나 기꺼이 도와드리겠습니다.
