---
title: "Calldata 최적화를 위한 짧은 ABI"
description: "낙관적 롤업을 위한 스마트 계약 최적화"
author: Ori Pomerantz
lang: ko
tags: ["layer 2"]
skill: intermediate
published: 2022-04-01
---

## 소개 {#introduction}

이 글에서는 [낙관적 롤업](/developers/docs/scaling/optimistic-rollups)과 해당 롤업에서의 트랜잭션 비용, 그리고 비용 구조의 차이점으로 인해 이더리움 메인넷과는 다른 것을 최적화해야 하는 이유를 알아봅니다.
또한 이 최적화를 구현하는 방법도 알아봅니다.

### 전체 공개 {#full-disclosure}

저는 [Optimism](https://www.optimism.io/) 정직원이므로, 이 글의 예시는 Optimism에서 실행됩니다.
하지만 여기서 설명하는 기법은 다른 롤업에서도 동일하게 작동합니다.

### 용어 {#terminology}

롤업을 논할 때, '레이어 1'(L1)이라는 용어는 운영 중인 이더리움 네트워크인 메인넷을 지칭하는 데 사용됩니다.
'레이어 2'(L2)라는 용어는 L1에 보안을 의존하지만 대부분의 처리를 오프체인에서 수행하는 롤업 또는 기타 시스템을 지칭하는 데 사용됩니다.

## L2 트랜잭션 비용을 어떻게 더 줄일 수 있을까요? {#how-can-we-further-reduce-the-cost-of-L2-transactions}

[낙관적 롤업](/developers/docs/scaling/optimistic-rollups)은 모든 과거 트랜잭션 기록을 보존해야 합니다. 그래야 누구나 이를 검토하고 현재 상태가 올바른지 확인할 수 있습니다.
이더리움 메인넷에 데이터를 저장하는 가장 저렴한 방법은 calldata로 작성하는 것입니다.
이 솔루션은 [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-)과 [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups) 모두에서 채택되었습니다.

### L2 트랜잭션 비용 {#cost-of-l2-transactions}

L2 트랜잭션 비용은 다음 두 가지 요소로 구성됩니다.

1. L2 처리 비용(일반적으로 매우 저렴함)
2. L1 저장 비용(메인넷 가스 비용과 연동됨)

이 글을 쓰는 시점에서 Optimism의 L2 가스 비용은 0.001 [Gwei](/developers/docs/gas/#pre-london)입니다.
반면에 L1 가스 비용은 약 40gwei입니다.
[여기에서 현재 가격을 확인할 수 있습니다](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

calldata 1바이트의 비용은 값이 0인 경우 4 가스, 다른 값인 경우 16 가스입니다.
EVM에서 가장 비싼 작업 중 하나는 저장 공간에 쓰는 것입니다.
L2 저장 공간에 32바이트 워드를 쓰는 최대 비용은 22,100 가스입니다. 현재 이는 22.1 gwei입니다.
따라서 calldata에서 0바이트 하나만 절약할 수 있다면, 저장 공간에 약 200바이트를 쓰고도 여전히 이득을 볼 수 있습니다.

### ABI {#the-abi}

대부분의 트랜잭션은 외부 소유 계정의 컨트랙트를 액세스한다.
대부분의 계약은 솔리디티로 작성되며 [애플리케이션 바이너리 인터페이스(ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding)에 따라 데이터 필드를 해석합니다.

하지만 ABI는 L1을 위해 설계되었습니다. L1에서는 calldata 1바이트 비용이 약 4번의 산술 연산과 같지만, L2에서는 1,000번 이상의 산술 연산보다 비용이 더 많이 듭니다.
calldata는 다음과 같이 나뉩니다.

| 섹션     | 길이 |   바이트 | 낭비된 바이트 | 낭비된 가스 | 필요한 바이트 | 필요한 가스 |
| ------ | -: | ----: | ------: | -----: | ------: | -----: |
| 함수 선택자 |  4 |   0-3 |       3 |     48 |       1 |     16 |
| 0      | 12 |  4-15 |      12 |     48 |       0 |      0 |
| 목적지 주소 | 20 | 16-35 |       0 |      0 |      20 |    320 |
| 금액     | 32 | 36-67 |      17 |     64 |      15 |    240 |
| 합계     | 68 |       |         |    160 |         |    576 |

설명:

- **함수 선택자**: 계약에 256개 미만의 함수가 있으므로, 단일 바이트로 구분할 수 있습니다.
  이 바이트들은 일반적으로 0이 아니므로 [16 가스가 소모됩니다](https://eips.ethereum.org/EIPS/eip-2028).
- **0**: 이 바이트들은 항상 0인데, 20바이트 주소를 담는 데 32바이트 워드가 필요하지 않기 때문입니다.
  0을 담는 바이트는 4 가스가 소모됩니다([옐로 페이퍼](https://ethereum.github.io/yellowpaper/paper.pdf), 부록 G, 27페이지, `G`<sub>`txdatazero`</sub> 값 참조).
- **금액**: 이 계약에서 `decimals`가 18(일반적인 값)이고 우리가 전송할 토큰의 최대량이 10<sup>18</sup>이라고 가정하면, 최대 금액은 10<sup>36</sup>이 됩니다.
  256<sup>15</sup> > 10<sup>36</sup>이므로 15바이트면 충분합니다.

L1에서 160 가스가 낭비되는 것은 보통 무시할 수 있는 수준입니다. 트랜잭션에는 최소 [21,000 가스](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed)가 소모되므로 0.8%가 추가되는 것은 중요하지 않습니다.
하지만 L2에서는 상황이 다릅니다. 트랜잭션 비용의 거의 전부는 L1에 쓰는 데서 발생합니다.
트랜잭션 calldata 외에도 109바이트의 트랜잭션 헤더(목적지 주소, 서명 등)가 있습니다.
따라서 총비용은 `109*16+576+160=2480`이며, 이 중 약 6.5%를 낭비하고 있습니다.

## 목적지를 제어할 수 없을 때 비용 절감하기 {#reducing-costs-when-you-dont-control-the-destination}

목적지 계약을 제어할 수 없다고 가정하더라도 여전히 [이 솔루션](https://github.com/qbzzt/ethereum.org-20220330-shortABI)과 유사한 솔루션을 사용할 수 있습니다.
관련 파일을 살펴보겠습니다.

### Token.sol {#token-sol}

[이것이 목적지 계약입니다](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
이것은 표준 ERC-20 계약이며, 한 가지 추가 기능이 있습니다.
이 `faucet` 함수는 모든 사용자가 사용할 토큰을 얻을 수 있게 합니다.
프로덕션 ERC-20 계약에서는 쓸모없겠지만, 테스트를 용이하게 하기 위해 존재하는 ERC-20의 경우 개발을 더 쉽게 만들어 줍니다.

```solidity
    /**
     * @dev 호출자에게 1,000개의 토큰을 제공합니다
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[이 계약은 트랜잭션이 더 짧은 calldata로 호출하도록 되어 있는 계약입니다](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
한 줄씩 살펴보겠습니다.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

호출 방법을 알기 위해 토큰 함수가 필요합니다.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

프록시 역할을 할 토큰의 주소입니다.

```solidity

    /**
     * @dev 토큰 주소를 지정합니다
     * @param tokenAddr_ ERC-20 계약 주소
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

토큰 주소는 우리가 지정해야 하는 유일한 매개변수입니다.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

calldata에서 값을 읽습니다.

```solidity
        uint _retVal;\n\n        require(length < 0x21,\n            \"calldataVal 길이 제한은 32바이트입니다\");\n\n        require(length + startByte <= msg.data.length,\n            \"calldataVal calldatasize를 초과하여 읽으려고 합니다\");
```

단일 32바이트(256비트) 워드를 메모리에 로드한 다음, 원하는 필드에 속하지 않는 바이트를 제거할 것입니다.
이 알고리즘은 32바이트보다 긴 값에는 작동하지 않으며, 물론 calldata의 끝을 넘어 읽을 수도 없습니다.
L1에서는 가스를 절약하기 위해 이 테스트를 건너뛰어야 할 수도 있지만, L2에서는 가스가 매우 저렴하므로 우리가 생각할 수 있는 모든 온전성 검사를 사용할 수 있습니다.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

아래에서 볼 수 있듯이, `fallback()`에 대한 호출에서 데이터를 복사할 수도 있지만, EVM의 어셈블리 언어인 [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html)을 사용하는 것이 더 쉽습니다.

여기서는 [`CALLDATALOAD` opcode](https://www.evm.codes/#35)를 사용하여 `startByte`에서 `startByte+31` 바이트를 스택으로 읽습니다.
일반적으로 Yul에서 opcode의 구문은 `<opcode name>(<첫 번째 스택 값, 있는 경우>,<두 번째 스택 값, 있는 경우>...)`입니다.

```solidity

        _retVal = _retVal >> (256-length*8);
```

가장 중요한 `length` 바이트만 필드의 일부이므로 [오른쪽 시프트](https://en.wikipedia.org/wiki/Logical_shift)를 사용하여 다른 값을 제거합니다.
이것은 값을 필드의 오른쪽으로 이동시켜 값 자체가 256<sup>거듭제곱</sup>을 곱한 값이 아닌 값 자체가 되도록 하는 추가적인 이점이 있습니다.

```solidity

        return _retVal;
    }


    fallback() external {
```

솔리디티 계약에 대한 호출이 함수 서명과 일치하지 않으면 [`fallback()` 함수](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function)를 호출합니다(있는 경우).
`CalldataInterpreter`의 경우 다른 `external` 또는 `public` 함수가 없기 때문에 _모든_ 호출이 여기에 도달합니다.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

calldata의 첫 번째 바이트를 읽습니다. 이 바이트는 함수를 알려줍니다.
여기서 함수를 사용할 수 없는 두 가지 이유가 있습니다.

1. `pure` 또는 `view`인 함수는 상태를 변경하지 않고 가스를 소모하지 않습니다(오프체인에서 호출될 때).
   가스 비용을 줄이려는 시도는 의미가 없습니다.
2. [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties)에 의존하는 함수.
   `msg.sender`의 값은 호출자가 아닌 `CalldataInterpreter`의 주소가 됩니다.

안타깝게도 [ERC-20 사양](https://eips.ethereum.org/EIPS/eip-20)을 살펴보면 `transfer`라는 함수 하나만 남습니다.
이것은 `transfer`(`transferFrom`을 호출할 수 있으므로)와 `faucet`(토큰을 우리를 호출한 사람에게 다시 전송할 수 있으므로) 두 개의 함수만 남깁니다.

```solidity

        // calldata의 정보를 사용하여
        // 토큰의 상태 변경 메서드를 호출합니다

        // faucet
        if (_func == 1) {
```

매개변수가 없는 `faucet()` 호출입니다.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

`token.faucet()`을 호출하면 토큰을 얻습니다. 그러나 프록시 계약으로서 우리는 토큰이 **필요하지** 않습니다.
우리를 호출한 EOA(외부 소유 계정) 또는 계약에는 필요합니다.
그래서 우리는 모든 토큰을 우리를 호출한 사람에게 전송합니다.

```solidity
        // transfer(허용량이 있다고 가정)
        if (_func == 2) {
```

토큰을 전송하려면 목적지 주소와 금액이라는 두 개의 매개변수가 필요합니다.

```solidity
            token.transferFrom(
                msg.sender,
```

호출자가 소유한 토큰만 전송하도록 허용합니다

```solidity
                address(uint160(calldataVal(1, 20))),
```

목적지 주소는 바이트 #1에서 시작합니다(바이트 #0은 함수임).
주소이므로 길이는 20바이트입니다.

```solidity
                calldataVal(21, 2)
```

이 특정 계약의 경우, 누구나 전송하고자 하는 최대 토큰 수가 2바이트(65536 미만)에 들어간다고 가정합니다.

```solidity
            );
        }
```

전체적으로 전송에는 35바이트의 calldata가 필요합니다.

| 섹션     | 길이 |   바이트 |
| ------ | -: | ----: |
| 함수 선택자 |  1 |     0 |
| 목적지 주소 | 32 |  1-32 |
| 금액     |  2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[이 JavaScript 단위 테스트](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js)는 이 메커니즘을 사용하는 방법(그리고 올바르게 작동하는지 확인하는 방법)을 보여줍니다.
저는 여러분이 [chai](https://www.chaijs.com/)와 [ethers](https://docs.ethers.io/v5/)를 이해한다고 가정하고 계약에 특별히 적용되는 부분만 설명하겠습니다.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("토큰을 사용할 수 있도록 해야 합니다", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Token addr:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("CalldataInterpreter addr:", cdi.address)

    const signer = await ethers.getSigner()
```

두 계약을 모두 배포하여 시작합니다.

```javascript
    // 가지고 놀 토큰 가져오기
    const faucetTx = {
```

ABI를 따르지 않기 때문에 일반적으로 사용하는 고수준 함수(예: `token.faucet()`)를 사용하여 트랜잭션을 생성할 수 없습니다.
대신 트랜잭션을 직접 만들고 전송해야 합니다.

```javascript
      to: cdi.address,
      data: "0x01"
```

거래를 위해 제공해야 하는 두 가지 매개변수가 있습니다.

1. `to`, 목적지 주소입니다.
   이것은 calldata 인터프리터 계약입니다.
2. `data`, 보낼 calldata입니다.
   수도꼭지 호출의 경우 데이터는 단일 바이트인 `0x01`입니다.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

이미 목적지(`faucetTx.to`)를 지정했고 트랜잭션에 서명이 필요하기 때문에 [서명자의 `sendTransaction` 메서드](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction)를 호출합니다.

```javascript
// faucet이 토큰을 올바르게 제공하는지 확인
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

여기서 잔액을 확인합니다.
`view` 함수에 대한 가스를 절약할 필요가 없으므로 정상적으로 실행합니다.

```javascript
// CDI에 허용량 부여(승인은 프록시 처리 불가)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

전송을 수행할 수 있도록 calldata 인터프리터에 허용량을 부여합니다.

```javascript
// 토큰 전송
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

전송 트랜잭션을 생성합니다. 첫 번째 바이트는 "0x02"이고 그 뒤에 목적지 주소, 마지막으로 금액(0x0100, 10진수로 256)이 옵니다.

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // 256개의 토큰이 더 적은지 확인
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // 그리고 목적지에서 토큰을 받았는지 확인
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## 목적지 계약을 제어할 때 비용 절감하기 {#reducing-the-cost-when-you-do-control-the-destination-contract}

목적지 계약을 제어할 수 있는 경우 calldata 인터프리터를 신뢰하기 때문에 `msg.sender` 검사를 우회하는 함수를 생성할 수 있습니다.
[여기에서 `control-contract` 브랜치에서 이것이 어떻게 작동하는지에 대한 예시를 볼 수 있습니다](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

계약이 외부 트랜잭션에만 응답하는 경우 계약 하나만으로도 충분할 수 있습니다.
그러나 그렇게 하면 [구성 가능성](/developers/docs/smart-contracts/composability/)이 깨질 수 있습니다.
일반적인 ERC-20 호출에 응답하는 계약과 짧은 호출 데이터가 있는 트랜잭션에 응답하는 다른 계약을 사용하는 것이 훨씬 좋습니다.

### Token.sol {#token-sol-2}

이 예제에서는 `Token.sol`을 수정할 수 있습니다.
이를 통해 프록시만 호출할 수 있는 여러 함수를 가질 수 있습니다.
다음은 새로운 부분입니다.

```solidity
    // CalldataInterpreter 주소를 지정할 수 있는 유일한 주소
    address owner;

    // CalldataInterpreter 주소
    address proxy = address(0);
```

ERC-20 계약은 승인된 프록시의 ID를 알아야 합니다.
하지만 아직 값을 모르기 때문에 생성자에서 이 변수를 설정할 수 없습니다.
프록시가 생성자에서 토큰 주소를 기대하기 때문에 이 계약이 먼저 인스턴스화됩니다.

```solidity
    /**
     * @dev ERC20 생성자를 호출합니다.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

생성자의 주소(`owner`라고 함)는 프록시를 설정할 수 있는 유일한 주소이기 때문에 여기에 저장됩니다.

```solidity
    /**
     * @dev 프록시(CalldataInterpreter)의 주소를 설정합니다.
     * 소유자만 한 번 호출할 수 있습니다
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "소유자만 호출할 수 있습니다");
        require(proxy == address(0), "프록시가 이미 설정되었습니다");

        proxy = _proxy;
    }    // function setProxy
```

프록시는 보안 검사를 우회할 수 있기 때문에 특권 액세스 권한을 가집니다.
프록시를 신뢰할 수 있도록 `owner`만 이 함수를 한 번만 호출하도록 허용합니다.
`proxy`가 실제 값(0이 아님)을 가지면 해당 값은 변경할 수 없으므로 소유자가 악의적으로 변하거나 니모닉이 공개되더라도 우리는 여전히 안전합니다.

```solidity
    /**
     * @dev 일부 함수는 프록시에서만 호출할 수 있습니다.
     */
    modifier onlyProxy {
```

이것은 다른 함수의 작동 방식을 수정하는 [`제어자` 함수](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm)입니다.

```solidity
      require(msg.sender == proxy);
```

먼저 프록시에서 호출했는지 확인하고 다른 사람이 호출하지 않았는지 확인합니다.
그렇지 않으면 `revert`합니다.

```solidity
      _;
    }
```

그렇다면 수정하는 함수를 실행합니다.

```solidity
   /* 프록시가 실제로 계정을 프록시할 수 있도록 하는 함수 */

    function transferProxy(address from, address to, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _transfer(from, to, amount);
        return true;
    }

    function approveProxy(address from, address spender, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _approve(from, spender, amount);
        return true;
    }

    function transferFromProxy(
        address spender,
        address from,
        address to,
        uint256 amount
    ) public virtual onlyProxy() returns (bool)
    {
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
```

이 세 가지 작업은 일반적으로 토큰을 전송하거나 허용량을 승인하는 주체로부터 메시지가 직접 와야 합니다.
여기에는 이러한 작업의 프록시 버전이 있습니다.

1. `onlyProxy()`에 의해 수정되어 다른 사람이 제어할 수 없습니다.
2. 일반적으로 `msg.sender`가 될 주소를 추가 매개변수로 가져옵니다.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

calldata 인터프리터는 프록시된 함수가 `msg.sender` 매개변수를 수신하고 `transfer`에 대한 허용량이 필요하지 않다는 점을 제외하고 위의 것과 거의 동일합니다.

```solidity
        // transfer (허용량 필요 없음)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // approve
        if (_func == 3) {
            token.approveProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // transferFrom
        if (_func == 4) {
            token.transferFromProxy(
                msg.sender,
                address(uint160(calldataVal( 1, 20))),
                address(uint160(calldataVal(21, 20))),
                calldataVal(41, 2)
            );
        }
```

### Test.js {#test-js-2}

이전 테스트 코드와 이 코드 사이에 몇 가지 차이점이 있습니다.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

ERC-20 계약이 어떤 프록시를 신뢰할 지 알 수 있도록 해야합니다.

```js
console.log("CalldataInterpreter addr:", cdi.address)

// 허용량을 확인하기 위해 두 명의 서명자가 필요합니다
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

`approve()` 및 `transferFrom()`을 확인하려면 두 번째 서명자가 필요합니다.
이 계정은 우리의 토큰을 받지 않기 때문에 `poorSigner`라고 부릅니다(물론 ETH는 보유해야 합니다).

```js
// 토큰 전송
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

ERC-20 계약이 프록시(`cdi`)를 신뢰하기 때문에 전송을 릴레이하는 데 허용량이 필요하지 않습니다.

```js
// approval 및 transferFrom
const approveTx = {
  to: cdi.address,
  data: "0x03" + poorSigner.address.slice(2, 42) + "00FF",
}
await (await signer.sendTransaction(approveTx)).wait()

const destAddr2 = "0xE1165C689C0c3e9642cA7606F5287e708d846206"

const transferFromTx = {
  to: cdi.address,
  data: "0x04" + signer.address.slice(2, 42) + destAddr2.slice(2, 42) + "00FF",
}
await (await poorSigner.sendTransaction(transferFromTx)).wait()

// approve / transferFrom 콤보가 올바르게 수행되었는지 확인
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

새로운 두 함수를 테스트해 보세요.
`transferFromTx`에는 허용량을 제공하는 사람과 받는 사람의 두 가지 주소 매개변수가 필요합니다.

## 결론 {#conclusion}

[Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)과 [Arbitrum](https://developer.offchainlabs.com/docs/special_features) 모두 L1에 기록되는 calldata의 크기를 줄여 트랜잭션 비용을 절감하는 방법을 찾고 있습니다.
그러나 일반적인 솔루션을 찾는 인프라 제공업체로서 우리의 능력은 제한적입니다.
dapp 개발자로서 여러분은 애플리케이션별 지식을 가지고 있으므로 일반적인 솔루션보다 훨씬 더 잘 calldata를 최적화할 수 있습니다.
이 글이 여러분의 필요에 맞는 이상적인 해결책을 찾는 데 도움이 되기를 바랍니다.

[여기서 제 작업에 대한 자세한 내용을 확인하세요](https://cryptodocguy.pro/).

