---
title: "Optimism 표준 브리지 컨트랙트 둘러보기"
description: "Optimism의 표준 브리지는 어떻게 작동하나요? 왜 이런 방식으로 작동하나요?"
author: Ori Pomerantz
tags: [ "솔리디티", "브리지", "레이어 2" ]
skill: intermediate
published: 2022-03-30
lang: ko
---

[Optimism](https://www.optimism.io/)은 [/developers/docs/scaling/optimistic-rollups/](낙관적 롤업)입니다.
낙관적 롤업은 네트워크의 모든 노드가 아닌 소수의 노드에서만 트랜잭션을 처리하기 때문에 이더리움 메인넷(레이어 1 또는 L1이라고도 함)보다 훨씬 저렴한 가격으로 트랜잭션을 처리할 수 있습니다.
동시에 모든 데이터가 L1에 기록되므로 메인넷의 모든 무결성 및 가용성 보장을 통해 모든 것을 증명하고 재구성할 수 있습니다.

Optimism(또는 다른 L2)에서 L1 자산을 사용하려면 자산을 [/bridges/#prerequisites](브리지)해야 합니다.
이를 달성하는 한 가지 방법은 사용자가 L1에 자산(ETH 및 [/developers/docs/standards/tokens/erc-20/](ERC-20 토큰)이 가장 일반적임)을 락업하고 L2에서 사용할 수 있는 동등한 자산을 받는 것입니다.
결국, 자산을 소유하게 된 사람은 누구든 L1으로 다시 브리지하기를 원할 수 있습니다.
이때 자산은 L2에서 소각된 다음 L1에서 사용자에게 다시 릴리스됩니다.

이것이 [Optimism 표준 브리지](https://docs.optimism.io/app-developers/bridging/standard-bridge)가 작동하는 방식입니다.
이 글에서는 해당 브리지의 소스 코드를 살펴보고 잘 작성된 Solidity 코드의 예시로써 작동 방식을 연구합니다.

## 제어 흐름 {#control-flows}

브리지에는 두 가지 주요 흐름이 있습니다.

- 예치(L1에서 L2로)
- 인출(L2에서 L1로)

### 예치 흐름 {#deposit-flow}

#### 레이어 1 {#deposit-flow-layer-1}

1. ERC-20을 예치하는 경우, 예치자는 예치되는 금액을 사용할 수 있는 허용량을 브리지에 부여합니다
2. 예치자는 L1 브리지(`depositERC20`, `depositERC20To`, `depositETH` 또는 `depositETHTo`)를 호출합니다
3. L1 브리지는 브리지된 자산의 소유권을 가져옵니다
   - ETH: 자산은 호출의 일부로 예치자에 의해 전송됩니다
   - ERC-20: 자산은 예치자가 제공한 허용량을 사용하여 브리지에 의해 자체적으로 전송됩니다
4. L1 브리지는 교차 도메인 메시지 메커니즘을 사용하여 L2 브리지에서 `finalizeDeposit`을 호출합니다

#### 레이어 2 {#deposit-flow-layer-2}

5. L2 브리지는 `finalizeDeposit` 호출이 합법적인지 확인합니다.
   - 교차 도메인 메시지 컨트랙트에서 왔습니다
   - 원래 L1의 브리지에서 왔습니다
6. L2 브리지는 L2의 ERC-20 토큰 컨트랙트가 올바른 것인지 확인합니다.
   - L2 컨트랙트는 L1 대응 컨트랙트가 L1에서 토큰이 온 곳과 동일하다고 보고합니다
   - L2 컨트랙트는 올바른 인터페이스를 지원한다고 보고합니다([ERC-165 사용](https://eips.ethereum.org/EIPS/eip-165)).
7. L2 컨트랙트가 올바른 경우, 이를 호출하여 적절한 수의 토큰을 적절한 주소로 민팅합니다. 그렇지 않은 경우, 사용자가 L1에서 토큰을 청구할 수 있도록 인출 절차를 시작합니다.

### 인출 흐름 {#withdrawal-flow}

#### 레이어 2 {#withdrawal-flow-layer-2}

1. 인출자는 L2 브리지(`withdraw` 또는 `withdrawTo`)를 호출합니다
2. L2 브리지는 `msg.sender`에 속하는 적절한 수의 토큰을 소각합니다
3. L2 브리지는 교차 도메인 메시지 메커니즘을 사용하여 L1 브리지에서 `finalizeETHWithdrawal` 또는 `finalizeERC20Withdrawal`을 호출합니다

#### 레이어 1 {#withdrawal-flow-layer-1}

4. L1 브리지는 `finalizeETHWithdrawal` 또는 `finalizeERC20Withdrawal` 호출이 합법적인지 확인합니다.
   - 교차 도메인 메시지 메커니즘에서 왔습니다
   - 원래 L2의 브리지에서 왔습니다
5. L1 브리지는 적절한 자산(ETH 또는 ERC-20)을 적절한 주소로 전송합니다

## 레이어 1 코드 {#layer-1-code}

이것은 L1, 즉 이더리움 메인넷에서 실행되는 코드입니다.

### IL1ERC20Bridge {#IL1ERC20Bridge}

[이 인터페이스는 여기에서 정의됩니다](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
여기에는 ERC-20 토큰을 브리지하는 데 필요한 함수와 정의가 포함되어 있습니다.

```solidity
// SPDX-License-Identifier: MIT
```

[대부분의 Optimism 코드는 MIT 라이선스에 따라 릴리스됩니다](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

작성 시점의 최신 Solidity 버전은 0.8.12입니다.
버전 0.9.0이 릴리스될 때까지 이 코드가 해당 버전과 호환되는지 여부는 알 수 없습니다.

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * 이벤트 *
     **********/

    event ERC20DepositInitiated(
```

Optimism 브리지 용어에서 _예치(deposit)_는 L1에서 L2로의 전송을 의미하고, _인출(withdrawal)_은 L2에서 L1로의 전송을 의미합니다.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

대부분의 경우 L1의 ERC-20 주소는 L2의 동등한 ERC-20 주소와 다릅니다.
[여기에서 토큰 주소 목록을 볼 수 있습니다](https://static.optimism.io/optimism.tokenlist.json).
`chainId` 1인 주소는 L1(메인넷)에 있고, `chainId` 10인 주소는 L2(Optimism)에 있습니다.
다른 두 `chainId` 값은 Kovan 테스트 네트워크(42)와 Optimistic Kovan 테스트 네트워크(69)에 대한 것입니다.

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

전송에 메모를 추가할 수 있으며, 이 경우 이를 보고하는 이벤트에 추가됩니다.

```solidity
    event ERC20WithdrawalFinalized(
        address indexed _l1Token,
        address indexed _l2Token,
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

동일한 브리지 컨트랙트가 양방향 전송을 처리합니다.
L1 브리지의 경우, 이는 예치의 시작과 인출의 완료를 의미합니다.

```solidity

    /********************
     * 공개 함수 *
     ********************/

    /**
     * @dev 해당하는 L2 브리지 컨트랙트의 주소를 가져옵니다.
     * @return 해당하는 L2 브리지 컨트랙트의 주소입니다.
     */
    function l2TokenBridge() external returns (address);
```

이 함수는 실제로 필요하지 않습니다. L2에서는 사전 배포된 컨트랙트이므로 항상 주소 `0x4200000000000000000000000000000000000010`에 있기 때문입니다.
L1 브리지의 주소는 알기 _쉽지 않기 때문에_ L2 브리지와의 대칭성을 위해 여기에 있습니다.

```solidity
    /**
     * @dev ERC20의 일정 금액을 L2의 호출자 잔액으로 예치합니다.
     * @param _l1Token 우리가 예치하는 L1 ERC20의 주소
     * @param _l2Token 해당 L2 ERC20의 주소
     * @param _amount 예치할 ERC20의 금액
     * @param _l2Gas L2에서 예치를 완료하는 데 필요한 가스 한도
     * @param _data L2로 전달할 선택적 데이터. 이 데이터는
     *        외부 컨트랙트의 편의를 위해서만 제공됩니다. 최대
     *        길이를 강제하는 것 외에, 이 컨트랙트는 내용에 대한 어떠한 보증도 제공하지 않습니다.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

`_l2Gas` 매개변수는 트랜잭션이 사용할 수 있는 L2 가스의 양입니다.
[특정(높은) 한도까지는 무료이므로](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), ERC-20 컨트랙트가 민팅 시 정말 이상한 작업을 하지 않는 한 문제가 되지 않습니다.
이 함수는 사용자가 다른 블록체인의 동일한 주소로 자산을 브리지하는 일반적인 시나리오를 처리합니다.

```solidity
    /**
     * @dev ERC20의 일정 금액을 L2의 수신자 잔액으로 예치합니다.
     * @param _l1Token 우리가 예치하는 L1 ERC20의 주소
     * @param _l2Token 해당 L2 ERC20의 주소
     * @param _to 인출을 입금할 L2 주소.
     * @param _amount 예치할 ERC20의 금액.
     * @param _l2Gas L2에서 예치를 완료하는 데 필요한 가스 한도.
     * @param _data L2로 전달할 선택적 데이터. 이 데이터는
     *        외부 컨트랙트의 편의를 위해서만 제공됩니다. 최대
     *        길이를 강제하는 것 외에, 이 컨트랙트는 내용에 대한 어떠한 보증도 제공하지 않습니다.
     */
    function depositERC20To(
        address _l1Token,
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

이 함수는 `depositERC20`과 거의 동일하지만 ERC-20을 다른 주소로 보낼 수 있습니다.

```solidity
    /*************************
     * 교차 체인 함수 *
     *************************/

    /**
     * @dev L2에서 L1으로의 인출을 완료하고, 수신자의
     * L1 ERC20 토큰 잔액에 자금을 입금합니다.
     * 이 호출은 L2에서 시작된 인출이 완료되지 않은 경우 실패합니다.
     *
     * @param _l1Token finalizeWithdrawal을 수행할 L1 토큰의 주소.
     * @param _l2Token 인출이 시작된 L2 토큰의 주소.
     * @param _from 전송을 시작하는 L2 주소.
     * @param _to 인출을 입금할 L1 주소.
     * @param _amount 예치할 ERC20의 금액.
     * @param _data L2의 발신자가 제공한 데이터. 이 데이터는
     *   외부 컨트랙트의 편의를 위해서만 제공됩니다. 최대
     *   길이를 강제하는 것 외에, 이 컨트랙트는 내용에 대한 어떠한 보증도 제공하지 않습니다.
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

Optimism에서 인출(및 L2에서 L1으로의 다른 메시지)은 두 단계 과정입니다.

1. L2에서의 시작 트랜잭션.
2. L1에서의 완료 또는 청구 트랜잭션.
   이 트랜잭션은 L2 트랜잭션에 대한 [결함 챌린지 기간](https://community.optimism.io/docs/how-optimism-works/#fault-proofs)이 끝난 후에 발생해야 합니다.

### IL1StandardBridge {#il1standardbridge}

[이 인터페이스는 여기에서 정의됩니다](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
이 파일에는 ETH에 대한 이벤트 및 함수 정의가 포함되어 있습니다.
이러한 정의는 위에서 ERC-20에 대해 정의된 `IL1ERC20Bridge`의 정의와 매우 유사합니다.

일부 ERC-20 토큰은 사용자 지정 처리가 필요하며 표준 브리지에서 처리할 수 없기 때문에 브리지 인터페이스는 두 개의 파일로 나뉩니다.
이러한 방식으로 해당 토큰을 처리하는 사용자 지정 브리지는 `IL1ERC20Bridge`를 구현하고 ETH도 브리지할 필요가 없습니다.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * 이벤트 *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

이 이벤트는 L1 및 L2 토큰 주소가 없다는 점을 제외하고 ERC-20 버전(`ERC20DepositInitiated`)과 거의 동일합니다.
다른 이벤트와 함수도 마찬가지입니다.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * 공개 함수 *
     ********************/

    /**
     * @dev ETH의 일정 금액을 L2의 호출자 잔액으로 예치합니다.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev ETH의 일정 금액을 L2의 수신자 잔액으로 예치합니다.
            .
            .
            .
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;

    /*************************
     * 교차 체인 함수 *
     *************************/

    /**
     * @dev L2에서 L1으로의 인출을 완료하고, 수신자의
     * L1 ETH 토큰 잔액에 자금을 입금합니다. xDomainMessenger만이 이 함수를 호출할 수 있으므로
     * 인출이 완료되기 전에는 절대 호출되지 않습니다.
                .
                .
                .
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

### CrossDomainEnabled {#crossdomainenabled}

[이 컨트랙트](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol)는 두 브리지([L1](#the-l1-bridge-contract) 및 [L2](#the-l2-bridge-contract))에 의해 상속되어 다른 레이어로 메시지를 보냅니다.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* 인터페이스 임포트 */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[이 인터페이스](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol)는 컨트랙트에게 교차 도메인 메신저를 사용하여 다른 레이어로 메시지를 보내는 방법을 알려줍니다.
이 교차 도메인 메신저는 완전히 다른 시스템이며, 별도의 글에서 다룰 가치가 있습니다. 나중에 작성할 수 있기를 바랍니다.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev 교차 도메인 통신을 수행하는 컨트랙트를 위한 헬퍼 컨트랙트
 *
 * 사용된 컴파일러: 상속하는 컨트랙트에 의해 정의됨
 */
contract CrossDomainEnabled {
    /*************
     * 변수 *
     *************/

    // 다른 도메인으로부터 메시지를 보내고 받는 데 사용되는 메신저 컨트랙트.
    address public messenger;

    /***************
     * 생성자 *
     ***************/

    /**
     * @param _messenger 현재 레이어의 CrossDomainMessenger 주소.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

컨트랙트가 알아야 할 한 가지 매개변수는 이 레이어의 교차 도메인 메신저 주소입니다.
이 매개변수는 생성자에서 한 번 설정되고 절대 변경되지 않습니다.

```solidity

    /**********************
     * 함수 수정자 *
     **********************/

    /**
     * 수정된 함수가 특정 교차 도메인 계정에서만 호출될 수 있도록 강제합니다.
     * @param _sourceDomainAccount 이 함수를 호출할 수 있도록
     *  인증된 유일한 원래 도메인 계정입니다.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

교차 도메인 메시징은 실행 중인 블록체인(이더리움 메인넷 또는 Optimism)의 모든 컨트랙트에서 접근할 수 있습니다.
하지만 각 측의 브리지는 다른 쪽 브리지에서 온 경우에만 특정 메시지를 _신뢰해야_ 합니다.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: 메신저 컨트랙트가 인증되지 않았습니다"
        );
```

적절한 교차 도메인 메신저(`messenger`, 아래에서 볼 수 있음)에서 온 메시지만 신뢰할 수 있습니다.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: 교차 도메인 메시지의 발신자가 잘못되었습니다"
        );
```

교차 도메인 메신저가 다른 레이어에서 메시지를 보낸 주소를 제공하는 방법은 [`.xDomainMessageSender()` 함수](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128)입니다.
메시지에 의해 시작된 트랜잭션에서 호출되는 한 이 정보를 제공할 수 있습니다.

우리가 받은 메시지가 다른 브리지에서 왔는지 확인해야 합니다.

```solidity

        _;
    }

    /**********************
     * 내부 함수 *
     **********************/

    /**
     * 일반적으로 스토리지에서 메신저를 가져옵니다. 이 함수는 자식 컨트랙트가
     * 재정의해야 할 경우를 대비하여 노출됩니다.
     * @return 사용해야 할 교차 도메인 메신저 컨트랙트의 주소입니다.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

이 함수는 교차 도메인 메신저를 반환합니다.
이 함수에서 상속하는 컨트랙트가 사용할 교차 도메인 메신저를 지정하는 알고리즘을 사용할 수 있도록 변수 `messenger` 대신 함수를 사용합니다.

```solidity

    /**
     * 다른 도메인의 계정으로 메시지를 보냅니다
     * @param _crossDomainTarget 대상 도메인의 의도된 수신자
     * @param _message 대상에게 보낼 데이터(일반적으로
     *  `onlyFromCrossDomainAccount()`가 있는 함수에 대한 콜데이터)
     * @param _gasLimit 대상 도메인에서 메시지를 수신하기 위한 gasLimit입니다.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

마지막으로 다른 레이어에 메시지를 보내는 함수입니다.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither)는 취약점 및 기타 잠재적인 문제를 찾기 위해 모든 컨트랙트에서 실행하는 정적 분석기입니다.
이 경우 다음 줄은 두 가지 취약점을 유발합니다.

1. [재진입 이벤트](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [양성 재진입](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

이 경우 Slither가 알 방법이 없더라도 `getCrossDomainMessenger()`가 신뢰할 수 있는 주소를 반환한다는 것을 알고 있으므로 재진입에 대해 걱정하지 않습니다.

### L1 브리지 컨트랙트 {#the-l1-bridge-contract}

[이 컨트랙트의 소스 코드는 여기에 있습니다](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

인터페이스는 다른 컨트랙트의 일부가 될 수 있으므로 광범위한 Solidity 버전을 지원해야 합니다.
그러나 브리지 자체는 우리의 컨트랙트이며, 사용하는 Solidity 버전에 대해 엄격할 수 있습니다.

```solidity
/* 인터페이스 임포트 */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) 및 [IL1StandardBridge](#IL1StandardBridge)는 위에서 설명했습니다.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[이 인터페이스](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol)를 사용하면 L2의 표준 브리지를 제어하는 메시지를 생성할 수 있습니다.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[이 인터페이스](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)를 사용하면 ERC-20 컨트랙트를 제어할 수 있습니다.
[여기에서 자세한 내용을 읽을 수 있습니다](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* 라이브러리 임포트 */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[위에서 설명했듯이](#crossdomainenabled) 이 컨트랙트는 레이어 간 메시징에 사용됩니다.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol)에는 항상 동일한 주소를 갖는 L2 컨트랙트의 주소가 있습니다. 여기에는 L2의 표준 브리지가 포함됩니다.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[OpenZeppelin의 주소 유틸리티](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). 컨트랙트 주소와 외부 소유 계정(EOA)에 속한 주소를 구별하는 데 사용됩니다.

이는 완벽한 해결책이 아니라는 점에 유의해야 합니다. 직접 호출과 컨트랙트의 생성자에서 이루어진 호출을 구별할 방법이 없기 때문입니다. 하지만 적어도 이를 통해 일반적인 사용자 오류를 식별하고 방지할 수 있습니다.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[ERC-20 표준](https://eips.ethereum.org/EIPS/eip-20)은 컨트랙트가 실패를 보고하는 두 가지 방법을 지원합니다.

1. 되돌리기
2. `false` 반환

두 경우 모두를 처리하면 코드가 더 복잡해지므로 대신 [모든 실패가 되돌리기로 이어지도록](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96) 보장하는 [OpenZeppelin의 `SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol)을 사용합니다.

```solidity
/**
 * @title L1StandardBridge
 * @dev L1 ETH 및 ERC20 브리지는 L2에서 사용 중인 예치된 L1 자금과 표준
 * 토큰을 저장하는 컨트랙트입니다. 해당하는 L2 브리지를 동기화하여 예치 정보를 알리고
 * 새로 완료된 인출을 수신합니다.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

이 줄은 `IERC20` 인터페이스를 사용할 때마다 `SafeERC20` 래퍼를 사용하도록 지정하는 방법입니다.

```solidity

    /********************************
     * 외부 컨트랙트 참조 *
     ********************************/

    address public l2TokenBridge;
```

[L2StandardBridge](#the-l2-bridge-contract)의 주소.

```solidity

    // L1 토큰을 L2 토큰에 매핑하여 예치된 L1 토큰의 잔액을 관리
    mapping(address => mapping(address => uint256)) public deposits;
```

이와 같은 이중 [매핑](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)은 [2차원 희소 배열](https://en.wikipedia.org/wiki/Sparse_matrix)을 정의하는 방법입니다.
이 데이터 구조의 값은 `deposit[L1 토큰 주소][L2 토큰 주소]`로 식별됩니다.
기본값은 0입니다.
다른 값으로 설정된 셀만 스토리지에 기록됩니다.

```solidity

    /***************
     * 생성자 *
     ***************/

    // 이 컨트랙트는 프록시 뒤에 존재하므로 생성자 매개변수는 사용되지 않습니다.
    constructor() CrossDomainEnabled(address(0)) {}
```

스토리지의 모든 변수를 복사하지 않고도 이 컨트랙트를 업그레이드할 수 있기를 원합니다.
이를 위해 [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy)를 사용합니다. 프록시는 [`delegatecall`](https://solidity-by-example.org/delegatecall/)을 사용하여 프록시 컨트랙트가 저장한 주소의 별도 컨트랙트로 호출을 전송합니다(업그레이드할 때 프록시에 해당 주소를 변경하도록 지시합니다).
`delegatecall`을 사용하면 스토리지는 _호출_ 컨트랙트의 스토리지로 유지되므로 모든 컨트랙트 상태 변수의 값은 영향을 받지 않습니다.

이 패턴의 한 가지 효과는 `delegatecall`의 _호출된_ 컨트랙트의 스토리지가 사용되지 않으므로 여기에 전달된 생성자 값은 중요하지 않다는 것입니다.
이것이 `CrossDomainEnabled` 생성자에 무의미한 값을 제공할 수 있는 이유입니다.
또한 아래 초기화가 생성자와 분리된 이유이기도 합니다.

```solidity
    /******************
     * 초기화 *
     ******************/

    /**
     * @param _l1messenger 교차 체인 통신에 사용되는 L1 메신저 주소.
     * @param _l2TokenBridge L2 표준 브리지 주소.
     */
    // slither-disable-next-line external-function
```

이 [Slither 테스트](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external)는 컨트랙트 코드에서 호출되지 않아 `public` 대신 `external`로 선언될 수 있는 함수를 식별합니다.
`external` 함수의 가스 비용은 콜데이터에 매개변수를 제공할 수 있으므로 더 낮을 수 있습니다.
`public`으로 선언된 함수는 컨트랙트 내에서 접근할 수 있어야 합니다.
컨트랙트는 자신의 콜데이터를 수정할 수 없으므로 매개변수는 메모리에 있어야 합니다.
이러한 함수가 외부에서 호출될 때, 콜데이터를 메모리로 복사해야 하므로 가스가 소모됩니다.
이 경우 함수는 한 번만 호출되므로 비효율성은 우리에게 중요하지 않습니다.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "컨트랙트가 이미 초기화되었습니다.");
```

`initialize` 함수는 한 번만 호출되어야 합니다.
L1 교차 도메인 메신저 또는 L2 토큰 브리지의 주소가 변경되면, 이를 호출하는 새로운 프록시와 새로운 브리지를 생성합니다.
이는 전체 시스템이 업그레이드될 때를 제외하고는 매우 드물게 발생합니다.

이 함수에는 _누가_ 호출할 수 있는지 제한하는 메커니즘이 없다는 점에 유의해야 합니다.
이론적으로 공격자는 우리가 프록시와 브리지의 첫 번째 버전을 배포할 때까지 기다렸다가 합법적인 사용자가 `initialize` 함수에 접근하기 전에 [선행매매](https://solidity-by-example.org/hacks/front-running/)를 할 수 있습니다. 그러나 이를 방지하는 두 가지 방법이 있습니다.

1. 컨트랙트가 EOA에 의해 직접 배포되지 않고 [다른 컨트랙트가 이를 생성하는 트랜잭션에서](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595) 배포되는 경우, 전체 프로세스는 원자적일 수 있으며 다른 트랜잭션이 실행되기 전에 완료될 수 있습니다.
2. 합법적인 `initialize` 호출이 실패하면 새로 생성된 프록시와 브리지를 무시하고 새로운 것을 생성할 수 있습니다.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

이 두 가지는 브리지가 알아야 할 매개변수입니다.

```solidity

    /**************
     * 예치 *
     **************/

    /** @dev 발신자가 EOA여야 하는 수정자입니다. 이 검사는 악의적인
     *  컨트랙트가 initcode를 통해 우회할 수 있지만, 우리가 피하고자 하는 사용자 오류를 처리합니다.
     */
    modifier onlyEOA() {
        // 컨트랙트로부터의 예치를 중지하는 데 사용됩니다(실수로 토큰을 잃는 것을 방지)
        require(!Address.isContract(msg.sender), "계정이 EOA가 아님");
        _;
    }
```

이것이 OpenZeppelin의 `Address` 유틸리티가 필요했던 이유입니다.

```solidity
    /**
     * @dev 이 함수는 데이터 없이 호출될 수 있습니다
     * ETH의 일정 금액을 L2의 호출자 잔액으로 예치합니다.
     * receive 함수는 데이터를 받지 않으므로, 보수적인
     * 기본 금액이 L2로 전달됩니다.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

이 함수는 테스트 목적으로 존재합니다.
인터페이스 정의에 나타나지 않는다는 점에 유의하세요. 일반적인 사용을 위한 것이 아닙니다.

```solidity
    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable {
        _initiateETHDeposit(msg.sender, _to, _l2Gas, _data);
    }
```

이 두 함수는 실제 ETH 예치를 처리하는 함수인 `_initiateETHDeposit`의 래퍼입니다.

```solidity
    /**
     * @dev ETH를 저장하고 L2 ETH 게이트웨이에
     * 예치를 알리는 예치 로직을 수행합니다.
     * @param _from L1에서 예치를 가져올 계정.
     * @param _to L2에서 예치를 줄 계정.
     * @param _l2Gas L2에서 예치를 완료하는 데 필요한 가스 한도.
     * @param _data L2로 전달할 선택적 데이터. 이 데이터는
     *        외부 컨트랙트의 편의를 위해서만 제공됩니다. 최대
     *        길이를 강제하는 것 외에, 이 컨트랙트는 내용에 대한 어떠한 보증도 제공하지 않습니다.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // finalizeDeposit 호출을 위한 콜데이터 구성
        bytes memory message = abi.encodeWithSelector(
```

교차 도메인 메시지가 작동하는 방식은 대상 컨트랙트가 메시지를 콜데이터로 사용하여 호출되는 것입니다.
Solidity 컨트랙트는 항상 [ABI 사양](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html)에 따라 콜데이터를 해석합니다.
Solidity 함수 [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions)는 해당 콜데이터를 생성합니다.

```solidity
            IL2ERC20Bridge.finalizeDeposit.selector,
            address(0),
            Lib_PredeployAddresses.OVM_ETH,
            _from,
            _to,
            msg.value,
            _data
        );
```

여기서 메시지는 다음 매개변수와 함께 [`finalizeDeposit` 함수](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148)를 호출하는 것입니다.

| 매개 변수                           | 값                                                                                        | 의미                                                                                                                            |
| ------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                                                            | L1에서 ETH(ERC-20 토큰이 아님)를 나타내는 특수 값                                                                         |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Optimism에서 ETH를 관리하는 L2 컨트랙트, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (이 컨트랙트는 Optimism 내부용으로만 사용됩니다) |
| \_from    | \_from                                                             | ETH를 보내는 L1의 주소                                                                                                               |
| \_to      | \_to                                                               | ETH를 받는 L2의 주소                                                                                                                |
| 금액                              | msg.value                                                                | 전송된 wei의 양(이미 브리지로 전송됨)                                                                                    |
| \_data    | \_data                                                             | 예치에 첨부할 추가 데이터                                                                                                                |

```solidity
        // L2로 콜데이터 전송
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

교차 도메인 메신저를 통해 메시지를 보냅니다.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

이 전송을 수신하는 탈중앙화 애플리케이션에 알리기 위해 이벤트를 발생시킵니다.

```solidity
    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20(
		.
		.
		.
    ) external virtual onlyEOA {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, msg.sender, _amount, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20To(
		.
		.
		.
    ) external virtual {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, _to, _amount, _l2Gas, _data);
    }
```

이 두 함수는 실제 ERC-20 예치를 처리하는 함수인 `_initiateERC20Deposit`의 래퍼입니다.

```solidity
    /**
     * @dev L2 예치 토큰
     * 컨트랙트에 예치를 알리고 L1 자금을 락업하는 핸들러를 호출하여 예치 로직을 수행합니다. (예: transferFrom)
     *
     * @param _l1Token 우리가 예치하는 L1 ERC20의 주소
     * @param _l2Token 해당 L2 ERC20의 주소
     * @param _from L1에서 예치를 가져올 계정
     * @param _to L2에서 예치를 줄 계정
     * @param _amount 예치할 ERC20의 금액.
     * @param _l2Gas L2에서 예치를 완료하는 데 필요한 가스 한도.
     * @param _data L2로 전달할 선택적 데이터. 이 데이터는
     *        외부 컨트랙트의 편의를 위해서만 제공됩니다. 최대
     *        길이를 강제하는 것 외에, 이 컨트랙트는 내용에 대한 어떠한 보증도 제공하지 않습니다.
     */
    function _initiateERC20Deposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) internal {
```

이 함수는 위의 `_initiateETHDeposit`과 유사하지만 몇 가지 중요한 차이점이 있습니다.
첫 번째 차이점은 이 함수가 토큰 주소와 전송할 금액을 매개변수로 받는다는 것입니다.
ETH의 경우 브리지 호출에는 이미 브리지 계정으로의 자산 전송(`msg.value`)이 포함됩니다.

```solidity
        // L1에서 예치가 시작되면, L1 브리지는 미래의
        // 인출을 위해 자금을 자체적으로 전송합니다. safeTransferFrom은 또한 컨트랙트에 코드가 있는지 확인하므로
        // _from이 EOA 또는 address(0)인 경우 실패합니다.
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20 토큰 전송은 ETH와 다른 프로세스를 따릅니다.

1. 사용자(`_from`)는 적절한 토큰을 전송할 수 있도록 브리지에 허용량을 부여합니다.
2. 사용자는 토큰 컨트랙트의 주소, 금액 등을 사용하여 브리지를 호출합니다.
3. 브리지는 예치 과정의 일부로 토큰을 (자체적으로) 전송합니다.

첫 번째 단계는 마지막 두 단계와 별도의 트랜잭션에서 발생할 수 있습니다.
그러나 `_initiateERC20Deposit`을 호출하는 두 함수(`depositERC20` 및 `depositERC20To`)는 `msg.sender`를 `_from` 매개변수로만 이 함수를 호출하기 때문에 선행매매는 문제가 되지 않습니다.

```solidity
        // _l2Token.finalizeDeposit(_to, _amount)에 대한 콜데이터 구성
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // L2로 콜데이터 전송
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

예치된 토큰의 양을 `deposits` 데이터 구조에 추가합니다.
동일한 L1 ERC-20 토큰에 해당하는 여러 L2 주소가 있을 수 있으므로 브리지의 L1 ERC-20 토큰 잔액만으로는 예치를 추적하기에 충분하지 않습니다.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * 교차 체인 함수 *
     *************************/

    /**
     * @inheritdoc IL1StandardBridge
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

L2 브리지는 L2 교차 도메인 메신저에 메시지를 보내 L1 교차 도메인 메신저가 이 함수를 호출하도록 합니다(물론 [메시지를 완료하는 트랜잭션](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions)이 L1에 제출된 후에).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

이것이 교차 도메인 메신저에서 오고 L2 토큰 브리지에서 시작된 _합법적인_ 메시지인지 확인하십시오.
이 함수는 브리지에서 ETH를 인출하는 데 사용되므로 승인된 호출자에 의해서만 호출되는지 확인해야 합니다.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

ETH를 전송하는 방법은 `msg.value`에 wei 단위의 금액을 담아 수신자를 호출하는 것입니다.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH 전송 실패");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

인출에 대한 이벤트를 발생시킵니다.

```solidity
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

이 함수는 위의 `finalizeETHWithdrawal`과 유사하며 ERC-20 토큰에 필요한 변경 사항이 있습니다.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

`deposits` 데이터 구조를 업데이트합니다.

```solidity

        // L1에서 인출이 완료되면 L1 브리지는 자금을 인출자에게 전송합니다
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * 임시 - ETH 마이그레이션 *
     *****************************/

    /**
     * @dev 계정에 ETH 잔액을 추가합니다. 이는 ETH가
     * 이전 게이트웨이에서 새 게이트웨이로 마이그레이션될 수 있도록 하기 위한 것입니다.
     * 참고: 이전 컨트랙트에서 마이그레이션된 ETH를 받을 수 있도록
     * 한 번의 업그레이드에만 남겨둡니다
     */
    function donateETH() external payable {}
}
```

브리지의 이전 구현이 있었습니다.
구현에서 이 구현으로 옮길 때 모든 자산을 옮겨야 했습니다.
ERC-20 토큰은 그냥 옮길 수 있습니다.
하지만 컨트랙트로 ETH를 전송하려면 해당 컨트랙트의 승인이 필요한데, 이것이 바로 `donateETH`가 제공하는 기능입니다.

## L2의 ERC-20 토큰 {#erc-20-tokens-on-l2}

ERC-20 토큰이 표준 브리지에 맞으려면 표준 브리지, 그리고 _오직_ 표준 브리지만 토큰을 민팅할 수 있도록 허용해야 합니다.
이는 브리지가 Optimism에서 유통되는 토큰의 수가 L1 브리지 컨트랙트 내에 락업된 토큰의 수와 같도록 보장해야 하기 때문에 필요합니다.
L2에 토큰이 너무 많으면 일부 사용자는 자산을 L1으로 다시 브리지할 수 없게 됩니다.
신뢰할 수 있는 브리지 대신, 우리는 본질적으로 [부분 지급 준비금 제도](https://www.investopedia.com/terms/f/fractionalreservebanking.asp)를 재현하게 될 것입니다.
L1에 토큰이 너무 많으면 L2 토큰을 소각하지 않고는 릴리스할 방법이 없기 때문에 일부 토큰은 브리지 컨트랙트 내에 영원히 락업됩니다.

### IL2StandardERC20 {#il2standarderc20}

표준 브리지를 사용하는 L2의 모든 ERC-20 토큰은 표준 브리지에 필요한 함수와 이벤트가 있는 [이 인터페이스](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol)를 제공해야 합니다.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[표준 ERC-20 인터페이스](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)에는 `mint` 및 `burn` 함수가 포함되어 있지 않습니다.
이러한 메서드는 [ERC-20 표준](https://eips.ethereum.org/EIPS/eip-20)에서 요구하지 않으며, 토큰을 생성하고 파괴하는 메커니즘을 명시하지 않습니다.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[ERC-165 인터페이스](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol)는 컨트랙트가 제공하는 함수를 지정하는 데 사용됩니다.
[여기에서 표준을 읽을 수 있습니다](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

이 함수는 이 컨트랙트로 브리지된 L1 토큰의 주소를 제공합니다.
반대 방향으로 유사한 함수가 없다는 점에 유의하십시오.
구현 시 L2 지원이 계획되었는지 여부에 관계없이 모든 L1 토큰을 브리지할 수 있어야 합니다.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

토큰을 민팅(생성)하고 소각(파괴)하는 함수 및 이벤트.
토큰의 수가 정확하도록(L1에 락업된 토큰의 수와 동일) 보장하기 위해 브리지는 이러한 함수를 실행할 수 있는 유일한 엔터티여야 합니다.

### L2StandardERC20 {#L2StandardERC20}

[이것은 `IL2StandardERC20` 인터페이스의 구현입니다](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
사용자 지정 로직이 필요하지 않은 경우 이것을 사용해야 합니다.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[OpenZeppelin ERC-20 컨트랙트](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Optimism은 바퀴를 재발명하는 것을 믿지 않으며, 특히 바퀴가 잘 감사되고 자산을 보유할 만큼 신뢰할 수 있어야 할 때는 더욱 그렇습니다.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

이것은 ERC-20이 일반적으로 요구하지 않는 우리가 요구하는 두 가지 추가 구성 매개변수입니다.

```solidity

    /**
     * @param _l2Bridge L2 표준 브리지의 주소.
     * @param _l1Token 해당하는 L1 토큰의 주소.
     * @param _name ERC20 이름.
     * @param _symbol ERC20 기호.
     */
    constructor(
        address _l2Bridge,
        address _l1Token,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        l1Token = _l1Token;
        l2Bridge = _l2Bridge;
    }
```

먼저 상속하는 컨트랙트의 생성자(`ERC20(_name, _symbol)`)를 호출한 다음 우리 자신의 변수를 설정합니다.

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "L2 브리지만 민팅 및 소각 가능");
        _;
    }


    // slither-disable-next-line external-function
    function supportsInterface(bytes4 _interfaceId) public pure returns (bool) {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC20.l1Token.selector ^
            IL2StandardERC20.mint.selector ^
            IL2StandardERC20.burn.selector;
        return _interfaceId == firstSupportedInterface || _interfaceId == secondSupportedInterface;
    }
```

이것이 [ERC-165](https://eips.ethereum.org/EIPS/eip-165)가 작동하는 방식입니다.
모든 인터페이스는 여러 지원되는 함수로 구성되며, 해당 함수의 [ABI 함수 선택자](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html)의 [배타적 논리합](https://en.wikipedia.org/wiki/Exclusive_or)으로 식별됩니다.

L2 브리지는 ERC-165를 사용하여 자산을 보내는 ERC-20 컨트랙트가 `IL2StandardERC20`인지 확인하는 온전성 검사를 수행합니다.

**참고:** 악의적인 컨트랙트가 `supportsInterface`에 대해 거짓 답변을 제공하는 것을 막을 방법은 없으므로, 이는 온전성 검사 메커니즘이지 보안 메커니즘이 _아닙니다_.

```solidity
    // slither-disable-next-line external-function
    function mint(address _to, uint256 _amount) public virtual onlyL2Bridge {
        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    // slither-disable-next-line external-function
    function burn(address _from, uint256 _amount) public virtual onlyL2Bridge {
        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }
}
```

L2 브리지만 자산을 민팅하고 소각할 수 있습니다.

`_mint`와 `_burn`은 실제로 [OpenZeppelin ERC-20 컨트랙트](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn)에 정의되어 있습니다.
해당 컨트랙트는 토큰을 민팅하고 소각하는 조건이 ERC-20을 사용하는 방법만큼 다양하기 때문에 외부적으로 노출하지 않습니다.

## L2 브리지 코드 {#l2-bridge-code}

이것은 Optimism에서 브리지를 실행하는 코드입니다.
[이 컨트랙트의 소스는 여기에 있습니다](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* 인터페이스 임포트 */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) 인터페이스는 위에서 본 [L1 등가물](#IL1ERC20Bridge)과 매우 유사합니다.
두 가지 중요한 차이점이 있습니다.

1. L1에서는 예치를 시작하고 인출을 완료합니다.
   여기서는 인출을 시작하고 예치를 완료합니다.
2. L1에서는 ETH와 ERC-20 토큰을 구별해야 합니다.
   L2에서는 Optimism의 내부 ETH 잔액이 주소 [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000)를 가진 ERC-20 토큰으로 처리되기 때문에 둘 다 동일한 함수를 사용할 수 있습니다.

```solidity
/* 라이브러리 임포트 */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* 컨트랙트 임포트 */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev L2 표준 브리지는 L1 표준 브리지와 함께 작동하여 L1과 L2 간의 ETH 및 ERC20 전환을 가능하게 하는 컨트랙트입니다.
 * 이 컨트랙트는 L1 표준 브리지에 예치된 내역을 들었을 때 새 토큰의 민팅자 역할을 합니다.
 * 이 컨트랙트는 또한 인출을 목적으로 하는 토큰의 소각자 역할을 하여 L1 브리지에 L1 자금을 릴리스하도록 알립니다.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * 외부 컨트랙트 참조 *
     ********************************/

    address public l1TokenBridge;
```

L1 브리지의 주소를 추적합니다.
L1 등가물과 달리 여기서는 이 변수가 _필요_합니다.
L1 브리지의 주소는 미리 알 수 없습니다.

```solidity

    /***************
     * 생성자 *
     ***************/

    /**
     * @param _l2CrossDomainMessenger 이 컨트랙트에서 사용하는 교차 도메인 메신저.
     * @param _l1TokenBridge 메인 체인에 배포된 L1 브리지의 주소.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * 인출 *
     ***************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdraw(
        address _l2Token,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, msg.sender, _amount, _l1Gas, _data);
    }

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdrawTo(
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, _to, _amount, _l1Gas, _data);
    }
```

이 두 함수는 인출을 시작합니다.
L1 토큰 주소를 지정할 필요가 없다는 점에 유의하십시오.
L2 토큰은 L1 등가물의 주소를 알려줄 것으로 예상됩니다.

```solidity

    /**
     * @dev 토큰을 소각하고 L1 토큰 게이트웨이에
     *      인출을 알리는 인출 로직을 수행합니다.
     * @param _l2Token 인출이 시작된 L2 토큰의 주소.
     * @param _from L2에서 인출을 가져올 계정.
     * @param _to L1에서 인출을 줄 계정.
     * @param _amount 인출할 토큰의 금액.
     * @param _l1Gas 사용되지 않지만 잠재적인 미래 호환성을 위해 포함됩니다.
     * @param _data L1으로 전달할 선택적 데이터. 이 데이터는
     *        외부 컨트랙트의 편의를 위해서만 제공됩니다. 최대
     *        길이를 강제하는 것 외에, 이 컨트랙트는 내용에 대한 어떠한 보증도 제공하지 않습니다.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // 인출이 시작되면 후속 L2 사용을 방지하기 위해 인출자의 자금을 소각합니다
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

`_from` 매개변수에 의존하지 않고 훨씬 더 위조하기 어려운(내가 아는 한 불가능한) `msg.sender`에 의존하고 있다는 점에 유의하십시오.

```solidity

        // l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)에 대한 콜데이터 구성
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

L1에서는 ETH와 ERC-20을 구별해야 합니다.

```solidity
            message = abi.encodeWithSelector(
                IL1StandardBridge.finalizeETHWithdrawal.selector,
                _from,
                _to,
                _amount,
                _data
            );
        } else {
            message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                l1Token,
                _l2Token,
                _from,
                _to,
                _amount,
                _data
            );
        }

        // L1 브리지로 메시지 전송
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * 교차 체인 함수: 예치 *
     ************************************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function finalizeDeposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

이 함수는 `L1StandardBridge`에 의해 호출됩니다.

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

메시지의 출처가 합법적인지 확인하십시오.
이 함수는 `_mint`를 호출하고 브리지가 L1에 소유한 토큰으로 커버되지 않는 토큰을 제공하는 데 사용될 수 있기 때문에 중요합니다.

```solidity
        // 대상 토큰이 규정을 준수하는지 확인하고
        // L1에 예치된 토큰이 여기의 L2 예치 토큰 표현과 일치하는지 확인합니다
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

온전성 검사:

1. 올바른 인터페이스가 지원됩니다
2. L2 ERC-20 컨트랙트의 L1 주소가 토큰의 L1 출처와 일치합니다

```solidity
        ) {
            // 예치가 완료되면 L2의 계정에 동일한 양의
            // 토큰을 입금합니다.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

온전성 검사를 통과하면 예치를 완료합니다.

1. 토큰 민팅
2. 적절한 이벤트 발생

```solidity
        } else {
            // 예치되는 L2 토큰이 L1 토큰의 올바른 주소에
            // 동의하지 않거나 올바른 인터페이스를 지원하지 않습니다.
            // 이것은 악의적인 L2 토큰이 있거나 사용자가 어떻게든
            // 잘못된 L2 토큰 주소를 지정하여 예치한 경우에만 발생해야 합니다.
            // 어느 경우든 여기서 프로세스를 중지하고 인출
            // 메시지를 구성하여 사용자가 경우에 따라 자금을 꺼낼 수 있도록 합니다.
            // 악의적인 토큰 컨트랙트를 완전히 막을 방법은 없지만, 이는 사용자
            // 오류를 제한하고 일부 형태의 악의적인 컨트랙트 동작을 완화합니다.
```

사용자가 잘못된 L2 토큰 주소를 사용하여 감지 가능한 오류를 범한 경우, 예치를 취소하고 L1에서 토큰을 반환하고 싶습니다.
L2에서 이를 수행할 수 있는 유일한 방법은 결함 챌린지 기간을 기다려야 하는 메시지를 보내는 것이지만, 이는 사용자가 토큰을 영구적으로 잃는 것보다 훨씬 낫습니다.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // 예치를 발신자에게 반송하기 위해 여기서 _to와 _from을 바꿈
                _from,
                _amount,
                _data
            );

            // L1 브리지로 메시지 전송
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## 결론 {#conclusion}

표준 브리지는 자산 전송을 위한 가장 유연한 메커니즘입니다.
그러나 너무 일반적이기 때문에 항상 사용하기 가장 쉬운 메커니즘은 아닙니다.
특히 인출의 경우, 대부분의 사용자는 챌린지 기간을 기다리지 않고 인출을 완료하기 위해 머클 증명이 필요 없는 [타사 브리지](https://optimism.io/apps#bridge)를 사용하는 것을 선호합니다.

이러한 브리지는 일반적으로 L1에 자산을 보유하고 있어 즉시 제공하며 약간의 수수료(종종 표준 브리지 인출의 가스 비용보다 저렴함)를 받습니다.
브리지(또는 이를 운영하는 사람들)가 L1 자산이 부족할 것으로 예상하면 L2에서 충분한 자산을 전송합니다. 이는 매우 큰 인출이므로 인출 비용은 큰 금액에 걸쳐 상각되며 훨씬 작은 비율을 차지합니다.

이 글이 레이어 2가 어떻게 작동하는지, 그리고 명확하고 안전한 Solidity 코드를 작성하는 방법에 대해 더 많이 이해하는 데 도움이 되었기를 바랍니다.

[여기서 제 작업에 대한 자세한 내용을 확인하세요](https://cryptodocguy.pro/).
