---
title: "Waffle: 동적 모킹 및 계약 호출 테스트"
description: 동적 모킹 및 계약 호출 테스트를 위한 고급 Waffle 튜토리얼
author: "Daniel Izdebski"
tags: [ "waffle", "스마트 계약", "솔리디티", "테스트", "모킹" ]
skill: intermediate
lang: ko
published: 2020-11-14
---

## 이 튜토리얼은 무엇에 관한 것인가요? {#what-is-this-tutorial-about}

이 튜토리얼에서는 다음을 배우게 됩니다.

- 동적 모킹 사용하기
- 스마트 계약 간의 상호작용 테스트하기

가정 사항:

- `솔리디티`로 간단한 스마트 계약을 작성하는 방법을 이미 알고 있습니다
- `JavaScript` 및 `TypeScript`에 익숙합니다
- 다른 `Waffle` 튜토리얼을 완료했거나 Waffle에 대해 어느 정도 알고 있습니다

## 동적 모킹 {#dynamic-mocking}

동적 모킹이 유용한 이유는 무엇일까요? 동적 모킹을 사용하면 통합 테스트 대신 단위 테스트를 작성할 수 있습니다. 이것은 무엇을 의미할까요? 이는 스마트 계약의 종속성에 대해 걱정할 필요가 없으므로 모든 계약을 완전히 분리하여 테스트할 수 있음을 의미합니다. 정확히 어떻게 할 수 있는지 보여드리겠습니다.

### **1.** 프로젝트\*\* {#1-project}

시작하기 전에 간단한 node.js 프로젝트를 준비해야 합니다.

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# 또는 npm을 사용하는 경우
npm init
```

먼저 typescript와 테스트 종속성인 mocha와 chai를 추가해 보겠습니다.

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# 또는 npm을 사용하는 경우
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

이제 `Waffle`과 `ethers`를 추가해 보겠습니다.

```bash
yarn add --dev ethereum-waffle ethers
# 또는 npm을 사용하는 경우
npm install ethereum-waffle ethers --save-dev
```

이제 프로젝트 구조는 다음과 같을 것입니다.

```
.
├── contracts
├── package.json
└── test
```

### **2.** 스마트 계약\*\* {#2-smart-contract}

동적 모킹을 시작하려면 종속성이 있는 스마트 계약이 필요합니다. 걱정 마세요, 제가 다 준비해 뒀습니다!

여기 우리가 부자인지 확인하는 것을 유일한 목적으로 하는 `솔리디티`로 작성된 간단한 스마트 계약이 있습니다. 이 계약은 ERC20 토큰을 사용하여 우리가 충분한 토큰을 가지고 있는지 확인합니다. 이 코드를 `./contracts/AmIRichAlready.sol`에 넣으세요.

```solidity
pragma solidity ^0.6.2;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract AmIRichAlready {
    IERC20 private tokenContract;
    uint public richness = 1000000 * 10 ** 18;

    constructor (IERC20 _tokenContract) public {
        tokenContract = _tokenContract;
    }

    function check() public view returns (bool) {
        uint balance = tokenContract.balanceOf(msg.sender);
        return balance > richness;
    }
}
```

동적 모킹을 사용하기 때문에 전체 ERC20이 필요하지 않으므로, 함수가 하나만 있는 IERC20 인터페이스를 사용합니다.

이제 이 계약을 빌드할 시간입니다! 이를 위해 `Waffle`을 사용합니다. 먼저 컴파일 옵션을 지정하는 간단한 `waffle.json` 설정 파일을 생성합니다.

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

이제 Waffle로 계약을 빌드할 준비가 되었습니다.

```bash
npx waffle
```

쉽죠? `build/` 폴더에 계약 및 인터페이스에 해당하는 두 개의 파일이 나타났습니다. 이 파일들은 나중에 테스트에 사용될 것입니다.

### **3.** 테스트\*\* {#3-testing}

실제 테스트를 위해 `AmIRichAlready.test.ts`라는 파일을 만듭니다. 우선, 가져오기(import)를 처리해야 합니다. 나중에 필요하므로 다음과 같이 가져옵니다.

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"
```

JS 종속성 외에도, 빌드된 계약과 인터페이스를 가져와야 합니다.

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

Waffle은 테스트에 `chai`를 사용합니다. 하지만 사용하기 전에 Waffle의 매처를 chai 자체에 주입해야 합니다.

```typescript
use(solidity)
```

각 테스트 전에 계약의 상태를 재설정하는 `beforeEach()` 함수를 구현해야 합니다. 무엇이 필요한지 먼저 생각해 봅시다. 계약을 배포하려면 두 가지가 필요합니다. 지갑과 `AmIRichAlready` 계약의 인수로 전달할 배포된 ERC20 계약입니다.

먼저 지갑을 생성합니다.

```typescript
const [wallet] = new MockProvider().getWallets()
```

그런 다음 ERC20 계약을 배포해야 합니다. 여기서 까다로운 부분은 인터페이스만 있다는 것입니다. 이 부분에서 Waffle이 우리를 구해줍니다. Waffle에는 인터페이스의 _abi_만을 사용하여 계약을 생성하는 마법 같은 `deployMockContract()` 함수가 있습니다.

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

이제 지갑과 배포된 ERC20을 모두 사용하여 `AmIRichAlready` 계약을 배포할 수 있습니다.

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

이것으로 `beforeEach()` 함수가 완성되었습니다. 지금까지 작성한 `AmIRichAlready.test.ts` 파일은 다음과 같을 것입니다.

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"

import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"

use(solidity)

describe("Am I Rich Already", () => {
  let mockERC20: Contract
  let contract: Contract
  let wallet: Wallet

  beforeEach(async () => {
    ;[wallet] = new MockProvider().getWallets()
    mockERC20 = await deployMockContract(wallet, IERC20.abi)
    contract = await deployContract(wallet, AmIRichAlready, [mockERC20.address])
  })
})
```

이제 `AmIRichAlready` 계약에 대한 첫 번째 테스트를 작성해 보겠습니다. 테스트가 무엇에 관한 것이어야 한다고 생각하시나요? 네, 맞습니다! 우리가 이미 부자인지 확인해야 합니다 :)

하지만 잠시만요. 모킹된 계약이 어떤 값을 반환해야 할지 어떻게 알 수 있을까요? `balanceOf()` 함수에 대한 어떠한 로직도 구현하지 않았습니다. 여기서도 Waffle이 도움을 줄 수 있습니다. 이제 모킹된 계약에는 몇 가지 멋진 새로운 기능이 추가되었습니다.

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

이 지식을 바탕으로 드디어 첫 번째 테스트를 작성할 수 있습니다.

```typescript
it("지갑에 1,000,000개 미만의 토큰이 있으면 false를 반환합니다", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

이 테스트를 여러 부분으로 나눠 보겠습니다.

1. 모의 ERC20 계약이 항상 999999 토큰의 잔액을 반환하도록 설정합니다.
2. `contract.check()` 메서드가 `false`를 반환하는지 확인합니다.

이제 실행할 준비가 되었습니다.

![하나의 테스트 통과](./test-one.png)

테스트는 작동하지만... 아직 개선의 여지가 있습니다. `balanceOf()` 함수는 항상 999999를 반환합니다. 실제 계약처럼 함수가 특정 지갑에 대해 값을 반환하도록 지정하여 개선할 수 있습니다.

```typescript
it("지갑에 1,000,001개 미만의 토큰이 있으면 false를 반환합니다", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

지금까지는 충분히 부자가 아닌 경우만 테스트했습니다. 대신 반대의 경우를 테스트해 보겠습니다.

```typescript
it("지갑에 1,000,001개 이상의 토큰이 있으면 true를 반환합니다", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

테스트를 실행하면...

![두 개의 테스트 통과](test-two.png)

...바로 이겁니다! 우리 계약은 의도한 대로 작동하는 것 같습니다 :)

## 계약 호출 테스트 {#testing-contract-calls}

지금까지 한 일을 요약해 보겠습니다. `AmIRichAlready` 계약의 기능을 테스트했으며 제대로 작동하는 것 같습니다. 그럼 이제 끝난 건가요? 꼭 그렇지는 않습니다! Waffle을 사용하면 계약을 더 깊이 테스트할 수 있습니다. 정확히 어떻게 할 수 있을까요? Waffle이 제공하는 기능 중에는 `calledOnContract()` 및 `calledOnContractWith()` 매처가 있습니다. 이 매처들을 사용하면 우리 계약이 ERC20 모의 계약을 호출했는지 확인할 수 있습니다. 이 매처 중 하나를 사용한 기본 테스트는 다음과 같습니다.

```typescript
it("계약이 ERC20 토큰에서 balanceOf를 호출했는지 확인합니다", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

더 나아가 제가 말씀드린 다른 매처로 이 테스트를 개선할 수 있습니다.

```typescript
it("계약이 ERC20 토큰에서 특정 지갑으로 balanceOf를 호출했는지 확인합니다", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

테스트가 올바른지 확인해 보겠습니다.

![세 개의 테스트 통과](test-three.png)

좋습니다, 모든 테스트가 통과되었습니다.

Waffle로 계약 호출을 테스트하는 것은 매우 쉽습니다. 그리고 가장 좋은 점은 이겁니다. 이 매처들은 일반 계약과 모킹된 계약 모두에서 작동합니다! 이는 Waffle이 다른 기술의 인기 있는 테스트 라이브러리처럼 코드를 주입하는 대신 EVM 호출을 기록하고 필터링하기 때문입니다.

## 마무리 {#the-finish-line}

축하해요! 이제 Waffle을 사용하여 계약 호출을 테스트하고 동적으로 계약을 모킹하는 방법을 알게 되었습니다. 알아볼 수 있는 훨씬 더 흥미로운 기능들이 많이 있습니다. Waffle의 개발문서를 자세히 살펴보는 것을 추천합니다.

Waffle의 개발문서는 [여기](https://ethereum-waffle.readthedocs.io/)에서 볼 수 있습니다.

이 튜토리얼의 소스 코드는 [여기](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls)에서 찾을 수 있습니다.

관심 있을 만한 다른 튜토리얼:

- [Waffle로 스마트 계약 테스트하기](/developers/tutorials/waffle-test-simple-smart-contract/)
