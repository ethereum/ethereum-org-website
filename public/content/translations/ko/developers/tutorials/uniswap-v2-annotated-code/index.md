---
title: "Uniswap-v2 컨트랙트 살펴보기"
description: "Uniswap-v2 컨트랙트는 어떻게 작동하나요? 왜 그렇게 작성되었을까요?"
author: Ori Pomerantz
tags: ["solidity"]
skill: intermediate
published: 2021-05-01
lang: ko
---

## 소개 {#introduction}

[Uniswap v2](https://app.uniswap.org/whitepaper.pdf)는 임의의 두 ERC-20 토큰 간에 교환 시장을 만들 수 있습니다. 이 글에서는 이 프로토콜을 구현하는 컨트랙트의 소스 코드를 살펴보고 왜 이런 방식으로 작성되었는지 알아봅니다.

### Uniswap은 어떤 역할을 하나요? {#what-does-uniswap-do}

기본적으로 유동성 공급자와 트레이더라는 두 가지 유형의 사용자가 있습니다.

_유동성 공급자_는 교환 가능한 두 토큰을 풀에 제공합니다(이를 **토큰0**과 **토큰1**이라고 부르겠습니다). 그 대가로, 풀의 부분 소유권을 나타내는 _유동성 토큰_이라는 세 번째 토큰을 받습니다.

_트레이더_는 한 종류의 토큰을 풀에 보내고, 유동성 공급자가 제공한 풀에서 다른 종류의 토큰을 받습니다(예: **토큰0**을 보내고 **토큰1**을 받음). 교환율은 풀이 보유한 **토큰0**과 **토큰1**의 상대적인 수에 따라 결정됩니다. 또한 풀은 유동성 풀에 대한 보상으로 적은 비율을 가져갑니다.

유동성 공급자는 자산을 돌려받고 싶을 때 풀 토큰을 소각하고 보상 지분을 포함한 토큰을 다시 받을 수 있습니다.

[자세한 설명은 여기를 클릭하세요](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/).

### 왜 v2인가요? 왜 v3는 아닌가요? {#why-v2}

[Uniswap v3](https://app.uniswap.org/whitepaper-v3.pdf)는 v2보다 훨씬 더 복잡한 업그레이드입니다. v2를 먼저 배우고 v3로 넘어가는 것이 더 쉽습니다.

### 코어 컨트랙트 vs 주변 컨트랙트 {#contract-types}

Uniswap v2는 코어와 주변이라는 두 가지 구성 요소로 나뉩니다. 이러한 분리 구조 덕분에 자산을 보유하고 있어 반드시 _보안_이 유지되어야 하는 코어 컨트랙트를 더 간단하고 감사하기 쉽게 만들 수 있습니다. 그런 다음 트레이더에게 필요한 모든 추가 기능은 주변 컨트랙트에서 제공할 수 있습니다.

## 데이터 및 제어 흐름 {#flows}

다음은 Uniswap의 세 가지 주요 작업을 수행할 때 발생하는 데이터 및 제어 흐름입니다.

1. 다른 토큰 간의 교환
2. 시장에 유동성을 추가하고 페어 교환 ERC-20 유동성 토큰으로 보상받기
3. ERC-20 유동성 토큰을 소각하고 페어 교환을 통해 트레이더가 교환할 수 있는 ERC-20 토큰을 돌려받기

### 교환 {#swap-flow}

이는 트레이더가 사용하는 가장 일반적인 흐름입니다.

#### 호출자 {#caller}

1. 교환할 금액만큼 주변 계정에 허용량을 제공합니다.
2. 주변부 컨트랙트의 여러 교환 함수 중 하나를 호출합니다(ETH 관련 여부, 트레이더가 입금할 토큰의 양을 지정하는지 또는 돌려받을 토큰의 양을 지정하는지 등에 따라 달라짐).
   모든 교환 함수는 거쳐야 할 교환 배열인 `path`를 허용합니다.

#### 주변부 컨트랙트(UniswapV2Router02.sol)에서 {#in-the-periphery-contract-uniswapv2router02-sol}

3. 경로를 따라 각 교환에서 거래해야 하는 금액을 식별합니다.
4. 경로를 반복합니다. 경로의 모든 교환에 대해 입력 토큰을 보낸 다음 교환의 `swap` 함수를 호출합니다.
   대부분의 경우 토큰의 대상 주소는 경로의 다음 페어 교환입니다. 마지막 교환에서는 트레이더가 제공한 주소입니다.

#### 코어 컨트랙트(UniswapV2Pair.sol)에서 {#in-the-core-contract-uniswapv2pairsol-2}5. 코어 컨트랙트가 조작되지 않았는지, 교환 후에도 충분한 유동성을 유지할 수 있는지 확인합니다.

6. 알려진 예비금 외에 추가로 보유하고 있는 토큰이 몇 개인지 확인합니다. 그 금액은 교환을 위해 받은 입력 토큰의 수입니다.
7. 출력 토큰을 목적지로 보냅니다.
8. `_update`를 호출하여 예비금 수량을 업데이트합니다

#### 주변부 컨트랙트(UniswapV2Router02.sol)로 돌아가기 {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. 필요한 정리를 수행합니다(예: WETH 토큰을 소각하여 트레이더에게 보낼 ETH를 돌려받음)

### 유동성 추가 {#add-liquidity-flow}

#### 호출자 {#caller-2}

1. 유동성 풀에 추가될 금액만큼 주변부 계정에 허용량을 제공합니다.
2. 주변부 컨트랙트의 `addLiquidity` 함수 중 하나를 호출합니다.

#### 주변부 컨트랙트(UniswapV2Router02.sol)에서 {#in-the-periphery-contract-uniswapv2router02sol-2}

3. 필요한 경우 새 페어 교환을 생성합니다
4. 기존 페어 교환이 있는 경우 추가할 토큰의 양을 계산합니다. 이는 두 토큰에 대해 동일한 가치여야 하므로 기존 토큰에 대한 새 토큰의 비율이 동일해야 합니다.
5. 금액이 허용 가능한지 확인합니다(호출자는 유동성을 추가하지 않으려는 최소 금액을 지정할 수 있음)
6. 코어 컨트랙트를 호출합니다.

#### 코어 컨트랙트(UniswapV2Pair.sol)에서 {#in-the-core-contract-uniswapv2pairsol-2}

7. 유동성 토큰을 발행하여 호출자에게 보냅니다
8. `_update`를 호출하여 예비금 수량을 업데이트합니다

### 유동성 제거 {#remove-liquidity-flow}

#### 호출자 {#caller-3}

1. 기본 토큰과 교환하기 위해 소각될 유동성 토큰의 허용량을 주변 계정에 제공합니다.
2. 주변부 컨트랙트의 `removeLiquidity` 함수 중 하나를 호출합니다.

#### 주변부 컨트랙트(UniswapV2Router02.sol)에서 {#in-the-periphery-contract-uniswapv2router02sol-3}

3. 유동성 토큰을 페어 교환으로 보냅니다

#### 코어 컨트랙트(UniswapV2Pair.sol)에서 {#in-the-core-contract-uniswapv2pairsol-3}

4. 소각된 토큰에 비례하여 기본 토큰을 대상 주소로 보냅니다. 예를 들어 풀에 A 토큰 1000개, B 토큰 500개, 유동성 토큰 90개가 있고, 소각할 토큰 9개를 받으면 유동성 토큰의 10%를 소각하는 것이므로 사용자에게 A 토큰 100개와 B 토큰 50개를 다시 보냅니다.
5. 유동성 토큰 소각
6. `_update`를 호출하여 예비금 수량을 업데이트합니다

## 코어 컨트랙트 {#core-contracts}

이것은 유동성을 보유하는 보안 컨트랙트입니다.

### UniswapV2Pair.sol {#UniswapV2Pair}

[이 컨트랙트](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol)는 토큰을 교환하는 실제 풀을 구현합니다. 이는 Uniswap의 핵심 기능입니다.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Pair.sol';
import './UniswapV2ERC20.sol';
import './libraries/Math.sol';
import './libraries/UQ112x112.sol';
import './interfaces/IERC20.sol';
import './interfaces/IUniswapV2Factory.sol';
import './interfaces/IUniswapV2Callee.sol';
```

이들은 컨트랙트가 구현하거나(`IUniswapV2Pair` 및 `UniswapV2ERC20`) 또는 구현하는 컨트랙트를 호출하기 때문에 컨트랙트가 알아야 하는 모든 인터페이스입니다.

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

이 컨트랙트는 유동성 토큰에 대한 ERC-20 기능을 제공하는 `UniswapV2ERC20`으로부터 상속받습니다.

```solidity
    using SafeMath  for uint;
```

[SafeMath 라이브러리](https://docs.openzeppelin.com/contracts/2.x/api/math)는 오버플로우와 언더플로우를 방지하는 데 사용됩니다. 이것이 중요한 이유는 그렇지 않으면 값이 `-1`이어야 하는데 대신 `2^256-1`이 되는 상황이 발생할 수 있기 때문입니다.

```solidity
    using UQ112x112 for uint224;
```

풀 컨트랙트의 많은 계산에는 분수가 필요합니다. 그러나 EVM은 분수를 지원하지 않습니다.
Uniswap이 찾은 해결책은 224비트 값을 사용하는 것이며, 정수 부분에 112비트, 분수 부분에 112비트를 사용합니다. 따라서 `1.0`은 `2^112`로, `1.5`는 `2^112 + 2^111`로 표현됩니다.

이 라이브러리에 대한 자세한 내용은 [문서 뒷부분](#FixedPoint)에서 확인할 수 있습니다.

#### 변수 {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

0으로 나누는 경우를 피하기 위해 항상 존재하는 최소 유동성 토큰 수가 있습니다(0 계정 소유). 그 숫자는 **MINIMUM_LIQUIDITY**, 즉 1,000입니다.

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

이것은 ERC-20 전송 함수에 대한 ABI 선택자입니다. 두 토큰 계정에서 ERC-20 토큰을 전송하는 데 사용됩니다.

```solidity
    address public factory;
```

이 풀을 생성한 팩토리 컨트랙트입니다. 모든 풀은 두 ERC-20 토큰 간의 교환이며, 팩토리는 이 모든 풀을 연결하는 중앙 지점입니다.

```solidity
    address public token0;
    address public token1;
```

이 풀에서 교환할 수 있는 두 가지 유형의 ERC-20 토큰에 대한 컨트랙트 주소입니다.

```solidity
    uint112 private reserve0;           // uses single storage slot, accessible via getReserves
    uint112 private reserve1;           // uses single storage slot, accessible via getReserves
```

풀이 각 토큰 유형에 대해 보유한 예비금입니다. 두 가지가 동일한 양의 가치를 나타낸다고 가정하므로 각 토큰0은 reserve1/reserve0 토큰1의 가치가 있습니다.

```solidity
    uint32  private blockTimestampLast; // uses single storage slot, accessible via getReserves
```

교환이 발생한 마지막 블록의 타임스탬프로, 시간에 따른 교환율을 추적하는 데 사용됩니다.

이더리움 컨트랙트의 가장 큰 가스 비용 중 하나는 스토리지이며, 이는 한 컨트랙트 호출에서 다음 호출까지 지속됩니다. 각 스토리지 셀은 256비트 길이입니다. 따라서 `reserve0`, `reserve1` 및 `blockTimestampLast` 세 가지 변수는 단일 스토리지 값에 세 가지 모두를 포함할 수 있도록 할당됩니다(112+112+32=256).

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

이 변수들은 각 토큰의 누적 비용을 보유합니다(각각 다른 토큰의 관점에서). 시간이 지남에 따라 평균 교환율을 계산하는 데 사용할 수 있습니다.

```solidity
    uint public kLast; // reserve0 * reserve1, as of immediately after the most recent liquidity event
```

페어 교환이 토큰0과 토큰1 간의 교환율을 결정하는 방법은 거래 중에 두 예비금의 곱을 일정하게 유지하는 것입니다. `kLast`는 이 값입니다. 유동성 공급자가 토큰을 예치하거나 인출할 때 변경되며 0.3%의 시장 수수료로 인해 약간 증가합니다.

다음은 간단한 예입니다. 간단하게 하기 위해 표에는 소수점 이하 세 자리만 있고 0.3% 거래 수수료는 무시하므로 숫자가 정확하지 않습니다.

| 이벤트                                                  |                  reserve0 |                  reserve1 | reserve0 \* reserve1 | 평균 교환율(토큰1 / 토큰0) |
| ---------------------------------------------------- | ------------------------: | ------------------------: | -------------------: | ------------------------------------ |
| 초기 설정                                                | 1,000.000 | 1,000.000 |            1,000,000 |                                      |
| 트레이더 A는 토큰0 50개를 토큰1 47.619개로 교환합니다  | 1,050.000 |   952.381 |            1,000,000 | 0.952                |
| 트레이더 B는 토큰0 10개를 토큰1 8.984개로 교환합니다   | 1,060.000 |   943.396 |            1,000,000 | 0.898                |
| 트레이더 C는 토큰0 40개를 토큰1 34.305개로 교환합니다  | 1,100.000 |   909.090 |            1,000,000 | 0.858                |
| 트레이더 D는 토큰1 100개를 토큰0 109.01개로 교환합니다 |   990.990 | 1,009.090 |            1,000,000 | 0.917                |
| 트레이더 E는 토큰0 10개를 토큰1 10.079개로 교환합니다  | 1,000.990 |   999.010 |            1,000,000 | 1.008                |

트레이더가 토큰0을 더 많이 제공함에 따라 토큰1의 상대적 가치가 증가하고 그 반대의 경우도 마찬가지이며 수요와 공급에 따라 결정됩니다.

#### 잠금 {#pair-lock}

```solidity
    uint private unlocked = 1;
```

[재진입 공격](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14)에 기반한 보안 취약점 클래스가 있습니다. Uniswap은 임의의 ERC-20 토큰을 전송해야 하므로 호출하는 Uniswap 시장을 남용하려는 ERC-20 컨트랙트를 호출할 수 있습니다.
컨트랙트의 일부로 `unlocked` 변수를 가짐으로써 함수가 실행되는 동안(동일한 트랜잭션 내에서) 호출되는 것을 방지할 수 있습니다.

```solidity
    modifier lock() {
```

이 함수는 어떤 방식으로든 동작을 변경하기 위해 일반 함수를 감싸는 함수인 [수정자](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers)입니다.

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

`unlocked`가 1과 같으면 0으로 설정합니다. 이미 0이면 호출을 되돌리고 실패하게 만듭니다.

```solidity
        _;
```

수정자에서 `_;`는 원래 함수 호출(모든 매개변수 포함)입니다. 여기서 이는 함수 호출이 호출되었을 때 `unlocked`가 1인 경우에만 발생하며, 실행 중에는 `unlocked` 값이 0임을 의미합니다.

```solidity
        unlocked = 1;
    }
```

주 함수가 반환된 후 잠금을 해제합니다.

#### 기타 함수 {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

이 함수는 호출자에게 교환의 현재 상태를 제공합니다. Solidity 함수는 [여러 값을 반환할 수 있습니다](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values).

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

이 내부 함수는 일정량의 ERC20 토큰을 교환에서 다른 사람에게 전송합니다. `SELECTOR`는 우리가 호출하는 함수가 `transfer(address,uint)`임을 지정합니다(위의 정의 참조).

토큰 함수에 대한 인터페이스를 가져올 필요가 없도록 [ABI 함수](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions) 중 하나를 사용하여 호출을 "수동으로" 생성합니다.

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

ERC-20 전송 호출이 실패를 보고할 수 있는 방법은 두 가지가 있습니다.

1. 되돌리기. 외부 컨트랙트 호출이 되돌려지면 부울 반환 값은 `false`입니다.
2. 정상적으로 종료되지만 실패를 보고합니다. 이 경우 반환 값 버퍼의 길이는 0이 아니며 부울 값으로 디코딩하면 `false`입니다

이러한 조건 중 하나라도 발생하면 되돌립니다.

#### 이벤트 {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

이 두 이벤트는 유동성 공급자가 유동성을 예치(`Mint`)하거나 인출(`Burn`)할 때 발생합니다. 두 경우 모두 예치 또는 인출된 토큰0 및 토큰1의 양은 우리를 호출한 계정의 신원(`sender`)과 마찬가지로 이벤트의 일부입니다. 인출의 경우 이벤트에는 토큰을 받은 대상(`to`)도 포함되며, 이는 발신자와 다를 수 있습니다.

```solidity
    event Swap(
        address indexed sender,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out,
        address indexed to
    );
```

이 이벤트는 트레이더가 한 토큰을 다른 토큰으로 교환할 때 발생합니다. 다시 말하지만, 발신자와 수신자는 같지 않을 수 있습니다.
각 토큰은 교환으로 보내거나 교환에서 받을 수 있습니다.

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

마지막으로 `Sync`는 이유에 관계없이 토큰이 추가되거나 인출될 때마다 발생하여 최신 예비금 정보(및 교환율)를 제공합니다.

#### 설정 함수 {#pair-setup}

이 함수들은 새 페어 교환이 설정될 때 한 번 호출되어야 합니다.

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

생성자는 페어를 생성한 팩토리의 주소를 추적하도록 합니다. 이 정보는 `initialize` 및 팩토리 수수료(있는 경우)에 필요합니다.

```solidity
    // called once by the factory at time of deployment
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // sufficient check
        token0 = _token0;
        token1 = _token1;
    }
```

이 함수를 사용하면 팩토리(팩토리만)가 이 쌍이 교환할 두 개의 ERC-20 토큰을 지정할 수 있습니다.

#### 내부 업데이트 함수 {#pair-update-internal}

##### \_update

```solidity
    // update reserves and, on the first call per block, price accumulators
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

이 함수는 토큰이 예치되거나 인출될 때마다 호출됩니다.

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

balance0 또는 balance1(uint256)이 uint112(-1) (=2^112-1)보다 높으면(따라서 uint112로 변환될 때 오버플로우 및 0으로 되돌아감) 오버플로우를 방지하기 위해 \_update를 계속하는 것을 거부합니다. 10^18 단위로 세분화할 수 있는 일반 토큰의 경우 각 교환은 각 토큰의 약 5.1\*10^15로 제한됩니다. 지금까지는 문제가 되지 않았습니다.

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // overflow is desired
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

경과 시간이 0이 아니면 이 블록에서 첫 번째 교환 트랜잭션임을 의미합니다. 이 경우 비용 누적기를 업데이트해야 합니다.

```solidity
            // * never overflows, and + overflow is desired
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

각 비용 누적기는 최신 비용(다른 토큰의 예비금/이 토큰의 예비금)에 경과 시간을 초 단위로 곱한 값으로 업데이트됩니다. 평균 가격을 얻으려면 두 시점의 누적 가격을 읽고 두 시점 간의 시간 차이로 나눕니다. 예를 들어 다음 이벤트 시퀀스를 가정해 보겠습니다.

| 이벤트                                                                         |                  reserve0 |                  reserve1 | 타임스탬프 | 한계 교환율(reserve1 / reserve0) |                                                       price0CumulativeLast |
| --------------------------------------------------------------------------- | ------------------------: | ------------------------: | ----- | ---------------------------------------------: | -------------------------------------------------------------------------: |
| 초기 설정                                                                       | 1,000.000 | 1,000.000 | 5,000 |                          1.000 |                                                                          0 |
| 트레이더 A는 토큰0 50개를 입금하고 토큰1 47.619개를 돌려받습니다.  | 1,050.000 |   952.381 | 5,020 |                          0.907 |                                                                         20 |
| 트레이더 B는 토큰0 10개를 입금하고 토큰1 8.984개를 돌려받습니다.   | 1,060.000 |   943.396 | 5,030 |                          0.890 |                       20+10\*0.907 = 29.07 |
| 트레이더 C는 토큰0 40개를 입금하고 토큰1 34.305개를 돌려받습니다.  | 1,100.000 |   909.090 | 5,100 |                          0.826 |    29.07+70\*0.890 = 91.37 |
| 트레이더 D는 토큰1 100개를 입금하고 토큰0 109.01개를 돌려받습니다. |   990.990 | 1,009.090 | 5,110 |                          1.018 |    91.37+10\*0.826 = 99.63 |
| 트레이더 E는 토큰0 10개를 입금하고 토큰1 10.079개를 돌려받습니다.  | 1,000.990 |   999.010 | 5,150 |                          0.998 | 99.63+40\*1.1018 = 143.702 |

타임스탬프 5,030과 5,150 사이의 **토큰0**의 평균 가격을 계산한다고 가정해 보겠습니다. `price0Cumulative` 값의 차이는 143.702-29.07=114.632입니다. 이는 2분(120초) 동안의 평균입니다. 따라서 평균 가격은 114.632/120 = 0.955입니다.

이 가격 계산이 우리가 이전 예비금 크기를 알아야 하는 이유입니다.

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

마지막으로 전역 변수를 업데이트하고 `Sync` 이벤트를 내보냅니다.

##### \_mintFee

```solidity
    // if fee is on, mint liquidity equivalent to 1/6th of the growth in sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

Uniswap 2.0에서 트레이더는 시장을 이용하기 위해 0.30%의 수수료를 지불합니다. 수수료의 대부분(거래의 0.25%)은 항상 유동성 공급자에게 지급됩니다. 나머지 0.05%는 유동성 공급자에게 가거나, 개발 노력에 대해 Uniswap에 지불하는 프로토콜 수수료로 팩토리에서 지정한 주소로 갈 수 있습니다.

계산(및 가스 비용)을 줄이기 위해 이 수수료는 각 트랜잭션이 아닌 풀에 유동성이 추가되거나 제거될 때만 계산됩니다.

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

팩토리의 수수료 목적지를 읽습니다. 0이면 프로토콜 수수료가 없으므로 해당 수수료를 계산할 필요가 없습니다.

```solidity
        uint _kLast = kLast; // gas savings
```

`kLast` 상태 변수는 스토리지에 있으므로 컨트랙트에 대한 다른 호출 간에 값을 가집니다.
스토리지에 대한 액세스는 컨트랙트에 대한 함수 호출이 종료될 때 해제되는 휘발성 메모리에 대한 액세스보다 훨씬 비싸므로 내부 변수를 사용하여 가스를 절약합니다.

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

유동성 공급자는 유동성 토큰의 가치 상승으로 인해 단순히 자신의 몫을 얻습니다. 그러나 프로토콜 수수료는 `feeTo` 주소에 새로운 유동성 토큰을 발행하고 제공해야 합니다.

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

프로토콜 수수료를 징수할 새로운 유동성이 있는 경우입니다. 제곱근 함수는 [이 문서의 뒷부분](#Math)에서 볼 수 있습니다.

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

이 복잡한 수수료 계산은 [백서](https://app.uniswap.org/whitepaper.pdf) 5페이지에 설명되어 있습니다. 우리는 `kLast`가 계산된 시점과 현재 사이에 유동성이 추가되거나 제거되지 않았다는 것을 알고 있습니다(유동성이 추가되거나 제거될 때마다 실제로 변경되기 전에 이 계산을 실행하기 때문). 따라서 `reserve0 * reserve1`의 모든 변경은 거래 수수료에서 비롯되어야 합니다(수수료가 없으면 `reserve0 * reserve1`을 일정하게 유지함).

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

`UniswapV2ERC20._mint` 함수를 사용하여 추가 유동성 토큰을 실제로 생성하고 `feeTo`에 할당합니다.

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

수수료가 없는 경우 `kLast`를 0으로 설정합니다(아직 그렇지 않은 경우). 이 컨트랙트가 작성되었을 때, 컨트랙트가 필요 없는 스토리지를 0으로 만들어 이더리움 상태의 전체 크기를 줄이도록 장려하는 [가스 환불 기능](https://eips.ethereum.org/EIPS/eip-3298)이 있었습니다.
이 코드는 가능한 경우 해당 환불을 받습니다.

#### 외부에서 접근 가능한 함수 {#pair-external}

모든 트랜잭션이나 컨트랙트가 이러한 함수를 호출할 수 _있지만_, 주변 컨트랙트에서 호출되도록 설계되었습니다. 직접 호출하면 페어 교환을 속일 수는 없지만 실수로 가치를 잃을 수 있습니다.

##### 발행

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function mint(address to) external lock returns (uint liquidity) {
```

이 함수는 유동성 공급자가 풀에 유동성을 추가할 때 호출됩니다. 보상으로 추가 유동성 토큰을 발행합니다. 동일한 트랜잭션에서 유동성을 추가한 후 이를 호출하는 [주변 컨트랙트](#UniswapV2Router02)에서 호출해야 합니다(따라서 다른 누구도 합법적인 소유자보다 먼저 새로운 유동성을 주장하는 트랜잭션을 제출할 수 없음).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
```

이것은 여러 값을 반환하는 Solidity 함수의 결과를 읽는 방법입니다. 마지막으로 반환된 값인 블록 타임스탬프는 필요하지 않으므로 버립니다.

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

현재 잔액을 가져와 각 토큰 유형이 얼마나 추가되었는지 확인합니다.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

수집할 프로토콜 수수료(있는 경우)를 계산하고 그에 따라 유동성 토큰을 발행합니다. `_mintFee`에 대한 매개변수가 이전 예비금 값이므로 수수료는 수수료로 인한 풀 변경 사항에만 기반하여 정확하게 계산됩니다.

```solidity
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // permanently lock the first MINIMUM_LIQUIDITY tokens
```

첫 번째 예치인 경우 `MINIMUM_LIQUIDITY` 토큰을 생성하고 0 주소로 보내 잠급니다. 절대로 상환할 수 없으므로 풀이 완전히 비워지지 않습니다(이로 인해 일부 곳에서 0으로 나누는 것을 방지할 수 있음). `MINIMUM_LIQUIDITY`의 값은 1000이며, 대부분의 ERC-20이 ETH가 wei로 나뉘는 것처럼 10^-18 단위의 토큰으로 세분화된다는 점을 고려하면 단일 토큰 값의 10^-15입니다. 비용이 많이 들지 않습니다.

첫 번째 예치 시에는 두 토큰의 상대적 가치를 알 수 없으므로, 예치가 두 토큰에서 동일한 가치를 제공한다고 가정하고 양을 곱하고 제곱근을 취합니다.

차익 거래로 인한 가치 손실을 피하기 위해 동일한 가치를 제공하는 것이 예금자의 이익에 부합하므로 이를 신뢰할 수 있습니다.
두 토큰의 가치가 동일하다고 가정하지만 예금자는 **토큰0**보다 **토큰1**을 네 배 더 많이 예치했습니다. 트레이더는 페어 교환이 **토큰0**이 더 가치 있다고 생각한다는 사실을 이용하여 가치를 추출할 수 있습니다.

| 이벤트                                                            | reserve0 | reserve1 | reserve0 \* reserve1 | 풀 가치(reserve0 + reserve1) |
| -------------------------------------------------------------- | -------: | -------: | -------------------: | -------------------------------------------: |
| 초기 설정                                                          |        8 |       32 |                  256 |                                           40 |
| 트레이더가 **토큰0** 토큰 8개를 예치하고 **토큰1** 16개를 돌려받습니다. |       16 |       16 |                  256 |                                           32 |

보시다시피 트레이더는 추가로 8개의 토큰을 얻었으며, 이는 풀 가치 감소에서 비롯되어 이를 소유한 예금자에게 피해를 줍니다.

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

이후 모든 예치에서 우리는 이미 두 자산 간의 교환율을 알고 있으며 유동성 공급자가 두 자산 모두에서 동일한 가치를 제공할 것으로 기대합니다. 그렇지 않은 경우 벌칙으로 제공한 더 적은 가치를 기준으로 유동성 토큰을 제공합니다.

초기 예치이든 후속 예치이든, 우리가 제공하는 유동성 토큰의 수는 `reserve0*reserve1`의 변화의 제곱근과 같으며 유동성 토큰의 가치는 변경되지 않습니다(두 유형 모두 동일한 가치를 갖지 않는 예치를 받지 않는 한, 이 경우 "벌금"이 분배됨). 다음은 동일한 가치를 가진 두 토큰의 또 다른 예이며, 세 가지 좋은 예치와 한 가지 나쁜 예치(한 가지 토큰 유형만 예치하여 유동성 토큰을 생성하지 않음)가 있습니다.

| 이벤트         |                                reserve0 |                                reserve1 | reserve0 \* reserve1 | 풀 가치(reserve0 + reserve1) | 이 예치에 대해 발행된 유동성 토큰 | 총 유동성 토큰 |                           각 유동성 토큰의 가치 |
| ----------- | --------------------------------------: | --------------------------------------: | -------------------: | -------------------------------------------: | ------------------: | -------: | -------------------------------------: |
| 초기 설정       |                   8.000 |                   8.000 |                   64 |                       16.000 |                   8 |        8 |                  2.000 |
| 각 유형 4개씩 예치 |                  12.000 |                  12.000 |                  144 |                       24.000 |                   4 |       12 |                  2.000 |
| 각 유형 2개씩 예치 |                  14.000 |                  14.000 |                  196 |                       28.000 |                   2 |       14 |                  2.000 |
| 불균등 가치 예치   |                  18.000 |                  14.000 |                  252 |                       32.000 |                   0 |       14 | ~2.286 |
| 차익거래 후      | ~15.874 | ~15.874 |                  252 |      ~31.748 |                   0 |       14 | ~2.267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

`UniswapV2ERC20._mint` 함수를 사용하여 추가 유동성 토큰을 실제로 생성하고 올바른 계정에 제공합니다.

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Mint(msg.sender, amount0, amount1);
    }
```

상태 변수(`reserve0`, `reserve1`, 필요한 경우 `kLast`)를 업데이트하고 적절한 이벤트를 내보냅니다.

##### 소각

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

이 함수는 유동성이 인출되고 적절한 유동성 토큰을 소각해야 할 때 호출됩니다.
[주변 계정](#UniswapV2Router02)에서도 호출해야 합니다.

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        address _token0 = token0;                                // gas savings
        address _token1 = token1;                                // gas savings
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

주변 컨트랙트는 호출 전에 소각할 유동성을 이 컨트랙트로 전송했습니다. 이렇게 하면 얼마나 많은 유동성을 소각해야 하는지 알 수 있고, 소각되었는지 확인할 수 있습니다.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        amount0 = liquidity.mul(balance0) / _totalSupply; // using balances ensures pro-rata distribution
        amount1 = liquidity.mul(balance1) / _totalSupply; // using balances ensures pro-rata distribution
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

유동성 공급자는 두 토큰 모두에서 동일한 가치를 받습니다. 이렇게 하면 교환율이 변경되지 않습니다.

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

나머지 `burn` 함수는 위의 `mint` 함수의 미러 이미지입니다.

##### 교환

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

이 함수는 [주변 컨트랙트](#UniswapV2Router02)에서도 호출되어야 합니다.

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // scope for _token{0,1}, avoids stack too deep errors
```

지역 변수는 메모리에 저장되거나, 너무 많지 않으면 스택에 직접 저장될 수 있습니다.
스택을 사용하도록 수를 제한할 수 있다면 가스를 덜 사용하게 됩니다. 자세한 내용은 [황서, 공식 이더리움 사양](https://ethereum.github.io/yellowpaper/paper.pdf), 26페이지, 수식 298을 참조하세요.

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimistically transfer tokens
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimistically transfer tokens
```

모든 조건이 충족되었는지 확인하기 전에 전송하므로 이 전송은 낙관적입니다. 이더리움에서는 나중에 호출에서 조건이 충족되지 않으면 되돌리고 생성된 모든 변경 사항을 되돌리기 때문에 괜찮습니다.

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

요청 시 수신자에게 교환에 대해 알립니다.

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

현재 잔액을 가져옵니다. 주변 컨트랙트는 교환을 위해 우리를 호출하기 전에 토큰을 보냅니다. 이렇게 하면 컨트랙트가 속고 있지 않은지 쉽게 확인할 수 있으며, 이 확인은 코어 컨트랙트에서 _반드시_ 수행해야 합니다(주변 컨트랙트 이외의 다른 개체에 의해 호출될 수 있기 때문).

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // scope for reserve{0,1}Adjusted, avoids stack too deep errors
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

교환으로 인해 손실되지 않도록 하기 위한 온전성 검사입니다. 교환이 `reserve0*reserve1`을 감소시켜야 하는 상황은 없습니다. 이것은 또한 교환 시 0.3%의 수수료가 전송되도록 하는 곳입니다. K 값을 온전성 검사하기 전에 두 잔액에 1000을 곱하고 금액에 3을 곱한 값을 뺍니다. 이는 K 값을 현재 예비금 K 값과 비교하기 전에 잔액에서 0.3%(3/1000 = 0.003 = 0.3%)가 공제됨을 의미합니다.

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

`reserve0` 및 `reserve1`을 업데이트하고 필요한 경우 가격 누적기와 타임스탬프를 업데이트하고 이벤트를 내보냅니다.

##### 동기화 또는 훑어보기

실제 잔액이 페어 교환이 가지고 있다고 생각하는 예비금과 동기화되지 않을 수 있습니다.
컨트랙트의 동의 없이 토큰을 인출할 방법은 없지만, 예치는 다른 문제입니다. 계정은 `mint` 또는 `swap`을 호출하지 않고 교환에 토큰을 전송할 수 있습니다.

이 경우 두 가지 해결책이 있습니다.

- `sync`, 예비금을 현재 잔액으로 업데이트
- `skim`, 초과 금액 인출. 누가 토큰을 입금했는지 알 수 없으므로 모든 계정이 `skim`을 호출할 수 있습니다. 이 정보는 이벤트에서 발생하지만 블록체인에서는 이벤트에 액세스할 수 없습니다.

```solidity
    // force balances to match reserves
    function skim(address to) external lock {
        address _token0 = token0; // gas savings
        address _token1 = token1; // gas savings
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // force reserves to match balances
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#UniswapV2Factory}

[이 컨트랙트](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol)는 페어 교환을 생성합니다.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

이러한 상태 변수는 프로토콜 수수료를 구현하는 데 필요합니다([백서](https://app.uniswap.org/whitepaper.pdf), 5페이지 참조).
`feeTo` 주소는 프로토콜 수수료에 대한 유동성 토큰을 누적하고, `feeToSetter`는 `feeTo`를 다른 주소로 변경할 수 있는 주소입니다.

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

이 변수들은 두 토큰 유형 간의 교환인 페어를 추적합니다.

첫 번째 `getPair`는 두 ERC-20 토큰 교환을 기반으로 페어 교환 컨트랙트를 식별하는 매핑입니다. ERC-20 토큰은 이를 구현하는 컨트랙트의 주소로 식별되므로 키와 값은 모두 주소입니다. `tokenA`에서 `tokenB`로 변환할 수 있는 페어 교환의 주소를 얻으려면 `getPair[<tokenA 주소>][<tokenB 주소>]`(또는 그 반대)를 사용합니다.

두 번째 변수 `allPairs`는 이 팩토리에서 생성된 페어 교환의 모든 주소를 포함하는 배열입니다. 이더리움에서는 매핑의 내용을 반복하거나 모든 키 목록을 얻을 수 없으므로 이 변수는 이 팩토리가 관리하는 교환을 알 수 있는 유일한 방법입니다.

참고: 매핑의 모든 키를 반복할 수 없는 이유는 컨트랙트 데이터 스토리지가 _비싸기_ 때문이며, 따라서 덜 사용하고 덜 자주 변경할수록 좋습니다. [반복을 지원하는 매핑](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol)을 생성할 수 있지만 키 목록에 대한 추가 스토리지가 필요합니다. 대부분의 애플리케이션에서는 필요하지 않습니다.

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

이 이벤트는 새 페어 교환이 생성될 때 발생합니다. 토큰 주소, 페어 교환 주소 및 팩토리에서 관리하는 총 교환 수가 포함됩니다.

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

생성자가 하는 유일한 일은 `feeToSetter`를 지정하는 것입니다. 팩토리는 수수료 없이 시작하며 `feeSetter`만이 이를 변경할 수 있습니다.

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

이 함수는 교환 쌍의 수를 반환합니다.

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

이는 두 ERC-20 토큰 간의 페어 교환을 생성하는 팩토리의 주요 기능입니다. 누구나 이 함수를 호출할 수 있습니다. 새 페어 교환을 생성하기 위해 Uniswap의 허가가 필요하지 않습니다.

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

새로운 교환 주소가 결정적이기를 원하므로 오프체인에서 미리 계산할 수 있습니다(이는 [레이어 2 트랜잭션](/developers/docs/scaling/)에 유용할 수 있습니다).
이를 위해 받은 순서에 관계없이 토큰 주소의 일관된 순서를 가져야 하므로 여기서 정렬합니다.

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // single check is sufficient
```

큰 유동성 풀은 가격이 더 안정적이기 때문에 작은 풀보다 좋습니다. 토큰 쌍당 하나의 유동성 풀만 원합니다. 이미 교환이 있는 경우 동일한 쌍에 대해 다른 교환을 생성할 필요가 없습니다.

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

새 컨트랙트를 생성하려면 이를 생성하는 코드(생성자 함수와 실제 컨트랙트의 EVM 바이트코드를 메모리에 쓰는 코드 모두)가 필요합니다. 일반적으로 Solidity에서는 `addr = new <name of contract>(<constructor parameters>)`를 사용하고 컴파일러가 모든 것을 처리하지만, 결정적인 컨트랙트 주소를 갖기 위해서는 [CREATE2 옵코드](https://eips.ethereum.org/EIPS/eip-1014)를 사용해야 합니다.
이 코드가 작성되었을 때 해당 옵코드는 아직 Solidity에서 지원되지 않았으므로 코드를 수동으로 가져와야 했습니다. 이제 [Solidity가 CREATE2를 지원하므로](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2) 더 이상 문제가 되지 않습니다.

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

옵코드가 아직 Solidity에서 지원되지 않는 경우 [인라인 어셈블리](https://docs.soliditylang.org/en/v0.8.3/assembly.html)를 사용하여 호출할 수 있습니다.

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

`initialize` 함수를 호출하여 새 교환이 교환할 두 토큰을 알려줍니다.

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
```

상태 변수에 새 페어 정보를 저장하고 이벤트를 내보내 세상에 새 페어 교환을 알립니다.

```solidity
    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeToSetter = _feeToSetter;
    }
}
```

이 두 함수를 사용하면 `feeSetter`가 수수료 수령인(있는 경우)을 제어하고 `feeSetter`를 새 주소로 변경할 수 있습니다.

### UniswapV2ERC20.sol {#UniswapV2ERC20}

[이 컨트랙트](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol)는 ERC-20 유동성 토큰을 구현합니다. 이는 [OpenZeppelin ERC-20 컨트랙트](/developers/tutorials/erc20-annotated-code)와 유사하므로, 다른 부분인 `permit` 기능에 대해서만 설명하겠습니다.

이더리움에서의 트랜잭션은 실물 화폐에 해당하는 이더(ETH) 비용이 듭니다. ERC-20 토큰은 있지만 ETH가 없으면 트랜잭션을 보낼 수 없으므로 아무것도 할 수 없습니다. 이 문제를 피하기 위한 한 가지 해결책은 [메타 트랜잭션](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions)입니다.
토큰 소유자는 다른 사람이 오프체인으로 토큰을 인출할 수 있도록 하는 트랜잭션에 서명하고 인터넷을 사용하여 수신자에게 보냅니다. 그런 다음 ETH를 가진 수신자는 소유자를 대신하여 허가를 제출합니다.

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

이 해시는 [트랜잭션 유형 식별자](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash)입니다. 여기서 지원하는 유일한 것은 이러한 매개변수를 가진 `Permit`입니다.

```solidity
    mapping(address => uint) public nonces;
```

수신자가 디지털 서명을 위조하는 것은 불가능합니다. 그러나 동일한 트랜잭션을 두 번 보내는 것은 사소한 일입니다(이는 [재전송 공격](https://wikipedia.org/wiki/Replay_attack)의 한 형태입니다). 이를 방지하기 위해 [논스](https://wikipedia.org/wiki/Cryptographic_nonce)를 사용합니다. 새로운 `Permit`의 논스가 마지막으로 사용된 것보다 1 크지 않으면 유효하지 않은 것으로 간주합니다.

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

[체인 식별자](https://chainid.network/)를 검색하는 코드입니다. 이는 [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html)이라는 EVM 어셈블리 방언을 사용합니다. 현재 버전의 Yul에서는 `chainid`가 아닌 `chainid()`를 사용해야 합니다.

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'),
                keccak256(bytes(name)),
                keccak256(bytes('1')),
                chainId,
                address(this)
            )
        );
    }
```

EIP-712에 대한 [도메인 구분자](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator)를 계산합니다.

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

권한을 구현하는 함수입니다. 매개변수로 관련 필드와 [서명](https://yos.io/2018/11/16/ethereum-signatures/)에 대한 세 가지 스칼라 값(v, r, s)을 받습니다.

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

마감일 이후의 트랜잭션을 수락하지 마세요.

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)`는 우리가 받기를 기대하는 메시지입니다. 우리는 논스가 무엇이어야 하는지 알고 있으므로 매개변수로 받을 필요가 없습니다.

이더리움 서명 알고리즘은 서명할 256비트를 기대하므로 `keccak256` 해시 함수를 사용합니다.

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

다이제스트와 서명에서 [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/)를 사용하여 서명한 주소를 얻을 수 있습니다.

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

모든 것이 정상이면 이를 [ERC-20 승인](https://eips.ethereum.org/EIPS/eip-20#approve)으로 처리합니다.

## 주변 컨트랙트 {#periphery-contracts}

주변 컨트랙트는 Uniswap용 API(애플리케이션 프로그램 인터페이스)입니다. 다른 컨트랙트나 탈중앙화 애플리케이션에서 외부 호출을 위해 사용할 수 있습니다. 코어 컨트랙트를 직접 호출할 수 있지만 더 복잡하고 실수하면 가치를 잃을 수 있습니다. 코어 컨트랙트에는 속지 않았는지 확인하기 위한 테스트만 포함되어 있으며 다른 사람을 위한 온전성 검사는 포함되어 있지 않습니다. 이들은 필요에 따라 업데이트할 수 있도록 주변에 있습니다.

### UniswapV2Router01.sol {#UniswapV2Router01}

[이 컨트랙트](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol)에는 문제가 있으며 [더 이상 사용해서는 안 됩니다](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01). 다행히 주변 컨트랙트는 상태 비저장 상태이며 자산을 보유하지 않으므로, 이를 사용 중단하고 대체품인 `UniswapV2Router02`를 사용하도록 제안하기 쉽습니다.

### UniswapV2Router02.sol {#UniswapV2Router02}

대부분의 경우 [이 컨트랙트](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol)를 통해 Uniswap을 사용합니다.
사용 방법은 [여기](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02)에서 볼 수 있습니다.

```solidity
pragma solidity =0.6.6;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';
import '@uniswap/lib/contracts/libraries/TransferHelper.sol';

import './interfaces/IUniswapV2Router02.sol';
import './libraries/UniswapV2Library.sol';
import './libraries/SafeMath.sol';
import './interfaces/IERC20.sol';
import './interfaces/IWETH.sol';
```

이들 대부분은 이전에 접했거나 상당히 명확합니다. 한 가지 예외는 `IWETH.sol`입니다. Uniswap v2는 모든 ERC-20 토큰 쌍에 대한 교환을 허용하지만, 이더(ETH) 자체는 ERC-20 토큰이 아닙니다. 표준보다 먼저 존재하며 고유한 메커니즘으로 전송됩니다. ERC-20 토큰에 적용되는 컨트랙트에서 ETH 사용을 가능하게 하기 위해 [랩핑된 이더(WETH)](https://weth.tkn.eth.limo/) 컨트랙트가 개발되었습니다. 이 컨트랙트에 ETH를 보내면 동등한 양의 WETH를 발행합니다. 또는 WETH를 소각하고 ETH를 돌려받을 수 있습니다.

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

라우터는 사용할 팩토리와 WETH가 필요한 트랜잭션에 사용할 WETH 컨트랙트를 알아야 합니다. 이러한 값은 [불변](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables)이며, 생성자에서만 설정할 수 있습니다. 이를 통해 사용자는 아무도 덜 정직한 컨트랙트를 가리키도록 변경할 수 없다는 확신을 가질 수 있습니다.

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

이 수정자는 시간 제한이 있는 트랜잭션("시간 Y 이전에 X를 수행할 수 있는 경우")이 시간 제한 이후에 발생하지 않도록 합니다.

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

생성자는 불변 상태 변수만 설정합니다.

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // only accept ETH via fallback from the WETH contract
    }
```

이 함수는 WETH 컨트랙트에서 토큰을 다시 ETH로 상환할 때 호출됩니다. 우리가 사용하는 WETH 컨트랙트만 이를 수행할 수 있습니다.

#### 유동성 추가 {#add-liquidity}

이러한 함수는 페어 교환에 토큰을 추가하여 유동성 풀을 늘립니다.

```solidity

    // **** ADD LIQUIDITY ****
    function _addLiquidity(
```

이 함수는 페어 교환에 예치해야 하는 A 및 B 토큰의 양을 계산하는 데 사용됩니다.

```solidity
        address tokenA,
        address tokenB,
```

ERC-20 토큰 컨트랙트의 주소입니다.

```solidity
        uint amountADesired,
        uint amountBDesired,
```

유동성 공급자가 예치하려는 금액입니다. 또한 예치할 A와 B의 최대 금액이기도 합니다.

```solidity
        uint amountAMin,
        uint amountBMin
```

예치할 최소 허용 금액입니다. 이 금액 이상으로 트랜잭션이 발생할 수 없는 경우 되돌립니다. 이 기능이 필요하지 않으면 0을 지정하면 됩니다.

일반적으로 유동성 공급자는 트랜잭션을 현재와 가까운 교환율로 제한하기를 원하기 때문에 최소값을 지정합니다. 교환율이 너무 많이 변동하면 기본 가치를 변경하는 뉴스를 의미할 수 있으며 수동으로 무엇을 해야 할지 결정하기를 원합니다.

예를 들어 교환율이 1대1이고 유동성 공급자가 다음 값을 지정하는 경우를 상상해 보십시오.

| 매개 변수          |    값 |
| -------------- | ---: |
| amountADesired | 1000 |
| amountBDesired | 1000 |
| amountAMin     |  900 |
| amountBMin     |  800 |

교환율이 0.9에서 1.25 사이에 머무는 한 트랜잭션이 발생합니다. 교환율이 해당 범위를 벗어나면 트랜잭션이 취소됩니다.

이러한 예방 조치의 이유는 트랜잭션이 즉각적이지 않기 때문입니다. 트랜잭션을 제출하면 결국 검증자가 블록에 포함시킬 것입니다(가스 가격이 매우 낮지 않은 경우, 덮어쓰기 위해 동일한 논스와 더 높은 가스 가격으로 다른 트랜잭션을 제출해야 함). 제출과 포함 사이의 간격 동안 발생하는 일을 제어할 수 없습니다.

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

이 함수는 유동성 공급자가 현재 예비금 간의 비율과 동일한 비율을 갖도록 예치해야 하는 금액을 반환합니다.

```solidity
        // create the pair if it doesn't exist yet
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

이 토큰 쌍에 대한 교환이 아직 없으면 생성합니다.

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

쌍의 현재 예비금을 가져옵니다.

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

현재 예비금이 비어 있으면 새 페어 교환입니다. 예치할 금액은 유동성 공급자가 제공하려는 금액과 정확히 동일해야 합니다.

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

금액이 얼마가 될지 확인해야 하는 경우 [이 함수](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35)를 사용하여 최적의 금액을 얻습니다. 현재 예비금과 동일한 비율을 원합니다.

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

`amountBOptimal`이 유동성 공급자가 예치하려는 금액보다 작으면 토큰 B가 현재 유동성 예금자가 생각하는 것보다 더 가치가 있으므로 더 적은 금액이 필요함을 의미합니다.

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

최적 B 금액이 원하는 B 금액보다 많으면 B 토큰이 현재 유동성 예금자가 생각하는 것보다 가치가 낮다는 것을 의미하므로 더 많은 금액이 필요합니다. 그러나 원하는 금액은 최대값이므로 그렇게 할 수 없습니다. 대신 원하는 B 토큰 양에 대한 최적의 A 토큰 수를 계산합니다.

이 모든 것을 종합하면 다음 그래프가 나타납니다. A 토큰 1,000개(파란색 선)와 B 토큰 1,000개(빨간색 선)를 예치하려고 한다고 가정합니다. x축은 교환율, 즉 A/B입니다. x=1이면 가치가 같고 각각 1,000개씩 예치합니다. x=2이면 A가 B의 두 배 가치가 있으므로(A 토큰당 B 토큰 2개를 받음) B 토큰 1,000개를 예치하지만 A 토큰은 500개만 예치합니다. x=0.5이면 상황이 반전되어 A 토큰 1,000개와 B 토큰 500개입니다.

![그래프](liquidityProviderDeposit.png)

코어 컨트랙트에 직접 유동성을 예치할 수 있지만([UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110) 사용), 코어 컨트랙트는 스스로 속지 않았는지 확인만 하므로 트랜잭션을 제출하는 시점과 실행되는 시점 사이에 교환율이 변경되면 가치를 잃을 위험이 있습니다. 주변 컨트랙트를 사용하면 예치해야 할 금액을 계산하고 즉시 예치하므로 교환율이 변경되지 않고 아무것도 잃지 않습니다.

```solidity
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
```

이 함수는 트랜잭션에서 호출하여 유동성을 예치할 수 있습니다. 대부분의 매개변수는 위 `_addLiquidity`와 동일하며 두 가지 예외가 있습니다.

. `to`는 유동성 공급자의 풀 지분을 표시하기 위해 발행된 새 유동성 토큰을 받는 주소입니다.
`deadline`은 트랜잭션의 시간 제한입니다.

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

실제로 예치할 금액을 계산한 다음 유동성 풀의 주소를 찾습니다. 가스를 절약하기 위해 팩토리에 묻지 않고 라이브러리 함수 `pairFor`(아래 라이브러리 참조)를 사용합니다.

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

사용자로부터 올바른 양의 토큰을 페어 교환으로 전송합니다.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

그 대가로 `to` 주소에 풀의 부분 소유권에 대한 유동성 토큰을 제공합니다. 코어 컨트랙트의 `mint` 함수는 추가 토큰이 몇 개 있는지 확인하고(마지막으로 유동성이 변경되었을 때와 비교하여) 그에 따라 유동성을 발행합니다.

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

유동성 공급자가 토큰/ETH 페어 교환에 유동성을 제공하려는 경우 몇 가지 차이점이 있습니다. 컨트랙트는 유동성 공급자를 위해 ETH를 래핑하는 것을 처리합니다. 사용자가 트랜잭션과 함께 ETH를 보내므로(`msg.value`에서 금액 확인 가능) 사용자가 예치하려는 ETH의 양을 지정할 필요가 없습니다.

```solidity
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external virtual override payable ensure(deadline) returns (uint amountToken, uint amountETH, uint liquidity) {
        (amountToken, amountETH) = _addLiquidity(
            token,
            WETH,
            amountTokenDesired,
            msg.value,
            amountTokenMin,
            amountETHMin
        );
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        TransferHelper.safeTransferFrom(token, msg.sender, pair, amountToken);
        IWETH(WETH).deposit{value: amountETH}();
        assert(IWETH(WETH).transfer(pair, amountETH));
```

ETH를 예치하기 위해 컨트랙트는 먼저 이를 WETH로 래핑한 다음 WETH를 페어로 전송합니다. 전송이 `assert`에 래핑되어 있습니다. 이는 전송이 실패하면 이 컨트랙트 호출도 실패하므로 래핑이 실제로 발생하지 않음을 의미합니다.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // refund dust eth, if any
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

사용자는 이미 우리에게 ETH를 보냈으므로, 남은 여분의 ETH가 있는 경우(다른 토큰이 사용자가 생각하는 것보다 가치가 낮기 때문에) 환불을 발행해야 합니다.

#### 유동성 제거 {#remove-liquidity}

이러한 함수는 유동성을 제거하고 유동성 공급자에게 상환합니다.

```solidity
    // **** REMOVE LIQUIDITY ****
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountA, uint amountB) {
```

유동성을 제거하는 가장 간단한 경우입니다. 유동성 공급자가 수락하는 각 토큰의 최소 금액이 있으며 마감일 이전에 발생해야 합니다.

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // send liquidity to pair
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

코어 컨트랙트의 `burn` 함수는 사용자에게 토큰을 상환하는 것을 처리합니다.

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

함수가 여러 값을 반환하지만 일부 값에만 관심이 있는 경우, 이렇게 하면 해당 값만 얻을 수 있습니다. 값을 읽고 사용하지 않는 것보다 가스 측면에서 다소 저렴합니다.

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

코어 컨트랙트가 반환하는 방식(낮은 주소 토큰 우선)에서 사용자가 기대하는 방식(`tokenA` 및 `tokenB`에 해당)으로 금액을 변환합니다.

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

먼저 전송을 수행한 다음 합법적인지 확인하는 것은 괜찮습니다. 합법적이지 않으면 모든 상태 변경을 되돌리기 때문입니다.

```solidity
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountToken, uint amountETH) {
        (amountToken, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, amountToken);
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }
```

ETH에 대한 유동성을 제거하는 것은 거의 동일하며, WETH 토큰을 받은 다음 이를 ETH로 상환하여 유동성 공급자에게 돌려주는 것만 다릅니다.

```solidity
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountA, uint amountB) {
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountA, amountB) = removeLiquidity(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline);
    }


    function removeLiquidityETHWithPermit(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountToken, uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountToken, amountETH) = removeLiquidityETH(token, liquidity, amountTokenMin, amountETHMin, to, deadline);
    }
```

이러한 함수는 [허가 메커니즘](#UniswapV2ERC20)을 사용하여 이더가 없는 사용자가 풀에서 인출할 수 있도록 메타 트랜잭션을 중계합니다.

```solidity

    // **** REMOVE LIQUIDITY (supporting fee-on-transfer tokens) ****
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountETH) {
        (, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, IERC20(token).balanceOf(address(this)));
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }

```

이 함수는 전송 또는 스토리지 수수료가 있는 토큰에 사용할 수 있습니다. 토큰에 이러한 수수료가 있는 경우 `removeLiquidity` 함수에 의존하여 토큰을 얼마나 돌려받을 수 있는지 알 수 없으므로 먼저 인출한 다음 잔액을 가져와야 합니다.

```solidity


    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        amountETH = removeLiquidityETHSupportingFeeOnTransferTokens(
            token, liquidity, amountTokenMin, amountETHMin, to, deadline
        );
    }
```

최종 함수는 저장 공간 수수료와 메타 트랜잭션을 결합합니다.

#### 교환 {#trade}

```solidity
    // **** 교환 ****
    // 첫 번째 페어로 초기 금액이 이미 전송되었어야 합니다.
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

이 함수는 거래자에게 노출되는 함수에 필요한 내부 처리를 수행합니다.

```solidity
        for (uint i; i < path.length - 1; i++) {
```

이 글을 쓰는 시점에 [388,160개의 ERC-20 토큰](https://eth.blockscout.com/tokens)이 있습니다. 각 토큰 페어에 대한 페어 교환이 있다면 1,500억 개 이상의 페어 교환이 있을 것입니다. 현재 전체 체인에는 [해당 계정 수의 0.1%만](https://eth.blockscout.com/stats/accountsGrowth) 있습니다. 대신 교환 함수는 경로의 개념을 지원합니다. 거래자는 A를 B로, B를 C로, C를 D로 교환할 수 있으므로 직접적인 A-D 페어 교환이 필요하지 않습니다.

이러한 시장의 가격은 동기화되는 경향이 있는데, 이는 동기화가 되지 않을 때 차익 거래의 기회가 생기기 때문입니다. 예를 들어, A, B, C 세 개의 토큰이 있다고 상상해 보세요. 각 페어에 대해 하나씩, 세 개의 페어 교환이 있습니다.

1. 초기 상태
2. 거래자는 24.695 A 토큰을 판매하고 25.305 B 토큰을 얻습니다.
3. 거래자는 24.695 B 토큰을 25.305 C 토큰으로 판매하여 약 0.61 B 토큰을 이익으로 남깁니다.
4. 그런 다음 거래자는 24.695 C 토큰을 25.305 A 토큰으로 판매하여 약 0.61 C 토큰을 이익으로 남깁니다. 거래자는 또한 0.61개의 추가 A 토큰을 갖게 됩니다(거래자가 최종적으로 얻게 되는 25.305개에서 원래 투자한 24.695개를 뺀 값).

| 단계 | A-B 교환                                                                                      | B-C 교환                                                                                      | A-C 교환                                                                                      |
| -- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 1  | A:1000 B:1050 A/B=1.05                      | B:1000 C:1050 B/C=1.05                      | A:1050 C:1000 C/A=1.05                      |
| 2  | A:1024.695 B:1024.695 A/B=1 | B:1000 C:1050 B/C=1.05                      | A:1050 C:1000 C/A=1.05                      |
| 3  | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1050 C:1000 C/A=1.05                      |
| 4  | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1024.695 C:1024.695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

현재 처리 중인 페어를 가져와 정렬하고(페어와 함께 사용하기 위해) 예상 출력량을 가져옵니다.

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

페어 교환에서 예상하는 방식으로 정렬된 예상 출력량을 가져옵니다.

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

이것이 마지막 교환입니까? 그렇다면 거래를 위해 받은 토큰을 목적지로 보냅니다. 그렇지 않다면 다음 페어 교환으로 보냅니다.

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

실제로 페어 교환을 호출하여 토큰을 교환합니다. 교환에 대한 콜백이 필요 없으므로 해당 필드에 바이트를 보내지 않습니다.

```solidity
    function swapExactTokensForTokens(
```

이 함수는 거래자가 한 토큰을 다른 토큰으로 교환하기 위해 직접 사용합니다.

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

이 매개변수에는 ERC-20 컨트랙트의 주소가 포함됩니다. 위에서 설명했듯이, 가지고 있는 자산에서 원하는 자산으로 가기 위해 여러 페어 교환을 거쳐야 할 수도 있기 때문에 이는 배열입니다.

솔리디티의 함수 매개변수는 `memory` 또는 `calldata`에 저장될 수 있습니다. 함수가 컨트랙트의 진입점이고, 사용자(트랜잭션을 통해)나 다른 컨트랙트에서 직접 호출되는 경우, 매개변수의 값은 호출 데이터에서 직접 가져올 수 있습니다. 위의 `_swap`과 같이 함수가 내부적으로 호출되는 경우, 매개변수는 `memory`에 저장되어야 합니다. 호출된 컨트랙트의 관점에서 `calldata`는 읽기 전용입니다.

`uint`나 `address`와 같은 스칼라 타입의 경우 컴파일러가 저장 공간 선택을 처리하지만, 더 길고 비용이 많이 드는 배열의 경우 사용할 저장 공간의 타입을 지정합니다.

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

반환 값은 항상 메모리에서 반환됩니다.

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

각 교환에서 구매할 금액을 계산합니다. 결과가 거래자가 수락하려는 최소값보다 작으면 트랜잭션을 되돌립니다.

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

마지막으로, 초기 ERC-20 토큰을 첫 번째 페어 교환 계정으로 전송하고 `_swap`을 호출합니다. 이 모든 것은 동일한 트랜잭션 내에서 발생하므로 페어 교환은 예기치 않은 토큰이 이 전송의 일부임을 압니다.

```solidity
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

이전 함수인 `swapTokensForTokens`는 거래자가 지불하고자 하는 정확한 입력 토큰 수와 그 대가로 받고자 하는 최소 출력 토큰 수를 지정할 수 있도록 합니다. 이 함수는 반대 교환을 수행하여 거래자가 원하는 출력 토큰 수와 그에 대해 지불할 의사가 있는 최대 입력 토큰 수를 지정할 수 있도록 합니다.

두 경우 모두, 거래자는 이 주변부 컨트랙트가 토큰을 전송할 수 있도록 먼저 허용량을 부여해야 합니다.

```solidity
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, msg.value, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
    }


    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }



    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }


    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= msg.value, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
        // 남은 eth가 있다면 환불
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

이 네 가지 변형은 모두 ETH와 토큰 간의 거래와 관련이 있습니다. 유일한 차이점은 거래자로부터 ETH를 받아 WETH를 발행하는 데 사용하거나, 경로의 마지막 교환에서 WETH를 받아 소각하고 그 결과로 나온 ETH를 거래자에게 다시 보내는 것입니다.

```solidity
    // **** 교환(전송 시 수수료 부과 토큰 지원) ****
    // 첫 번째 페어로 초기 금액이 이미 전송되었어야 합니다.
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

이것은 전송 또는 저장 공간 수수료가 있는 토큰을 교환하여 ([이 문제](https://github.com/Uniswap/uniswap-interface/issues/835))를 해결하기 위한 내부 함수입니다.

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // 스택이 너무 깊어지는 오류를 피하기 위한 범위
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

전송 수수료 때문에 각 전송에서 얼마를 얻는지 알기 위해 `getAmountsOut` 함수에 의존할 수 없습니다(원래 `_swap`을 호출하기 전과 같은 방식). 대신 먼저 전송한 다음 얼마나 많은 토큰을 돌려받았는지 확인해야 합니다.

참고: 이론적으로는 `_swap` 대신 이 함수를 사용할 수도 있지만, 특정 경우(예: 마지막에 요구되는 최소량을 충족하기에 충분하지 않아 전송이 되돌려지는 경우)에는 가스가 더 많이 소모될 수 있습니다. 전송 수수료 토큰은 매우 드물기 때문에 이를 수용할 필요는 있지만 모든 교환이 그중 하나 이상을 거친다고 가정할 필요는 없습니다.

```solidity
            }
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOutput) : (amountOutput, uint(0));
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
            pair.swap(amount0Out, amount1Out, to, new bytes(0));
        }
    }


    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) {
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        payable
        ensure(deadline)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        uint amountIn = msg.value;
        IWETH(WETH).deposit{value: amountIn}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn));
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        ensure(deadline)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        _swapSupportingFeeOnTransferTokens(path, address(this));
        uint amountOut = IERC20(WETH).balanceOf(address(this));
        require(amountOut >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).withdraw(amountOut);
        TransferHelper.safeTransferETH(to, amountOut);
    }
```

이것들은 일반 토큰에 사용되는 것과 동일한 변형이지만, 대신 `_swapSupportingFeeOnTransferTokens`를 호출합니다.

```solidity
    // **** 라이브러리 함수 ****
    function quote(uint amountA, uint reserveA, uint reserveB) public pure virtual override returns (uint amountB) {
        return UniswapV2Library.quote(amountA, reserveA, reserveB);
    }

    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountOut)
    {
        return UniswapV2Library.getAmountOut(amountIn, reserveIn, reserveOut);
    }

    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountIn)
    {
        return UniswapV2Library.getAmountIn(amountOut, reserveIn, reserveOut);
    }

    function getAmountsOut(uint amountIn, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsOut(factory, amountIn, path);
    }

    function getAmountsIn(uint amountOut, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsIn(factory, amountOut, path);
    }
}
```

이 함수들은 [UniswapV2Library 함수](#uniswapV2library)를 호출하는 프록시일 뿐입니다.

### UniswapV2Migrator.sol {#UniswapV2Migrator}

이 컨트랙트는 이전 v1에서 v2로 거래소를 마이그레이션하는 데 사용되었습니다. 이제 마이그레이션되었으므로 더 이상 관련이 없습니다.

## 라이브러리 {#libraries}

[SafeMath 라이브러리](https://docs.openzeppelin.com/contracts/2.x/api/math)는 문서화가 잘 되어 있으므로 여기서 문서화할 필요가 없습니다.

### Math {#Math}

이 라이브러리에는 일반적으로 솔리디티 코드에 필요하지 않은 일부 수학 함수가 포함되어 있어 언어의 일부가 아닙니다.

```solidity
pragma solidity =0.5.16;

// 다양한 수학 연산을 수행하기 위한 라이브러리

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // 바빌로니아 방식 (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

제곱근보다 큰 추정치로 x를 시작합니다(이것이 1-3을 특별한 경우로 처리해야 하는 이유입니다).

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

이전 추정치와 제곱근을 구하려는 수를 이전 추정치로 나눈 값의 평균인 더 가까운 추정치를 구합니다. 새로운 추정치가 기존 추정치보다 낮지 않을 때까지 반복합니다. 자세한 내용은 [여기](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)를 참조하세요.

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

0의 제곱근은 필요하지 않습니다. 1, 2, 3의 제곱근은 대략 1입니다(정수를 사용하므로 분수는 무시합니다).

```solidity
        }
    }
}
```

### 고정 소수점 분수 (UQ112x112) {#FixedPoint}

이 라이브러리는 일반적으로 이더리움 산술의 일부가 아닌 분수를 처리합니다. _x_라는 숫자를 _x\*2^112_로 인코딩하여 이 작업을 수행합니다. 이를 통해 원래의 덧셈 및 뺄셈 연산 부호를 변경 없이 사용할 수 있습니다.

```solidity
pragma solidity =0.5.16;

// 이진 고정 소수점 수를 처리하기 위한 라이브러리 (https://wikipedia.org/wiki/Q_(number_format))

// 범위: [0, 2**112 - 1]
// 분해능: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112`는 1에 대한 인코딩입니다.

```solidity
    // uint112를 UQ112x112로 인코딩합니다
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // 절대 오버플로우되지 않음
    }
```

y는 `uint112`이므로 최대값은 2^112-1입니다. 해당 숫자는 여전히 `UQ112x112`로 인코딩될 수 있습니다.

```solidity
    // UQ112x112를 uint112로 나누어 UQ112x112를 반환합니다
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

두 개의 `UQ112x112` 값을 나누면 결과는 더 이상 2^112로 곱해지지 않습니다. 따라서 대신 분모에 정수를 사용합니다. 곱셈을 하려면 비슷한 트릭을 사용해야 했겠지만, `UQ112x112` 값의 곱셈은 필요하지 않습니다.

### UniswapV2Library {#uniswapV2library}

이 라이브러리는 주변부 컨트랙트에서만 사용됩니다

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // 정렬된 토큰 주소를 반환하며, 이 순서로 정렬된 페어의 반환 값을 처리하는 데 사용됩니다
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

두 토큰을 주소별로 정렬하여 해당 페어 교환의 주소를 얻을 수 있습니다. 이는 그렇지 않으면 매개변수 A, B에 대한 하나와 매개변수 B, A에 대한 또 다른 하나, 즉 두 가지 가능성이 생겨 하나의 교환 대신 두 개의 교환이 발생하기 때문에 필요합니다.

```solidity
    // 외부 호출 없이 페어에 대한 CREATE2 주소를 계산합니다
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // init 코드 해시
            ))));
    }
```

이 함수는 두 토큰에 대한 페어 교환의 주소를 계산합니다. 이 컨트랙트는 [CREATE2 연산 부호](https://eips.ethereum.org/EIPS/eip-1014)를 사용하여 생성되므로, 사용하는 매개변수를 알면 동일한 알고리즘을 사용하여 주소를 계산할 수 있습니다. 이것은 팩토리에 묻는 것보다 훨씬 저렴하며,

```solidity
    // 페어의 예비 자금을 가져와 정렬합니다
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

이 함수는 페어 교환이 가지고 있는 두 토큰의 예비 자금을 반환합니다. 토큰을 어떤 순서로든 받을 수 있으며 내부 사용을 위해 정렬한다는 점에 유의하세요.

```solidity
    // 자산의 일부 양과 페어 예비 자금이 주어지면 다른 자산의 동등한 양을 반환합니다
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

이 함수는 수수료가 없는 경우 토큰 A에 대한 대가로 받을 토큰 B의 양을 알려줍니다. 이 계산은 전송으로 인해 환율이 변경된다는 점을 고려합니다.

```solidity
    // 자산의 입력량과 페어 예비 자금이 주어지면 다른 자산의 최대 출력량을 반환합니다
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

위의 `quote` 함수는 페어 교환을 사용하는 데 수수료가 없는 경우 잘 작동합니다. 그러나 0.3%의 교환 수수료가 있는 경우 실제로 받는 금액은 더 낮습니다. 이 함수는 교환 수수료를 제외한 금액을 계산합니다.

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

솔리디티는 분수를 기본적으로 처리하지 않으므로 출력 금액에 0.997을 곱할 수 없습니다. 대신 분자를 997로, 분모를 1000으로 곱하여 동일한 효과를 얻습니다.

```solidity
    // 자산의 출력량과 페어 예비 자금이 주어지면 다른 자산의 필수 입력량을 반환합니다
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

이 함수는 거의 동일한 작업을 수행하지만 출력 금액을 가져와 입력을 제공합니다.

```solidity

    // 임의의 수의 페어에 대해 연쇄적인 getAmountOut 계산을 수행합니다
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // 임의의 수의 페어에 대해 연쇄적인 getAmountIn 계산을 수행합니다
    function getAmountsIn(address factory, uint amountOut, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[amounts.length - 1] = amountOut;
        for (uint i = path.length - 1; i > 0; i--) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i - 1], path[i]);
            amounts[i - 1] = getAmountIn(amounts[i], reserveIn, reserveOut);
        }
    }
}
```

이 두 함수는 여러 페어 교환을 거쳐야 할 때 값을 식별하는 작업을 처리합니다.

### 전송 도우미 {#transfer-helper}

[이 라이브러리](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol)는 ERC-20 및 이더리움 전송 주변에 성공 확인을 추가하여 되돌리기와 `false` 값 반환을 동일하게 처리합니다.

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// 일관되게 true/false를 반환하지 않는 ERC20 토큰과 상호 작용하고 ETH를 보내기 위한 도우미 메서드
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

두 가지 방법 중 하나로 다른 컨트랙트를 호출할 수 있습니다.

- 인터페이스 정의를 사용하여 함수 호출 생성
- [애플리케이션 바이너리 인터페이스(ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html)를 "수동으로" 사용하여 호출을 생성합니다. 이것이 코드 작성자가 결정한 방식입니다.

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

ERC-20 표준 이전에 생성된 토큰과의 하위 호환성을 위해, ERC-20 호출은 되돌리기(이 경우 `success`는 `false`) 또는 성공하고 `false` 값을 반환(이 경우 출력 데이터가 있으며, 이를 부울로 디코딩하면 `false`를 얻음)함으로써 실패할 수 있습니다.

```solidity


    function safeTransfer(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transfer(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeTransfer: transfer failed'
        );
    }
```

이 함수는 [ERC-20의 전송 기능](https://eips.ethereum.org/EIPS/eip-20#transfer)을 구현하며, 이는 계정이 다른 계정에서 제공한 허용량을 사용할 수 있도록 합니다.

```solidity

    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::transferFrom: transferFrom failed'
        );
    }
```

이 함수는 [ERC-20의 transferFrom 기능](https://eips.ethereum.org/EIPS/eip-20#transferfrom)을 구현하며, 이는 계정이 다른 계정에서 제공한 허용량을 사용할 수 있도록 합니다.

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

이 함수는 이더를 계정으로 전송합니다. 다른 컨트랙트에 대한 모든 호출은 이더를 보내려고 시도할 수 있습니다. 실제로 함수를 호출할 필요가 없기 때문에 호출과 함께 데이터를 보내지 않습니다.

## 결론 {#conclusion}

이것은 약 50페이지에 달하는 긴 기사입니다. 여기까지 오셨다면 축하합니다! 이제 여러분은 실제 애플리케이션(짧은 예제 프로그램과 달리)을 작성할 때 고려해야 할 사항을 이해하고 자신의 사용 사례에 맞는 컨트랙트를 더 잘 작성할 수 있게 되었기를 바랍니다.

이제 가서 유용한 것을 만들고 우리를 놀라게 해 주세요.

[여기서 제 작업에 대한 자세한 내용을 확인하세요](https://cryptodocguy.pro/).
