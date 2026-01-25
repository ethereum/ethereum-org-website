---
title: 이벤트를 사용하여 스마트 계약 데이터를 기록하기
description: 스마트 계약 이벤트 소개 및 이를 데이터 기록에 사용하는 방법
author: "jdourlens"
tags: [ "스마트 계약", "리믹스", "솔리디티", "이벤트" ]
skill: intermediate
lang: ko
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Solidity에서 [이벤트](/developers/docs/smart-contracts/anatomy/#events-and-logs)는 스마트 계약이 발생시킬 수 있는 디스패치된 신호입니다. 탈중앙화앱 또는 이더리움 JSON-RPC API에 연결된 모든 것은 이러한 이벤트를 수신하고 그에 따라 작동할 수 있습니다. 이벤트는 나중에 이벤트 기록을 검색할 수 있도록 인덱싱될 수도 있습니다.

## 이벤트 {#events}

이 글을 작성하는 시점에서 이더리움 블록체인에서 가장 흔한 이벤트는 누군가 토큰을 전송할 때 ERC20 토큰에 의해 발생하는 Transfer 이벤트입니다.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

이벤트 서명은 계약 코드 내부에 선언되며 emit 키워드를 사용하여 발생시킬 수 있습니다. 예를 들어, transfer 이벤트는 누가 전송했는지(_from_), 누구에게(_to_), 그리고 얼마만큼의 토큰이 전송되었는지(_value_)를 기록합니다.

Counter 스마트 계약으로 돌아가서 값이 변경될 때마다 기록을 남긴다고 해봅시다. 이 계약은 배포를 위한 것이 아니라 다른 계약을 확장하여 구축하기 위한 기반 역할을 하므로, 추상 계약이라고 합니다. 카운터 예시의 경우 다음과 같습니다:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // 카운트 수를 유지하기 위한 부호 없는 정수 유형의 비공개 변수
    uint256 private count = 0;

    // 카운터를 증가시키는 함수
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // 카운트 값을 가져오는 getter
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

다음 사항을 참고하세요:

- **5행**: 이벤트를 선언하고 이벤트에 포함될 내용인 이전 값과 새 값을 정의합니다.

- **13행**: count 변수를 증가시킬 때 이벤트를 발생시킵니다.

이제 계약을 배포하고 increment 함수를 호출하면, logs라는 이름의 배열 내에서 새 트랜잭션을 클릭했을 때 Remix가 자동으로 이를 표시하는 것을 볼 수 있습니다.

![Remix 스크린샷](./remix-screenshot.png)

로그는 스마트 계약을 디버깅하는 데 매우 유용합니다. 또한 여러 사람이 사용하는 애플리케이션을 구축하는 경우, 스마트 계약의 사용 방식을 추적하고 이해하기 위한 분석을 용이하게 해주므로 중요합니다. 트랜잭션으로 생성된 로그는 인기 있는 블록 탐색기에 표시되며, 이를 사용하여 특정 이벤트를 수신하고 이벤트 발생 시 조치를 취하는 오프체인 스크립트를 생성할 수도 있습니다.
