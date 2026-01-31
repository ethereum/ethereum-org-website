---
title: "첫 번째 스마트 계약 배포하기"
description: "이더리움 테스트넷에 첫 스마트 계약 배포하기 소개"
author: "jdourlens"
tags: [ "스마트 계약", "리믹스", "솔리디티", "배포하기" ]
skill: beginner
lang: ko
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

여러분도 저희처럼 이더리움 블록체인에서 첫 [스마트 계약](/developers/docs/smart-contracts/)을 [배포](/developers/docs/smart-contracts/deploying/)하고 상호작용하는 것에 대해 기대가 크실 것으로 생각합니다.

걱정 마세요. 첫 스마트 계약이니만큼 [로컬 테스트넷](/developers/docs/networks/)에 배포할 것이므로, 배포하고 원하는 만큼 자유롭게 테스트해보는 데 비용이 전혀 들지 않습니다.

## 계약 작성하기 {#writing-our-contract}

[Remix에 방문](https://remix.ethereum.org/)하여 새 파일을 만드는 것이 첫 번째 단계입니다. Remix 인터페이스 왼쪽 상단에서 새 파일을 추가하고 원하는 파일 이름을 입력하세요.

![Remix 인터페이스에서 새 파일 추가하기](./remix.png)

새 파일에 다음 코드를 붙여넣습니다.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // 카운트 수를 저장하는 부호 없는 정수 유형의 공개 변수
    uint256 public count = 0;

    // 카운터를 증가시키는 함수
    function increment() public {
        count += 1;
    }

    // 카운트 값을 가져오기 위한 필수적이지 않은 getter
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

프로그래밍에 익숙하다면 이 프로그램이 무엇을 하는지 쉽게 추측할 수 있습니다. 한 줄씩 설명해 보겠습니다.

- 4번 줄: `Counter`라는 이름의 계약을 정의합니다.
- 7번 줄: 계약은 0에서 시작하는 `count`라는 이름의 부호 없는 정수 하나를 저장합니다.
- 10번 줄: 첫 번째 함수는 계약의 상태를 수정하고 `count` 변수를 `increment()`합니다.
- 15번 줄: 두 번째 함수는 스마트 계약 외부에서 `count` 변수의 값을 읽을 수 있게 해주는 getter일 뿐입니다. 참고로, `count` 변수를 public으로 정의했기 때문에 이 함수는 필수는 아니지만 예시로 보여드립니다.

첫 번째 간단한 스마트 계약에 대한 설명은 여기까지입니다. 아시다시피, 이것은 Java나 C++와 같은 OOP(객체 지향 프로그래밍) 언어의 클래스와 비슷해 보입니다. 이제 우리 계약을 다뤄볼 시간입니다.

## 계약 배포하기 {#deploying-our-contract}

첫 번째 스마트 계약을 작성했으니, 이제 블록체인에 배포하여 테스트해 보겠습니다.

[블록체인에 스마트 계약을 배포하는 것](/developers/docs/smart-contracts/deploying/)은 사실 수신자를 지정하지 않고 컴파일된 스마트 계약의 코드가 포함된 트랜잭션을 보내는 것일 뿐입니다.

먼저 왼쪽의 컴파일 아이콘을 클릭하여 [계약을 컴파일합니다](/developers/docs/smart-contracts/compiling/):

![Remix 툴바의 컴파일 아이콘](./remix-compile-button.png)

그런 다음 컴파일 버튼을 클릭하세요:

![Remix Solidity 컴파일러의 컴파일 버튼](./remix-compile.png)

텍스트 편집기에서 내용을 저장할 때 계약이 항상 컴파일되도록 '자동 컴파일' 옵션을 선택할 수 있습니다.

그런 다음 'deploy and run transactions' 화면으로 이동합니다:

![Remix 툴바의 배포 아이콘](./remix-deploy.png)

'deploy and run transactions' 화면에서 계약 이름이 나타나는지 다시 확인하고 배포(Deploy)를 클릭하세요. 페이지 상단에서 볼 수 있듯이 현재 환경은 'JavaScript VM'입니다. 이는 더 빠르고 수수료 없이 테스트하기 위해 로컬 테스트 블록체인에 스마트 계약을 배포하고 상호작용한다는 의미입니다.

![Remix Solidity 컴파일러의 배포 버튼](./remix-deploy-button.png)

'배포(Deploy)' 버튼을 클릭하면 하단에 계약이 표시됩니다. 왼쪽의 화살표를 클릭하여 확장하면 계약 내용을 볼 수 있습니다. 이것은 우리의 `counter` 변수와, `increment()` 함수, 그리고 getter인 `getCounter()`입니다.

`count` 또는 `getCount` 버튼을 클릭하면 실제로 계약의 `count` 변수 내용을 가져와 표시합니다. 아직 `increment` 함수를 호출하지 않았으므로 0이 표시되어야 합니다.

![Remix Solidity 컴파일러의 함수 버튼](./remix-function-button.png)

이제 버튼을 클릭하여 increment 함수를 호출해 보겠습니다. 창 하단에 생성된 트랜잭션의 로그가 나타나는 것을 볼 수 있습니다. `increment` 버튼 대신 데이터를 가져오는 버튼을 누를 때 로그가 다른 것을 볼 수 있습니다. 이는 블록체인에서 데이터를 읽는 데는 트랜잭션(쓰기)이나 수수료가 필요하지 않기 때문입니다. 블록체인의 상태를 수정하는 경우에만 트랜잭션을 생성해야 하기 때문입니다.

![트랜잭션 로그](./transaction-log.png)

`increment()` 함수를 호출하는 트랜잭션을 생성하는 increment 버튼을 누른 후, count 또는 getCount 버튼을 다시 클릭하면 count 변수가 0보다 커져 새로 업데이트된 스마트 계약의 상태를 읽게 됩니다.

![새롭게 업데이트된 스마트 계약 상태](./updated-state.png)

다음 튜토리얼에서는 [스마트 계약에 이벤트를 추가하는 방법](/developers/tutorials/logging-events-smart-contracts/)에 대해 다룹니다. 이벤트 로깅은 스마트 계약을 디버깅하고 함수를 호출하는 동안 어떤 일이 발생하는지 이해하는 편리한 방법입니다.
