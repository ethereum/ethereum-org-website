---
title: ERC-721 마켓 구현 방법
description: 탈중앙화된 게시판에서 토큰화된 아이템을 판매하는 방법
author: "알베르토 쿠에스타 카냐다"
tags: ["스마트 컨트랙트", "erc-721", "solidity", "토큰"]
skill: intermediate
breadcrumb: ERC-721 마켓
lang: ko
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

이 글에서는 이더리움 블록체인을 위한 크레이그리스트(Craigslist)를 코딩하는 방법을 보여드리겠습니다.

검트리(Gumtree), 이베이(Ebay), 크레이그리스트가 등장하기 전, 벼룩시장 게시판은 주로 코르크나 종이로 만들어졌습니다. 학교 복도, 신문, 가로등, 상점 앞 등에 이런 게시판이 있었습니다.

인터넷과 함께 이 모든 것이 변했습니다. 특정 게시판을 볼 수 있는 사람의 수가 기하급수적으로 늘어났습니다. 그에 따라 게시판이 대표하는 시장은 훨씬 더 효율적이 되었고 전 세계적인 규모로 확장되었습니다. 이베이는 이러한 물리적인 벼룩시장 게시판에 기원을 둔 거대한 기업입니다.

블록체인과 함께 이러한 시장은 다시 한번 변화를 맞이할 준비가 되었습니다. 그 방법을 보여드리겠습니다.

## 수익화 {#monetization}

퍼블릭 블록체인 게시판의 비즈니스 모델은 이베이 및 기타 기업들의 모델과는 달라야 할 것입니다.

첫째, [탈중앙화 측면](/developers/docs/web2-vs-web3/)이 있습니다. 기존 플랫폼은 자체 서버를 유지해야 합니다. 탈중앙화된 플랫폼은 사용자에 의해 유지되므로, 플랫폼 소유자가 핵심 플랫폼을 운영하는 데 드는 비용은 0으로 떨어집니다.

다음으로 플랫폼에 접근할 수 있게 해주는 웹사이트나 인터페이스인 프론트엔드가 있습니다. 여기에는 많은 선택지가 있습니다. 플랫폼 소유자는 접근을 제한하고 모든 사람이 수수료를 내며 자신들의 인터페이스를 사용하도록 강제할 수 있습니다. 또한 플랫폼 소유자는 접근을 개방하여(대중에게 권력을!) 누구나 플랫폼에 대한 인터페이스를 구축하도록 결정할 수도 있습니다. 또는 소유자가 이 두 극단 사이의 어떤 방식을 결정할 수도 있습니다.

_저보다 더 뛰어난 비전을 가진 비즈니스 리더들은 이를 수익화하는 방법을 알 것입니다. 제가 아는 것은 이것이 현재의 상태(status quo)와 다르며 아마도 수익성이 있을 것이라는 점뿐입니다._

게다가 자동화 및 결제 측면도 있습니다. 일부 항목은 매우 [효과적으로 토큰화](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com)되어 게시판에서 거래될 수 있습니다. 토큰화된 자산은 블록체인에서 쉽게 전송됩니다. 매우 복잡한 결제 방식도 블록체인에서는 쉽게 구현할 수 있습니다.

저는 여기서 비즈니스 기회의 냄새를 맡고 있습니다. 운영 비용이 없는 게시판을 쉽게 구현할 수 있으며, 각 트랜잭션에 복잡한 결제 경로를 포함할 수 있습니다. 누군가는 이것을 어디에 사용할지에 대한 아이디어를 생각해 낼 것이라고 확신합니다.

저는 그저 이것을 만드는 것이 즐겁습니다. 코드를 살펴보겠습니다.

## 구현 {#implementation}

얼마 전 우리는 비즈니스 사례 구현 예제와 기타 유용한 자료들이 포함된 [오픈 소스 저장소](https://github.com/HQ20/contracts?ref=hackernoon.com)를 시작했습니다. 한번 살펴보시기 바랍니다.

이 [이더리움 게시판](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com)의 코드가 그곳에 있으니, 마음껏 사용해 보시기 바랍니다. 단, 이 코드는 감사를 받지 않았으므로 실제 자금을 투입하기 전에 자체적으로 실사(due diligence)를 수행해야 한다는 점을 유의하세요.

게시판의 기본 원리는 복잡하지 않습니다. 게시판의 모든 광고는 몇 개의 필드를 가진 구조체(struct)일 뿐입니다.

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // 열림, 실행됨, 취소됨
}
```

따라서 광고를 게시하는 사람이 있습니다. 판매할 아이템이 있습니다. 아이템의 가격이 있습니다. 그리고 열림(open), 실행됨(executed), 또는 취소됨(cancelled)이 될 수 있는 거래 상태가 있습니다.

이 모든 거래는 매핑(mapping)에 보관됩니다. Solidity의 모든 것이 매핑인 것처럼 보이기 때문입니다. 또한 편리하기 때문이기도 합니다.

```solidity
mapping(uint256 => Trade) public trades;
```

매핑을 사용한다는 것은 광고를 게시하기 전에 각 광고에 대한 ID를 만들어야 하며, 광고를 조작하기 전에 해당 광고의 ID를 알아야 한다는 것을 의미합니다. 스마트 컨트랙트나 프론트엔드에서 이를 처리하는 방법에는 여러 가지가 있습니다. 조언이 필요하다면 질문해 주세요.

다음으로 우리가 다루는 아이템이 무엇인지, 그리고 트랜잭션 비용을 지불하는 데 사용되는 이 통화가 무엇인지에 대한 질문이 나옵니다.

아이템의 경우, [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com) 인터페이스를 구현하도록 요구할 것입니다. 이는 [디지털 자산에서 가장 잘 작동](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com)하지만, 실제로는 현실 세계의 아이템을 블록체인에 표현하는 방법일 뿐입니다. 우리는 생성자에서 자체 ERC721 컨트랙트를 지정할 것이며, 이는 우리 게시판의 모든 자산이 사전에 토큰화되어 있어야 함을 의미합니다.

결제의 경우에도 비슷한 방식을 취할 것입니다. 대부분의 블록체인 프로젝트는 자체 [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com) 암호화폐를 정의합니다. 다른 프로젝트들은 DAI와 같은 주류 암호화폐를 사용하는 것을 선호합니다. 이 게시판에서는 생성 시점에 어떤 통화를 사용할지 결정하기만 하면 됩니다. 간단합니다.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

거의 다 왔습니다. 우리는 광고, 거래할 아이템, 그리고 결제를 위한 통화를 갖추었습니다. 광고를 만든다는 것은 아이템을 에스크로(escrow)에 넣어 당신이 해당 아이템을 소유하고 있으며, 다른 게시판 등에 중복으로 게시하지 않았음을 보여주는 것을 의미합니다.

아래 코드가 정확히 그 역할을 합니다. 아이템을 에스크로에 넣고, 광고를 생성하며, 몇 가지 정리 작업을 수행합니다.

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

거래를 수락한다는 것은 광고(거래)를 선택하고, 가격을 지불하며, 아이템을 받는 것을 의미합니다. 아래 코드는 거래를 가져옵니다. 거래가 가능한지 확인합니다. 아이템에 대한 비용을 지불합니다. 아이템을 가져옵니다. 광고를 업데이트합니다.

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

마지막으로, 구매자가 수락하기 전에 판매자가 거래를 철회할 수 있는 옵션이 있습니다. 일부 모델에서는 광고가 만료되기 전 일정 기간 동안만 활성화되도록 할 수도 있습니다. 이는 마켓의 설계에 따라 여러분이 선택할 수 있습니다.

이 코드는 거래를 실행하는 데 사용되는 코드와 매우 유사하지만, 통화가 오가지 않으며 아이템이 광고 게시자에게 돌아간다는 점만 다릅니다.

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

이것으로 끝입니다. 구현의 끝까지 오셨습니다. 일부 비즈니스 개념이 코드로 표현될 때 얼마나 간결해지는지 꽤 놀라운데, 이것이 바로 그런 경우 중 하나입니다. [우리 저장소에서](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol) 전체 컨트랙트를 확인해 보세요.

## 결론 {#conclusion}

벼룩시장 게시판은 인터넷과 함께 대규모로 확장된 일반적인 시장 형태이며, 소수의 독점적 승자가 존재하는 매우 인기 있는 비즈니스 모델이 되었습니다.

또한 벼룩시장 게시판은 블록체인 환경에서 복제하기 쉬운 도구이기도 하며, 기존 거대 기업들에 도전할 수 있게 해주는 매우 구체적인 기능들을 갖추고 있습니다.

이 글에서 저는 벼룩시장 게시판 비즈니스의 현실과 기술적 구현을 연결하고자 시도했습니다. 적절한 기술을 갖추고 있다면, 이 지식은 비전을 세우고 구현을 위한 로드맵을 작성하는 데 도움이 될 것입니다.

항상 그렇듯이, 재미있는 것을 만들고 싶고 조언이 필요하시다면 언제든 [연락해 주세요](https://albertocuesta.es/)! 기꺼이 도와드리겠습니다.