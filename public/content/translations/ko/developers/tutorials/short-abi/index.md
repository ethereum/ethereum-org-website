---
title: "콜 데이터 최적화를 위한 짧은 ABI"
description: "옵티미스틱 롤업을 위한 스마트 컨트랙트 최적화"
author: "오리 포메란츠"
lang: ko
tags: ["레이어 2 (l2)"]
skill: intermediate
breadcrumb: "짧은 ABI"
published: 2022-04-01
---

## 소개 {#introduction}

이 글에서는 [옵티미스틱 롤업(optimistic rollups)](/developers/docs/scaling/optimistic-rollups)과 그 위에서 발생하는 트랜잭션 비용, 그리고 이러한 다른 비용 구조가 이더리움 메인넷과는 다른 최적화 방식을 요구하는 이유에 대해 알아봅니다.
또한 이러한 최적화를 구현하는 방법도 배웁니다.

### 일러두기 {#full-disclosure}

저는 [옵티미즘](https://www.optimism.io/)의 정규직 직원이므로, 이 글의 예제는 옵티미즘에서 실행됩니다.
하지만 여기서 설명하는 기술은 다른 롤업에서도 동일하게 잘 작동할 것입니다.

### 용어 {#terminology}

롤업에 대해 논의할 때 '레이어 1 (l1)'이라는 용어는 프로덕션 이더리움 네트워크인 메인넷을 의미합니다.
'레이어 2 (l2)'라는 용어는 보안을 l1에 의존하지만 대부분의 처리를 오프체인에서 수행하는 롤업이나 기타 시스템을 의미합니다.

## l2 트랜잭션 비용을 어떻게 더 줄일 수 있을까요? {#how-can-we-further-reduce-the-cost-of-l2-transactions}

[옵티미스틱 롤업](/developers/docs/scaling/optimistic-rollups)은 누구나 내역을 살펴보고 현재 상태가 올바른지 검증할 수 있도록 모든 과거 트랜잭션 기록을 보존해야 합니다.
이더리움 메인넷에 데이터를 가져오는 가장 저렴한 방법은 콜 데이터로 작성하는 것입니다.
이 솔루션은 [옵티미즘](https://docs.optimism.io/op-stack/protocol/overview)과 [아비트럼](https://docs.arbitrum.io/welcome/arbitrum-gentle-introduction) 모두에서 채택했습니다.

### l2 트랜잭션 비용 {#cost-of-l2-transactions}

l2 트랜잭션 비용은 두 가지 요소로 구성됩니다.

1. l2 처리 비용 (일반적으로 매우 저렴함)
2. l1 저장 비용 (메인넷 가스 비용과 연관됨)

이 글을 쓰는 시점을 기준으로, 옵티미즘의 l2 가스 비용은 0.001 [Gwei](/developers/docs/gas/#pre-london)입니다.
반면 l1 가스 비용은 약 40 Gwei입니다.
[현재 가격은 여기에서 확인할 수 있습니다](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

콜 데이터 1바이트의 비용은 4 가스(0인 경우) 또는 16 가스(다른 값인 경우)입니다.
EVM에서 가장 비싼 연산 중 하나는 스토리지에 쓰는 것입니다.
l2에서 스토리지에 32바이트 워드를 쓰는 최대 비용은 22100 가스입니다. 현재 이는 22.1 Gwei입니다.
따라서 콜 데이터에서 0인 바이트 하나만 절약해도 스토리지에 약 200바이트를 쓰고도 이득을 볼 수 있습니다.

### ABI {#the-abi}

대부분의 트랜잭션은 외부 소유 계정(EOA)에서 컨트랙트에 접근합니다.
대부분의 컨트랙트는 Solidity로 작성되며 [애플리케이션 바이너리 인터페이스(ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding)에 따라 데이터 필드를 해석합니다.

하지만 ABI는 콜 데이터 1바이트 비용이 1,000번 이상의 산술 연산 비용과 맞먹는 l2가 아니라, 콜 데이터 1바이트 비용이 약 4번의 산술 연산 비용과 비슷한 l1을 위해 설계되었습니다.
콜 데이터는 다음과 같이 나뉩니다.

| 섹션 | 길이 | 바이트 | 낭비된 바이트 | 낭비된 가스 | 필요한 바이트 | 필요한 가스 |
| ------------------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| 함수 선택자 |      4 |   0-3 |            3 |         48 |               1 |            16 |
| 0 (Zeroes) |     12 |  4-15 |           12 |         48 |               0 |             0 |
| 목적지 주소 |     20 | 16-35 |            0 |          0 |              20 |           320 |
| 수량 |     32 | 36-67 |           17 |         64 |              15 |           240 |
| 총합 |     68 |       |              |        160 |                 |           576 |

설명:

- **함수 선택자**: 컨트랙트의 함수가 256개 미만이므로 1바이트만으로 구분할 수 있습니다.
  이 바이트들은 일반적으로 0이 아니므로 [16 가스의 비용이 듭니다](https://eips.ethereum.org/EIPS/eip-2028).
- **0 (Zeroes)**: 20바이트 주소를 담는 데 32바이트 워드가 필요하지 않으므로 이 바이트들은 항상 0입니다.
  0을 담고 있는 바이트는 4 가스의 비용이 듭니다([황서](https://ethereum.github.io/yellowpaper/paper.pdf) 부록 G,
  27페이지의 `G`<sub>`txdatazero`</sub> 값 참조).
- **수량**: 이 컨트랙트에서 `decimals`가 18(일반적인 값)이고 전송할 토큰의 최대 수량이 10<sup>18</sup>이라고 가정하면, 최대 수량은 10<sup>36</sup>이 됩니다.
  256<sup>15</sup> &gt; 10<sup>36</sup>이므로 15바이트면 충분합니다.

l1에서 160 가스의 낭비는 보통 무시할 수 있는 수준입니다. 트랜잭션 비용이 최소 [21,000 가스](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed)이므로 0.8%가 추가되는 것은 큰 문제가 되지 않습니다.
하지만 l2에서는 상황이 다릅니다. 트랜잭션 비용의 거의 대부분이 l1에 기록하는 데 사용됩니다.
트랜잭션 콜 데이터 외에도 109바이트의 트랜잭션 헤더(목적지 주소, 서명 등)가 있습니다.
따라서 총 비용은 `109*16+576+160=2480`이며, 우리는 그중 약 6.5%를 낭비하고 있는 셈입니다.

## 목적지를 제어할 수 없을 때 비용 줄이기 {#reducing-costs-when-you-dont-control-the-destination}

목적지 컨트랙트를 제어할 수 없다고 가정하더라도, [이와 유사한](https://github.com/qbzzt/ethereum.org-20220330-shortABI) 솔루션을 사용할 수 있습니다.
관련 파일들을 살펴보겠습니다.

### Token.sol {#token-sol}

[이것은 목적지 컨트랙트입니다](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
이것은 한 가지 추가 기능이 있는 표준 ERC-20 컨트랙트입니다.
이 `faucet` 함수를 사용하면 누구나 사용할 토큰을 얻을 수 있습니다.
이 기능은 프로덕션 ERC-20 컨트랙트를 무용지물로 만들겠지만, 테스트를 용이하게 하기 위해 ERC-20이 존재하는 경우에는 매우 편리합니다.

```solidity
    /**
     * @dev 호출자에게 사용할 1000 토큰을 제공합니다
     */
    faucet 함수() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[이것은 트랜잭션이 더 짧은 콜 데이터로 호출해야 하는 컨트랙트입니다](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
한 줄씩 살펴보겠습니다.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

호출 방법을 알기 위해 토큰 함수가 필요합니다.

```solidity
CalldataInterpreter 컨트랙트 {

    OrisUselessToken public immutable token;
```

우리가 프록시 역할을 하는 토큰의 주소입니다.

```solidity

    /**
     * @dev 토큰 주소를 지정합니다
     * @param tokenAddr_ ERC-20 컨트랙트 주소
     */
    생성자(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

토큰 주소는 우리가 지정해야 할 유일한 매개변수입니다.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

콜 데이터에서 값을 읽습니다.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

메모리에 단일 32바이트(256비트) 워드를 로드하고 우리가 원하는 필드의 일부가 아닌 바이트를 제거할 것입니다.
이 알고리즘은 32바이트보다 긴 값에는 작동하지 않으며, 당연히 콜 데이터의 끝을 지나서 읽을 수는 없습니다.
l1에서는 가스를 절약하기 위해 이러한 테스트를 건너뛰어야 할 수도 있지만, l2에서는 가스가 매우 저렴하므로 생각할 수 있는 모든 온전성 검사(sanity check)를 수행할 수 있습니다.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

`fallback()` 호출에서 데이터를 복사할 수도 있었지만(아래 참조), EVM의 어셈블리 언어인 [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html)을 사용하는 것이 더 쉽습니다.

여기서는 [CALLDATALOAD 연산 코드](https://www.evm.codes/#35)를 사용하여 `startByte`부터 `startByte+31`까지의 바이트를 스택으로 읽어옵니다.
일반적으로 Yul에서 연산 코드의 구문은 `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`입니다.

```solidity

        _retVal = _retVal >> (256-length*8);
```

가장 중요한 `length` 바이트만 필드의 일부이므로, 다른 값을 제거하기 위해 [오른쪽으로 시프트(right-shift)](https://en.wikipedia.org/wiki/Logical_shift)합니다.
이렇게 하면 값을 필드의 오른쪽으로 이동시키는 추가적인 이점이 있으므로, 값에 256<sup>무언가</sup>를 곱한 값이 아니라 값 자체가 됩니다.

```solidity

        return _retVal;
    }


    fallback() external {
```

Solidity 컨트랙트에 대한 호출이 어떤 함수 서명과도 일치하지 않으면 [`fallback()` 함수](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function)를 호출합니다(해당 함수가 있다고 가정할 때).
`CalldataInterpreter`의 경우, 다른 `external` 또는 `public` 함수가 없기 때문에 _모든_ 호출이 여기로 옵니다.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

콜 데이터의 첫 번째 바이트를 읽어 어떤 함수인지 확인합니다.
여기서 함수를 사용할 수 없는 이유는 두 가지가 있습니다.

1. `pure` 또는 `view`인 함수는 상태를 변경하지 않으며 (오프체인에서 호출될 때) 가스 비용이 들지 않습니다.
   따라서 가스 비용을 줄이려는 시도는 의미가 없습니다.
2. [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties)에 의존하는 함수.
   `msg.sender`의 값은 호출자가 아니라 `CalldataInterpreter`의 주소가 됩니다.

안타깝게도 [ERC-20 사양을 살펴보면](https://eips.ethereum.org/EIPS/eip-20), 남는 함수는 `transfer` 하나뿐입니다.
결과적으로 우리에게는 두 가지 함수만 남게 됩니다. `transfer`(`transferFrom`를 호출할 수 있기 때문)와 `faucet`(우리를 호출한 사람에게 토큰을 다시 전송할 수 있기 때문)입니다.

```solidity

        // 다음을 사용하여 토큰의 상태 변경 메서드를 호출합니다
        // 콜 데이터의 정보

        // faucet
        if (_func == 1) {
```

매개변수가 없는 `faucet()`에 대한 호출입니다.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

`token.faucet()`를 호출한 후 우리는 토큰을 얻습니다. 하지만 프록시 컨트랙트로서 우리는 토큰이 **필요하지 않습니다**.
우리를 호출한 EOA(외부 소유 계정)나 컨트랙트가 토큰을 필요로 합니다.
따라서 우리는 모든 토큰을 우리를 호출한 대상에게 전송합니다.

```solidity
        // 전송 (이에 대한 허용량이 있다고 가정합니다)
        if (_func == 2) {
```

토큰을 전송하려면 목적지 주소와 수량이라는 두 가지 매개변수가 필요합니다.

```solidity
            token.transferFrom(
                msg.sender,
```

호출자가 자신이 소유한 토큰만 전송할 수 있도록 허용합니다.

```solidity
                address(uint160(calldataVal(1, 20))),
```

목적지 주소는 1번 바이트에서 시작합니다(0번 바이트는 함수입니다).
주소이므로 길이는 20바이트입니다.

```solidity
                calldataVal(21, 2)
```

이 특정 컨트랙트의 경우, 누군가 전송하고자 하는 토큰의 최대 수량이 2바이트(65536 미만)에 들어간다고 가정합니다.

```solidity
            );
        }
```

전반적으로 전송에는 35바이트의 콜 데이터가 필요합니다.

| 섹션 | 길이 | 바이트 |
| ------------------- | -----: | ----: |
| 함수 선택자 |      1 |     0 |
| 목적지 주소 |     32 |  1-32 |
| 수량 |      2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[이 JavaScript 단위 테스트](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js)는 이 메커니즘을 사용하는 방법(그리고 올바르게 작동하는지 검증하는 방법)을 보여줍니다.
여러분이 [chai](https://www.chaijs.com/)와 [ethers](https://docs.ethers.io/v5/)를 이해하고 있다고 가정하고, 컨트랙트에 특별히 적용되는 부분만 설명하겠습니다.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Should let us use tokens", async function () {
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

두 컨트랙트를 배포하는 것으로 시작합니다.

```javascript
    // 사용할 토큰 가져오기
    const faucetTx = {
```

우리는 ABI를 따르지 않기 때문에 트랜잭션을 생성할 때 일반적으로 사용하는 고수준 함수(예: `token.faucet()`)를 사용할 수 없습니다.
대신 트랜잭션을 직접 구성한 다음 전송해야 합니다.

```javascript
      to: cdi.address,
      data: "0x01"
```

트랜잭션을 위해 제공해야 할 두 가지 매개변수가 있습니다.

1. `to`: 목적지 주소입니다.
   이것은 콜 데이터 인터프리터 컨트랙트입니다.
2. `data`: 전송할 콜 데이터입니다.
   퍼싯 호출의 경우 데이터는 단일 바이트인 `0x01`입니다.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

이미 목적지(`faucetTx.to`)를 지정했고 트랜잭션에 서명이 필요하므로 [서명자의 `sendTransaction` 메서드](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction)를 호출합니다.

```javascript
// faucet이 토큰을 올바르게 제공하는지 확인합니다
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

여기서 잔액을 검증합니다.
`view` 함수에서는 가스를 절약할 필요가 없으므로 정상적으로 실행합니다.

```javascript
// CDI에 허용량을 부여합니다 (승인은 프록시될 수 없습니다)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

콜 데이터 인터프리터가 전송을 수행할 수 있도록 허용량을 부여합니다.

```javascript
// 토큰 전송
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

전송 트랜잭션을 생성합니다. 첫 번째 바이트는 "0x02"이고, 그 뒤에 목적지 주소가 오며, 마지막으로 수량(0x0100, 10진수로 256)이 옵니다.

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // 토큰이 256개 줄었는지 확인합니다
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // 그리고 목적지에서 이를 받았는지 확인합니다
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## 목적지 컨트랙트를 제어할 수 있을 때 비용 줄이기 {#reducing-the-cost-when-you-do-control-the-destination-contract}

목적지 컨트랙트를 제어할 수 있다면 콜 데이터 인터프리터를 신뢰하기 때문에 `msg.sender` 검사를 우회하는 함수를 생성할 수 있습니다.
[이것이 어떻게 작동하는지에 대한 예제는 여기 `control-contract` 브랜치에서 확인할 수 있습니다](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

컨트랙트가 외부 트랜잭션에만 응답한다면 컨트랙트 하나만으로도 충분할 것입니다.
하지만 그렇게 하면 [조합성](/developers/docs/smart-contracts/composability/)이 깨지게 됩니다.
일반적인 ERC-20 호출에 응답하는 컨트랙트와 짧은 콜 데이터가 포함된 트랜잭션에 응답하는 또 다른 컨트랙트를 두는 것이 훨씬 좋습니다.

### Token.sol {#token-sol-2}

이 예제에서는 `Token.sol`를 수정할 수 있습니다.
이를 통해 프록시만 호출할 수 있는 여러 함수를 가질 수 있습니다.
새로운 부분은 다음과 같습니다.

```solidity
    // CalldataInterpreter 주소를 지정할 수 있는 유일한 주소
    address owner;

    // CalldataInterpreter 주소
    address proxy = address(0);
```

ERC-20 컨트랙트는 승인된 프록시의 신원을 알아야 합니다.
하지만 아직 값을 모르기 때문에 생성자에서 이 변수를 설정할 수 없습니다.
프록시가 생성자에서 토큰의 주소를 예상하기 때문에 이 컨트랙트가 먼저 인스턴스화됩니다.

```solidity
    /**
     * @dev ERC20 생성자를 호출합니다.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

생성자의 주소(`owner`라고 함)는 프록시를 설정할 수 있는 유일한 주소이므로 여기에 저장됩니다.

```solidity
    /**
     * @dev 프록시(CalldataInterpreter)의 주소를 설정합니다.
     * 소유자만 한 번 호출할 수 있습니다
     */
    setProxy 함수(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

프록시는 보안 검사를 우회할 수 있으므로 권한이 부여된 접근 권한을 갖습니다.
프록시를 신뢰할 수 있도록 `owner`만 이 함수를 호출할 수 있게 하며, 그것도 단 한 번만 허용합니다.
`proxy`가 실제 값(0이 아님)을 가지게 되면 그 값은 변경될 수 없으므로, 소유자가 악의적으로 변하거나 니모닉이 유출되더라도 여전히 안전합니다.

```solidity
    /**
     * @dev 일부 함수는 프록시에서만 호출할 수 있습니다.
     */
    modifier onlyProxy {
```

이것은 [`modifier` 함수](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm)이며, 다른 함수가 작동하는 방식을 수정합니다.

```solidity
      require(msg.sender == proxy);
```

먼저, 다른 누구도 아닌 프록시에 의해 호출되었는지 검증합니다.
그렇지 않다면 `revert`합니다.

```solidity
      _;
    }
```

그렇다면 우리가 수정하는 함수를 실행합니다.

```solidity
   /* 프록시가 실제로 계정을 대신하여 프록시 역할을 할 수 있도록 하는 함수 */

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

이 세 가지 연산은 일반적으로 토큰을 전송하거나 허용량을 승인하는 주체로부터 직접 메시지가 와야 합니다.
여기에는 다음과 같은 프록시 버전의 연산이 있습니다.

1. `onlyProxy()`에 의해 수정되어 다른 누구도 이를 제어할 수 없습니다.
2. 일반적으로 `msg.sender`가 될 주소를 추가 매개변수로 받습니다.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

콜 데이터 인터프리터는 프록시된 함수가 `msg.sender` 매개변수를 받고 `transfer`에 대한 허용량이 필요하지 않다는 점을 제외하면 위의 것과 거의 동일합니다.

```solidity
        // 전송 (허용량이 필요하지 않음)
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

이전 테스트 코드와 이 코드 사이에는 몇 가지 변경 사항이 있습니다.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

ERC-20 컨트랙트에게 어떤 프록시를 신뢰할지 알려주어야 합니다.

```js
console.log("CalldataInterpreter addr:", cdi.address)

// 허용량을 확인하려면 두 명의 서명자가 필요합니다
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

`approve()`와 `transferFrom()`를 확인하려면 두 번째 서명자가 필요합니다.
우리의 토큰을 전혀 받지 않기 때문에 이를 `poorSigner`라고 부릅니다(물론 ETH는 가지고 있어야 합니다).

```js
// 토큰 전송
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

ERC-20 컨트랙트가 프록시(`cdi`)를 신뢰하기 때문에 전송을 중계하기 위한 허용량이 필요하지 않습니다.

```js
// 승인 및 transferFrom
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

// approve / transferFrom 조합이 올바르게 수행되었는지 확인합니다
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

두 개의 새로운 함수를 테스트합니다.
`transferFromTx`에는 허용량을 부여하는 사람과 받는 사람이라는 두 개의 주소 매개변수가 필요하다는 점에 유의하세요.

## 결론 {#conclusion}

[옵티미즘](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)과 [아비트럼](https://developer.offchainlabs.com/docs/special_features) 모두 l1에 기록되는 콜 데이터의 크기를 줄여 트랜잭션 비용을 낮출 방법을 찾고 있습니다.
하지만 범용 솔루션을 찾는 인프라 제공자로서 우리의 능력에는 한계가 있습니다.
탈중앙화 애플리케이션 (dapp) 개발자인 여러분은 애플리케이션에 특화된 지식을 가지고 있으므로, 우리가 범용 솔루션에서 할 수 있는 것보다 훨씬 더 콜 데이터를 최적화할 수 있습니다.
이 글이 여러분의 필요에 맞는 이상적인 솔루션을 찾는 데 도움이 되기를 바랍니다.

[제 작업물은 여기에서 더 볼 수 있습니다](https://cryptodocguy.pro/).
