---
title: 오라클로 텔러를 설정하는 방법
description: 프로토콜에 텔러 오라클을 통합하여 시작하기 위한 가이드
author: "텔러"
lang: ko
tags: ["솔리디티", "스마트 컨트랙트", "오라클"]
skill: beginner
breadcrumb: 텔러 오라클
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

깜짝 퀴즈: 프로토콜이 거의 완성되었지만, 오프체인 데이터에 접근하기 위해 오라클이 필요합니다... 어떻게 해야 할까요?

## (가벼운) 전제 조건 {#soft-prerequisites}

이 글은 오라클 피드에 접근하는 방법을 최대한 간단하고 직관적으로 만드는 것을 목표로 합니다. 따라서 오라클 측면에 집중하기 위해 여러분의 코딩 실력에 대해 다음과 같이 가정하고 있습니다.

가정:

- 터미널을 다룰 수 있습니다.
- npm이 설치되어 있습니다.
- npm을 사용하여 종속성을 관리하는 방법을 알고 있습니다.

텔러는 구현 준비가 완료된 라이브 오픈 소스 오라클입니다. 이 초보자 가이드는 텔러를 얼마나 쉽게 시작하고 실행할 수 있는지 보여주며, 여러분의 프로젝트에 완전히 탈중앙화된 검열 저항성 오라클을 제공하기 위해 작성되었습니다.

## 개요 {#overview}

텔러는 당사자들이 오프체인 데이터 포인트(예: BTC/USD)의 값을 요청할 수 있고, 보고자들이 이 값을 모든 이더리움 스마트 컨트랙트가 접근할 수 있는 온체인 데이터 뱅크에 추가하기 위해 경쟁하는 오라클 시스템입니다. 이 데이터 뱅크에 대한 입력은 스테이킹한 보고자들의 네트워크에 의해 보호됩니다. 텔러는 암호화폐 경제적 인센티브 메커니즘을 활용하여, 보고자의 정직한 데이터 제출에 보상하고 텔러의 토큰인 트리뷰트(TRB) 발행과 분쟁 메커니즘을 통해 악의적인 행위자를 처벌합니다.

이 튜토리얼에서는 다음 내용을 다룹니다:

- 시작하고 실행하는 데 필요한 초기 툴킷 설정하기.
- 간단한 예제 살펴보기.
- 현재 텔러를 테스트할 수 있는 네트워크의 테스트넷 주소 나열하기.

## UsingTellor {#usingtellor}

가장 먼저 해야 할 일은 텔러를 오라클로 사용하는 데 필요한 기본 도구를 설치하는 것입니다. [이 패키지](https://github.com/tellor-io/usingtellor)를 사용하여 텔러 사용자 컨트랙트를 설치하세요:

`npm install usingtellor`

설치가 완료되면 여러분의 컨트랙트가 'UsingTellor' 컨트랙트에서 함수를 상속받을 수 있습니다.

좋습니다! 이제 도구가 준비되었으니, 비트코인 가격을 가져오는 간단한 연습을 해보겠습니다:

### BTC/USD 예제 {#btcusd-example}

텔러 주소를 생성자 인수로 전달하여 UsingTellor 컨트랙트를 상속받습니다:

다음은 예제입니다:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //이 컨트랙트는 이제 UsingTellor의 모든 함수에 접근할 수 있습니다.

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

전체 컨트랙트 주소 목록은 [여기](https://docs.tellor.io/tellor/the-basics/contracts-reference)를 참조하세요.

사용 편의성을 위해 UsingTellor 저장소에는 더 쉬운 통합을 위한 [텔러 플레이그라운드(Tellor Playground)](https://github.com/tellor-io/TellorPlayground) 컨트랙트 버전이 포함되어 있습니다. 유용한 함수 목록은 [여기](https://github.com/tellor-io/sampleUsingTellor#tellor-playground)를 참조하세요.

텔러 오라클의 더 강력한 구현을 원하신다면, [여기](https://github.com/tellor-io/usingtellor/blob/master/README.md)에서 사용 가능한 전체 함수 목록을 확인하세요.