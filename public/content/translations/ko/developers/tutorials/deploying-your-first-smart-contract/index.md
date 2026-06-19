---
title: 첫 번째 스마트 컨트랙트 배포하기
description: 이더리움 테스트 네트워크에 첫 번째 스마트 컨트랙트를 배포하는 방법에 대한 소개
author: "jdourlens"
tags: ["스마트 컨트랙트", "Remix", "Solidity", "배포"]
skill: beginner
breadcrumb: 첫 번째 컨트랙트 배포
lang: ko
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

여러분도 저희만큼 이더리움 블록체인에 첫 번째 [스마트 컨트랙트](/developers/docs/smart-contracts/)를 [배포하고](/developers/docs/smart-contracts/deploying/) 상호작용하는 것에 대해 기대하고 계실 것입니다.

걱정하지 마세요. 첫 번째 스마트 컨트랙트이므로 [로컬 테스트 네트워크](/developers/docs/networks/)에 배포할 것입니다. 따라서 배포하는 데 비용이 전혀 들지 않으며 원하는 만큼 마음껏 테스트해 볼 수 있습니다.

## 컨트랙트 작성하기 {#writing-our-contract}

첫 번째 단계는 [Remix에 접속하여](https://remix.ethereum.org/) 새 파일을 만드는 것입니다. Remix 인터페이스의 왼쪽 상단에서 새 파일을 추가하고 원하는 파일 이름을 입력하세요.

![Adding a new file in the Remix interface](./remix.png)

새 파일에 다음 코드를 붙여넣습니다.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // 카운트 횟수를 저장하는 unsigned int 타입의 public 변수
    uint256 public count = 0;

    // 카운터를 증가시키는 함수
    function increment() public {
        count += 1;
    }

    // 카운트 값을 가져오기 위한 불필요한 getter
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

프로그래밍에 익숙하다면 이 프로그램이 어떤 역할을 하는지 쉽게 짐작할 수 있을 것입니다. 다음은 각 줄에 대한 설명입니다.

- 4번째 줄: `Counter`라는 이름의 컨트랙트를 정의합니다.
- 7번째 줄: 컨트랙트는 0으로 시작하는 `count`라는 이름의 부호 없는 정수(unsigned integer) 하나를 저장합니다.
- 10번째 줄: 첫 번째 함수는 컨트랙트의 상태를 수정하고 `count` 변수를 `increment()`(증가)합니다.
- 15번째 줄: 두 번째 함수는 스마트 컨트랙트 외부에서 `count` 변수의 값을 읽을 수 있게 해주는 단순한 getter입니다. `count` 변수를 public으로 정의했기 때문에 이 함수가 반드시 필요한 것은 아니지만, 예시로 보여드리기 위해 작성되었습니다.

이것이 우리의 첫 번째 간단한 스마트 컨트랙트의 전부입니다. 아시다시피, Java나 C++ 같은 객체 지향 프로그래밍(OOP) 언어의 클래스와 비슷해 보입니다. 이제 컨트랙트를 직접 실행해 볼 시간입니다.

## 컨트랙트 배포하기 {#deploying-our-contract}

첫 번째 스마트 컨트랙트를 작성했으니, 이제 이를 실행해 볼 수 있도록 블록체인에 배포해 보겠습니다.

[블록체인에 스마트 컨트랙트를 배포하는 것](/developers/docs/smart-contracts/deploying/)은 사실 수신자를 지정하지 않고 컴파일된 스마트 컨트랙트의 코드가 포함된 트랜잭션을 전송하는 것일 뿐입니다.

먼저 왼쪽의 컴파일 아이콘을 클릭하여 [컨트랙트를 컴파일](/developers/docs/smart-contracts/compiling/)합니다.

![The compile icon in the Remix toolbar](./remix-compile-button.png)

그런 다음 컴파일 버튼을 클릭합니다.

![The compile button in the Remix solidity compiler](./remix-compile.png)

"Auto compile(자동 컴파일)" 옵션을 선택하면 텍스트 편집기에서 내용을 저장할 때마다 컨트랙트가 항상 컴파일되도록 할 수 있습니다.

그런 다음 "deploy and run transactions(트랜잭션 배포 및 실행)" 화면으로 이동합니다.

![The deploy icon in the Remix toolbar](./remix-deploy.png)

"deploy and run transactions" 화면에 들어오면 컨트랙트 이름이 나타나는지 다시 한번 확인하고 Deploy(배포)를 클릭합니다. 페이지 상단에서 볼 수 있듯이 현재 환경은 "JavaScript VM"입니다. 이는 수수료 없이 더 빠르게 테스트할 수 있도록 로컬 테스트 블록체인에 스마트 컨트랙트를 배포하고 상호작용한다는 것을 의미합니다.

![The deploy button in the Remix solidity compiler](./remix-deploy-button.png)

"Deploy" 버튼을 클릭하면 하단에 컨트랙트가 나타나는 것을 볼 수 있습니다. 왼쪽의 화살표를 클릭하여 확장하면 컨트랙트의 내용을 볼 수 있습니다. 여기에는 `counter` 변수, `increment()` 함수, 그리고 getter인 `getCounter()`가 있습니다.

`count` 또는 `getCount` 버튼을 클릭하면 실제로 컨트랙트의 `count` 변수 내용을 가져와서 표시합니다. 아직 `increment` 함수를 호출하지 않았으므로 0이 표시되어야 합니다.

![The function button in the Remix solidity compiler](./remix-function-button.png)

이제 버튼을 클릭하여 `increment` 함수를 호출해 보겠습니다. 창 하단에 생성된 트랜잭션의 로그가 나타나는 것을 볼 수 있습니다. `increment` 버튼 대신 데이터를 가져오는 버튼을 누를 때 로그가 다르게 나타나는 것을 확인할 수 있습니다. 이는 블록체인에서 데이터를 읽는 데는 트랜잭션(쓰기)이나 수수료가 필요하지 않기 때문입니다. 블록체인의 상태를 수정할 때만 트랜잭션을 생성해야 합니다.

![A log of transactions](./transaction-log.png)

`increment()` 함수를 호출하는 트랜잭션을 생성하는 increment 버튼을 누른 후, 다시 count 또는 getCount 버튼을 클릭하면 count 변수가 0보다 커진 스마트 컨트랙트의 새로 업데이트된 상태를 읽게 됩니다.

![Newly updated state of the smart contract](./updated-state.png)

다음 튜토리얼에서는 [스마트 컨트랙트에 이벤트를 추가하는 방법](/developers/tutorials/logging-events-smart-contracts/)을 다루겠습니다. 이벤트를 로깅하는 것은 스마트 컨트랙트를 디버깅하고 함수를 호출하는 동안 어떤 일이 일어나고 있는지 이해하는 편리한 방법입니다.