---
title: "Waffle 라이브러리를 사용한 간단한 스마트 계약 테스트"
description: "초보자를 위한 튜토리얼"
author: Ewa Kowalska
tags: ["smart contracts", "solidity", "waffle", "testing"]
skill: beginner
lang: ko
published: 2021-02-26
---

## 본 튜토리얼에서는 다음 내용을 알아봅니다 {#in-this-tutorial-youll-learn-how-to}

- 지갑 잔액 변경 테스트하기
- 특정 인수를 사용하여 이벤트 발행 테스트하기
- 트랜잭션이 되돌려졌는지 확인하기

## 사전 지식 {#assumptions}

- 새로운 JavaScript 또는 TypeScript 프로젝트를 생성할 수 있어야 합니다.
- JavaScript 테스트에 대한 기본적인 경험이 있어야 합니다.
- yarn 또는 npm과 같은 패키지 관리자를 사용해본 경험이 있어야 합니다.
- 스마트 계약 및 솔리디티에 대한 아주 기본적인 지식이 있어야 합니다.

## 시작하기 {#getting-started}

이 튜토리얼에서는 yarn을 사용하여 테스트를 설정하고 실행하는 방법을 시연하지만, npm을 선호하셔도 문제 없습니다. 공식 Waffle [개발문서](https://ethereum-waffle.readthedocs.io/en/latest/index.html)에 대한 적절한 참조를 제공해 드리겠습니다.

## 의존성 설치 {#install-dependencies}

[프로젝트의 개발 의존성(dev dependencies)에](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation) ethereum-waffle 및 typescript 의존성을 추가합니다.

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## 예제 스마트 계약 {#example-smart-contract}

튜토리얼을 진행하는 동안 간단한 스마트 계약 예제인 EtherSplitter를 다룰 것입니다. 이 계약은 누구나 wei를 보내면 사전 정의된 두 명의 수신자에게 균등하게 분할하는 기능 외에는 별다른 기능이 없습니다.
split 함수는 wei의 양이 짝수여야 하며, 그렇지 않으면 되돌려집니다. 두 수신자 모두에 대해 wei 전송을 수행한 다음 Transfer 이벤트를 발행합니다.

EtherSplitter 코드 스니펫을 `src/EtherSplitter.sol`에 배치합니다.

```solidity
pragma solidity ^0.6.0;

contract EtherSplitter {
    address payable receiver1;
    address payable receiver2;

    event Transfer(address from, address to, uint256 amount);

    constructor(address payable _address1, address payable _address2) public {
        receiver1 = _address1;
        receiver2 = _address2;
    }

    function split() public payable {
        require(msg.value % 2 == 0, 'Uneven wei amount not allowed');
        receiver1.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver1, msg.value / 2);
        receiver2.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver2, msg.value / 2);
    }
}
```

## 계약 컴파일하기 {#compile-the-contract}

계약을 [컴파일](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract)하려면 package.json 파일에 다음 항목을 추가하세요.

```json
"scripts": {
    "build": "waffle"
  }
```

다음으로, 프로젝트 루트 디렉터리에 Waffle 구성 파일인 `waffle.json`을 만들고 다음 구성을 붙여넣습니다.

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

`yarn build`를 실행합니다. 결과적으로 `build` 디렉터리가 나타나며 컴파일된 EtherSplitter 계약이 JSON 형식으로 저장됩니다.

## 테스트 설정 {#test-setup}

Waffle로 테스트하려면 Chai 매처와 Mocha를 사용해야 하므로 프로젝트에 [추가](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)해야 합니다. package.json 파일을 업데이트하고 scripts 부분에 `test` 항목을 추가합니다.

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

테스트를 [실행](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests)하려면 `yarn test`를 실행하기만 하면 됩니다.

## 테스트 {#testing}

이제 `test` 디렉터리를 만들고 새 파일 `test\EtherSplitter.test.ts`를 만듭니다.
아래 스니펫을 복사하여 테스트 파일에 붙여넣으세요.

```ts
import { expect, use } from "chai"
import { Contract } from "ethers"
import { deployContract, MockProvider, solidity } from "ethereum-waffle"
import EtherSplitter from "../build/EtherSplitter.json"

use(solidity)

describe("Ether Splitter", () => {
  const [sender, receiver1, receiver2] = new MockProvider().getWallets()
  let splitter: Contract

  beforeEach(async () => {
    splitter = await deployContract(sender, EtherSplitter, [
      receiver1.address,
      receiver2.address,
    ])
  })

  // 여기에 테스트를 추가합니다
})
```

시작하기 전에 몇 가지 말씀드리겠습니다.
`MockProvider`는 블록체인의 모의 버전을 제공합니다. 또한 EtherSplitter 계약 테스트에 사용할 모의 지갑도 제공합니다. provider에서 `getWallets()` 메서드를 호출하여 최대 10개의 지갑을 얻을 수 있습니다. 이 예제에서는 발신자용 지갑 1개와 수신자용 지갑 2개, 총 3개의 지갑을 받습니다.

다음으로 'splitter'라는 변수를 선언합니다. 이것이 우리의 모의 EtherSplitter 계약입니다. `deployContract` 메서드에 의해 단일 테스트가 실행되기 전에 생성됩니다. 이 메서드는 첫 번째 매개변수로 전달된 지갑(이 경우 발신자의 지갑)에서 계약을 배포하는 것을 시뮬레이션합니다. 두 번째 매개변수는 테스트된 계약의 ABI와 바이트코드입니다. 여기에 `build` 디렉터리에서 컴파일된 EtherSplitter 계약의 json 파일을 전달합니다. 세 번째 매개변수는 계약의 생성자 인수가 있는 배열이며, 이 경우 두 수신자의 주소입니다.

## changeBalances {#changebalances}

먼저, split 메서드가 실제로 수신자 지갑의 잔액을 변경하는지 확인하겠습니다. 발신자 계정에서 50 wei를 분할하면 두 수신자 모두의 잔액이 25 wei씩 증가할 것으로 예상합니다. Waffle의 `changeBalances` 매처를 사용하겠습니다.

```ts
it("Changes accounts balances", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

매처의 첫 번째 매개변수로는 수신자 지갑의 배열을 전달하고, 두 번째 매개변수로는 해당 계정에서 예상되는 증가량의 배열을 전달합니다.
특정 지갑 하나의 잔액을 확인하고 싶다면 아래 예시처럼 배열을 전달할 필요가 없는 `changeBalance` 매처를 사용할 수도 있습니다.

```ts
it("Changes account balance", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

`changeBalance`와 `changeBalances`의 두 경우 모두, 매처가 호출 전후의 잔액 상태에 접근해야 하므로 split 함수를 콜백으로 전달한다는 점에 유의하세요.

다음으로, 각 wei 전송 후 Transfer 이벤트가 발행되었는지 테스트하겠습니다. Waffle의 다른 매처를 살펴보겠습니다.

## Emit {#emit}

```ts
it("Emits event on the transfer to the first receiver", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("Emits event on the transfer to the second receiver", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

`emit` 매처를 사용하면 메서드를 호출할 때 계약이 이벤트를 발행했는지 확인할 수 있습니다. `emit` 매처의 매개변수로, 이벤트를 발행할 것으로 예상되는 모의 계약과 해당 이벤트의 이름을 제공합니다. 우리의 경우 모의 계약은 `splitter`이고 이벤트 이름은 `Transfer`입니다. 이벤트가 발행될 때 사용된 인수의 정확한 값을 확인할 수도 있습니다. 이벤트 선언이 예상하는 만큼의 인수를 `withArgs` 매처에 전달합니다. EtherSplitter 계약의 경우, 발신자와 수신자의 주소와 함께 전송된 wei 금액을 전달합니다.

## revertedWith {#revertedwith}

마지막 예로, wei의 양이 홀수인 경우 트랜잭션이 되돌려졌는지 확인하겠습니다. `revertedWith` 매처를 사용하겠습니다.

```ts
it("Reverts when Vei amount uneven", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "Uneven wei amount not allowed"
  )
})
```

테스트를 통과하면 트랜잭션이 실제로 되돌려졌음을 보장합니다. 그러나 `require` 문에 전달한 메시지와 `revertedWith`에서 예상하는 메시지 간에 정확히 일치해야 합니다. EtherSplitter 계약의 코드로 돌아가 보면, wei 양에 대한 `require` 문에서 'Uneven wei amount not allowed'라는 메시지를 제공합니다. 이는 테스트에서 예상하는 메시지와 일치합니다. 만약 같지 않다면 테스트는 실패할 것입니다.

## 축하합니다! {#congratulations}

Waffle을 사용하여 스마트 계약을 테스트하는 데 큰 첫걸음을 내디뎠습니다!
