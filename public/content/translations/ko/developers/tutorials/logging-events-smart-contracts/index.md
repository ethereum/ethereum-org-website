---
title: "이벤트로 스마트 컨트랙트의 데이터 로깅하기"
description: "스마트 컨트랙트 이벤트에 대한 소개 및 이를 사용하여 데이터를 로깅하는 방법"
author: "jdourlens"
tags: ["스마트 컨트랙트", "Remix", "Solidity", "이벤트"]
skill: intermediate
breadcrumb: "이벤트 로깅"
lang: ko
published: 2020-04-03
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Solidity에서 [이벤트](/developers/docs/smart-contracts/anatomy/#events-and-logs)는 스마트 컨트랙트가 발생시킬 수 있는 발송된 신호입니다. 탈중앙화 애플리케이션 (dapp)이나 이더리움 JSON-RPC API에 연결된 모든 것은 이러한 이벤트를 수신하고 그에 따라 작동할 수 있습니다. 또한 이벤트를 인덱싱하여 나중에 이벤트 기록을 검색할 수 있도록 만들 수도 있습니다.

## 이벤트 {#events}

이더리움 블록체인에서 가장 흔한 이벤트 중 하나는 누군가 토큰을 전송할 때 ERC-20 토큰이 발생시키는 `Transfer` 이벤트입니다.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

이벤트 서명은 컨트랙트 코드 내부에 선언되며 emit 키워드를 사용하여 발생시킬 수 있습니다. 예를 들어, 전송 이벤트는 누가 전송을 보냈는지(_from_), 누구에게 보냈는지(_to_), 그리고 얼마나 많은 토큰이 전송되었는지(_value_)를 로그로 남깁니다.

[첫 번째 스마트 컨트랙트 배포하기](/developers/tutorials/deploying-your-first-smart-contract/)의 `Counter` 스마트 컨트랙트로 돌아가서 값이 변경될 때마다 로그를 남겨보겠습니다. 다음과 같은 모습일 것입니다:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {

    event ValueChanged(uint256 oldValue, uint256 newValue);

    // 카운트 수를 저장하는 unsigned int 타입의 public 변수
    uint256 public count = 0;

    // 카운터를 증가시키는 함수
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // 카운트 값을 가져오는 불필요한 getter
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

다음 사항에 주목하세요:

- **6번째 줄**: 이벤트와 이벤트에 포함될 내용인 이전 값과 새로운 값을 선언합니다.

- **14번째 줄**: count 변수를 증가시킬 때 이벤트를 발생시킵니다.

이제 컨트랙트를 배포하고 increment 함수를 호출한 후, logs라는 이름의 배열 안에 있는 새로운 트랜잭션을 클릭하면 Remix가 이를 자동으로 표시하는 것을 볼 수 있습니다.

![Remix 스크린샷](./remix-screenshot.png)

로그는 스마트 컨트랙트를 디버깅하는 데 매우 유용하지만, 여러 사람이 사용하는 애플리케이션을 구축할 때도 중요하며 스마트 컨트랙트가 어떻게 사용되는지 추적하고 이해하기 위한 분석을 더 쉽게 만들어 줍니다. 트랜잭션에 의해 생성된 로그는 널리 사용되는 블록 탐색기에 표시되며, 예를 들어 특정 이벤트를 수신하고 이벤트가 발생할 때 조치를 취하는 오프체인 스크립트를 만드는 데 사용할 수도 있습니다.
