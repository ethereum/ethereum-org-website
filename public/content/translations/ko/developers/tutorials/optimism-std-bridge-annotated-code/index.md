---
title: "옵티미즘 표준 브릿지 컨트랙트 살펴보기"
description: "옵티미즘의 표준 브릿지는 어떻게 작동할까요? 왜 이런 방식으로 작동할까요?"
author: "오리 포메란츠"
tags: ["Solidity", "브릿지", "레이어 2 (l2)"]
skill: intermediate
breadcrumb: "옵티미즘 브릿지"
published: 2022-03-30
lang: ko
---

[옵티미즘](https://www.optimism.io/)은 [옵티미스틱 롤업](/developers/docs/scaling/optimistic-rollups/)입니다.
옵티미스틱 롤업은 네트워크의 모든 노드가 아닌 소수의 노드에서만 트랜잭션을 처리하기 때문에 이더리움 메인넷(레이어 1 (l1)이라고도 함)보다 훨씬 저렴한 비용으로 트랜잭션을 처리할 수 있습니다.
동시에 모든 데이터가 l1에 기록되므로 메인넷의 모든 무결성 및 가용성 보장을 통해 모든 것을 증명하고 재구성할 수 있습니다.

옵티미즘(또는 다른 l2)에서 l1 자산을 사용하려면 자산을 [브릿지](/bridges/#prerequisites)해야 합니다.
이를 달성하는 한 가지 방법은 사용자가 l1에 자산(ETH 및 [ERC-20 토큰](/developers/docs/standards/tokens/erc-20/)이 가장 일반적임)을 잠그고 l2에서 사용할 동등한 자산을 받는 것입니다.
결국, 이 자산을 소유하게 된 사람은 이를 다시 l1으로 브릿지하고 싶어할 수 있습니다.
이때 자산은 l2에서 소각된 다음 l1에서 사용자에게 다시 반환됩니다.

이것이 [옵티미즘 표준 브릿지](https://docs.optimism.io/app-developers/bridging/standard-bridge)가 작동하는 방식입니다.
이 글에서는 해당 브릿지의 소스 코드를 살펴보고 어떻게 작동하는지 알아보며, 잘 작성된 Solidity 코드의 예시로 연구해 보겠습니다.

## 제어 흐름 {#control-flows}

브릿지에는 두 가지 주요 흐름이 있습니다:

- 입금 (l1에서 l2로)
- 인출 (l2에서 l1으로)

### 입금 흐름 {#deposit-flow}

#### 레이어 1 (l1) {#deposit-flow-layer-1}

1. ERC-20을 입금하는 경우, 입금자는 브릿지에 입금할 금액을 사용할 수 있는 허용량을 부여합니다.
2. 입금자는 l1 브릿지를 호출합니다(`depositERC20`, `depositERC20To`, `depositETH` 또는 `depositETHTo`).
3. l1 브릿지는 브릿지된 자산의 소유권을 가져옵니다.
   - ETH: 자산은 호출의 일부로 입금자에 의해 전송됩니다.
   - ERC-20: 자산은 입금자가 제공한 허용량을 사용하여 브릿지가 자신에게 전송합니다.
4. l1 브릿지는 크로스 도메인 메시지 메커니즘을 사용하여 l2 브릿지의 `finalizeDeposit`를 호출합니다.

#### 레이어 2 (l2) {#deposit-flow-layer-2}

5. l2 브릿지는 `finalizeDeposit`에 대한 호출이 합법적인지 확인합니다:
   - 크로스 도메인 메시지 컨트랙트에서 왔는지
   - 원래 l1의 브릿지에서 왔는지
6. l2 브릿지는 l2의 ERC-20 토큰 컨트랙트가 올바른지 확인합니다:
   - l2 컨트랙트는 자신의 l1 상대방이 l1에서 토큰이 온 곳과 동일하다고 보고합니다.
   - l2 컨트랙트는 올바른 인터페이스를 지원한다고 보고합니다([ERC-165 사용](https://eips.ethereum.org/EIPS/eip-165)).
7. l2 컨트랙트가 올바른 경우, 이를 호출하여 적절한 주소에 적절한 수의 토큰을 발행합니다. 그렇지 않은 경우, 사용자가 l1에서 토큰을 청구할 수 있도록 인출 프로세스를 시작합니다.

### 인출 흐름 {#withdrawal-flow}

#### 레이어 2 (l2) {#withdrawal-flow-layer-2}

1. 인출자는 l2 브릿지를 호출합니다(`withdraw` 또는 `withdrawTo`).
2. l2 브릿지는 `msg.sender`에 속하는 적절한 수의 토큰을 소각합니다.
3. l2 브릿지는 크로스 도메인 메시지 메커니즘을 사용하여 l1 브릿지의 `finalizeETHWithdrawal` 또는 `finalizeERC20Withdrawal`를 호출합니다.

#### 레이어 1 (l1) {#withdrawal-flow-layer-1}

4. l1 브릿지는 `finalizeETHWithdrawal` 또는 `finalizeERC20Withdrawal`에 대한 호출이 합법적인지 확인합니다:
   - 크로스 도메인 메시지 메커니즘에서 왔는지
   - 원래 l2의 브릿지에서 왔는지
5. l1 브릿지는 적절한 자산(ETH 또는 ERC-20)을 적절한 주소로 전송합니다.

## 레이어 1 (l1) 코드 {#layer-1-code}

이것은 l1인 이더리움 메인넷에서 실행되는 코드입니다.

### IL1ERC20Bridge {#il1erc20bridge}

[이 인터페이스는 여기에 정의되어 있습니다](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
여기에는 ERC-20 토큰을 브릿지하는 데 필요한 함수와 정의가 포함되어 있습니다.

```solidity
// SPDX-License-Identifier: MIT
```

[옵티미즘 코드의 대부분은 MIT 라이선스로 배포됩니다](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

작성 당시 Solidity의 최신 버전은 0.8.12입니다.
버전 0.9.0이 출시될 때까지 이 코드가 해당 버전과 호환되는지 여부는 알 수 없습니다.

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

옵티미즘 브릿지 용어에서 <em>입금(deposit)</em>은 l1에서 l2로의 전송을 의미하고, <em>인출(withdrawal)</em>은 l2에서 l1으로의 전송을 의미합니다.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

대부분의 경우 l1의 ERC-20 주소는 l2의 동등한 ERC-20 주소와 같지 않습니다.
[여기에서 토큰 주소 목록을 확인할 수 있습니다](https://static.optimism.io/optimism.tokenlist.json).
`chainId`가 1인 주소는 l1(메인넷)에 있고 `chainId`가 10인 주소는 l2(옵티미즘)에 있습니다.
나머지 두 개의 `chainId` 값은 Kovan 테스트 네트워크(42)와 Optimistic Kovan 테스트 네트워크(69)를 위한 것입니다.

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

전송에 메모를 추가할 수 있으며, 이 경우 전송을 보고하는 이벤트에 추가됩니다.

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

동일한 브릿지 컨트랙트가 양방향 전송을 처리합니다.
l1 브릿지의 경우, 이는 입금의 초기화와 인출의 완료를 의미합니다.

```solidity

    /********************
     * 퍼블릭 함수 *
     ********************/

    /**
     * @dev 해당하는 l2 브릿지 컨트랙트의 주소를 가져옵니다.
     * @return 해당하는 l2 브릿지 컨트랙트의 주소.
     */
    function l2TokenBridge() external returns (address);
```

이 함수는 l2에서 사전 배포된 컨트랙트이므로 항상 `0x4200000000000000000000000000000000000010` 주소에 있기 때문에 실제로는 필요하지 않습니다.
l1 브릿지의 주소는 알기 _쉽지 않기_ 때문에 l2 브릿지와의 대칭성을 위해 여기에 있습니다.

```solidity
    /**
     * @dev l2에 있는 호출자의 잔고로 일정량의 ERC-20을 예치합니다.
     * @param _l1Token 예치하려는 l1 ERC-20의 주소
     * @param _l2Token 해당 l1에 대응하는 l2 ERC-20의 주소
     * @param _amount 예치할 ERC-20의 양
     * @param _l2Gas l2에서 예치를 완료하는 데 필요한 가스 한도.
     * @param _data l2로 전달할 선택적 데이터. 이 데이터는 외부 컨트랙트의 편의를 위해서만 제공됩니다. 최대 길이를 강제하는 것 외에, 이 컨트랙트들은 그 내용에 대해 어떠한 보장도 하지 않습니다.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

`_l2Gas` 매개변수는 트랜잭션이 사용할 수 있는 l2 가스의 양입니다.
[특정(높은) 한도까지는 무료](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2)이므로, ERC-20 컨트랙트가 발행 시 정말 이상한 작업을 수행하지 않는 한 문제가 되지 않습니다.
이 함수는 사용자가 다른 블록체인의 동일한 주소로 자산을 브릿지하는 일반적인 시나리오를 처리합니다.

```solidity
    /**
     * @dev l2에 있는 수신자의 잔고로 일정량의 ERC-20을 예치합니다.
     * @param _l1Token 예치하려는 l1 ERC-20의 주소
     * @param _l2Token 해당 l1에 대응하는 l2 ERC-20의 주소
     * @param _to 인출 금액을 입금할 l2 주소.
     * @param _amount 예치할 ERC-20의 양.
     * @param _l2Gas l2에서 예치를 완료하는 데 필요한 가스 한도.
     * @param _data l2로 전달할 선택적 데이터. 이 데이터는 외부 컨트랙트의 편의를 위해서만 제공됩니다. 최대 길이를 강제하는 것 외에, 이 컨트랙트들은 그 내용에 대해 어떠한 보장도 하지 않습니다.
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

이 함수는 `depositERC20`와 거의 동일하지만, ERC-20을 다른 주소로 전송할 수 있게 해줍니다.

```solidity
    /*************************
     * 크로스체인 함수 *
     *************************/

    /**
     * @dev l2에서 l1으로의 인출을 완료하고, 수신자의 l1 ERC-20 토큰 잔고에 자금을 입금합니다.
     * l2에서 초기화된 인출이 완료되지 않은 경우 이 호출은 실패합니다.
     *
     * @param _l1Token finalizeWithdrawal을 수행할 l1 토큰의 주소.
     * @param _l2Token 인출이 시작된 l2 토큰의 주소.
     * @param _from 전송을 시작하는 l2 주소.
     * @param _to 인출 금액을 입금할 l1 주소.
     * @param _amount 예치할 ERC-20의 양.
     * @param _data l2의 송신자가 제공한 데이터. 이 데이터는 외부 컨트랙트의 편의를 위해서만 제공됩니다. 최대 길이를 강제하는 것 외에, 이 컨트랙트들은 그 내용에 대해 어떠한 보장도 하지 않습니다.
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

옵티미즘에서 인출(및 l2에서 l1으로의 기타 메시지)은 두 단계 프로세스입니다:

1. l2에서의 초기화 트랜잭션.
2. l1에서의 완료 또는 청구 트랜잭션.
   이 트랜잭션은 l2 트랜잭션에 대한 [결함 이의 제기 기간](https://community.optimism.io/docs/how-optimism-works/#fault-proofs)이 끝난 후에 발생해야 합니다.

### IL1StandardBridge {#il1standardbridge}

[이 인터페이스는 여기에 정의되어 있습니다](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
이 파일에는 ETH에 대한 이벤트 및 함수 정의가 포함되어 있습니다.
이러한 정의는 위의 ERC-20에 대해 `IL1ERC20Bridge`에 정의된 것과 매우 유사합니다.

일부 ERC-20 토큰은 사용자 지정 처리가 필요하고 표준 브릿지에서 처리할 수 없기 때문에 브릿지 인터페이스는 두 개의 파일로 나뉩니다.
이렇게 하면 이러한 토큰을 처리하는 사용자 지정 브릿지가 `IL1ERC20Bridge`를 구현할 수 있으며 ETH도 브릿지할 필요가 없습니다.

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

이 이벤트는 l1 및 l2 토큰 주소가 없다는 점을 제외하면 ERC-20 버전(`ERC20DepositInitiated`)과 거의 동일합니다.
다른 이벤트와 함수도 마찬가지입니다.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * 퍼블릭 함수 *
     ********************/

    /**
     * @dev l2에 있는 호출자의 잔고로 일정량의 ETH를 예치합니다.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev l2에 있는 수신자의 잔고로 일정량의 ETH를 예치합니다.
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
     * 크로스체인 함수 *
     *************************/

    /**
     * @dev l2에서 l1으로의 인출을 완료하고, 수신자의 l1 ETH 토큰 잔고에 자금을 입금합니다. xDomainMessenger만이 이 함수를 호출할 수 있으므로, 인출이 완료되기 전에는 절대 호출되지 않습니다.
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

[이 컨트랙트](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol)는 다른 레이어로 메시지를 보내기 위해 두 브릿지([l1](#the-l1-bridge-contract) 및 [l2](#l2-bridge-code)) 모두에서 상속됩니다.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* 인터페이스 임포트 */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[이 인터페이스](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol)는 크로스 도메인 메신저를 사용하여 다른 레이어로 메시지를 보내는 방법을 컨트랙트에 알려줍니다.
이 크로스 도메인 메신저는 완전히 다른 시스템이며, 향후 별도의 글로 다룰 가치가 있습니다.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev 크로스 도메인 통신을 수행하는 컨트랙트를 위한 헬퍼 컨트랙트
 *
 * 사용된 컴파일러: 상속받는 컨트랙트에서 정의됨
 */
contract CrossDomainEnabled {
    /*************
     * 변수 *
     *************/

    // 다른 도메인과 메시지를 주고받는 데 사용되는 메신저 컨트랙트.
    address public messenger;

    /***************
     * 생성자 *
     ***************/

    /**
     * @param _messenger 현재 레이어에 있는 CrossDomainMessenger의 주소.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

컨트랙트가 알아야 할 유일한 매개변수는 이 레이어에 있는 크로스 도메인 메신저의 주소입니다.
이 매개변수는 생성자에서 한 번 설정되며 절대 변경되지 않습니다.

```solidity

    /**********************
     * 함수 제어자 *
     **********************/

    /**
     * 제어자가 적용된 함수는 특정 크로스 도메인 계정만 호출할 수 있도록 강제합니다.
     * @param _sourceDomainAccount 이 함수를 호출할 수 있도록 인증된 출발지 도메인의 유일한 계정.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

크로스 도메인 메시징은 실행 중인 블록체인(이더리움 메인넷 또는 옵티미즘)의 모든 컨트랙트에서 액세스할 수 있습니다.
하지만 양쪽의 브릿지는 반대쪽 브릿지에서 온 특정 메시지만을 _오직_ 신뢰해야 합니다.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

적절한 크로스 도메인 메신저(`messenger`, 아래 참조)에서 온 메시지만 신뢰할 수 있습니다.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

크로스 도메인 메신저가 다른 레이어와 함께 메시지를 보낸 주소를 제공하는 방법은 [`.xDomainMessageSender()` 함수](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128)입니다.
메시지에 의해 시작된 트랜잭션에서 호출되는 한 이 정보를 제공할 수 있습니다.

우리는 수신한 메시지가 다른 브릿지에서 왔는지 확인해야 합니다.

```solidity

        _;
    }

    /**********************
     * 내부 함수 *
     **********************/

    /**
     * 일반적으로 스토리지에서 메신저를 가져옵니다. 이 함수는 자식 컨트랙트가 오버라이드해야 할 경우를 대비해 노출됩니다.
     * @return 사용해야 하는 크로스 도메인 메신저 컨트랙트의 주소.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

이 함수는 크로스 도메인 메신저를 반환합니다.
변수 `messenger` 대신 함수를 사용하는 이유는 이 컨트랙트를 상속하는 컨트랙트가 어떤 크로스 도메인 메신저를 사용할지 지정하는 알고리즘을 사용할 수 있도록 하기 위함입니다.

```solidity

    /**
     * 다른 도메인의 계정으로 메시지를 전송합니다
     * @param _crossDomainTarget 목적지 도메인의 의도된 수신자
     * @param _message 대상에게 보낼 데이터 (일반적으로 `onlyFromCrossDomainAccount()`가 있는 함수에 대한 콜 데이터)
     * @param _gasLimit 대상 도메인에서 메시지를 수신하기 위한 가스 한도.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

마지막으로, 다른 레이어로 메시지를 보내는 함수입니다.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[슬리더](https://github.com/crytic/slither)는 옵티미즘이 취약점 및 기타 잠재적인 문제를 찾기 위해 모든 컨트랙트에서 실행하는 정적 분석기입니다.
이 경우 다음 줄은 두 가지 취약점을 유발합니다:

1. [재진입 이벤트](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [양성 재진입](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

이 경우 슬리더가 알 방법이 없더라도 `getCrossDomainMessenger()`가 신뢰할 수 있는 주소를 반환한다는 것을 알고 있으므로 재진입에 대해 걱정하지 않습니다.

### l1 브릿지 컨트랙트 {#the-l1-bridge-contract}

[이 컨트랙트의 소스 코드는 여기에 있습니다](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

인터페이스는 다른 컨트랙트의 일부가 될 수 있으므로 다양한 Solidity 버전을 지원해야 합니다.
하지만 브릿지 자체는 우리의 컨트랙트이므로 어떤 Solidity 버전을 사용할지에 대해 엄격하게 관리할 수 있습니다.

```solidity
/* 인터페이스 임포트 */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#il1erc20bridge) 및 [IL1StandardBridge](#il1standardbridge)는 위에서 설명했습니다.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[이 인터페이스](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol)를 사용하면 l2의 표준 브릿지를 제어하는 메시지를 생성할 수 있습니다.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[이 인터페이스](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)를 사용하면 ERC-20 컨트랙트를 제어할 수 있습니다.
[자세한 내용은 여기에서 읽을 수 있습니다](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* 라이브러리 임포트 */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[위에서 설명한 바와 같이](#crossdomainenabled), 이 컨트랙트는 레이어 간 메시징에 사용됩니다.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol)에는 항상 동일한 주소를 갖는 l2 컨트랙트의 주소가 있습니다. 여기에는 l2의 표준 브릿지가 포함됩니다.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[오픈제플린의 Address 유틸리티](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). 이는 컨트랙트 주소와 외부 소유 계정(EOA)에 속하는 주소를 구별하는 데 사용됩니다.

직접 호출과 컨트랙트의 생성자에서 이루어진 호출을 구별할 방법이 없기 때문에 완벽한 해결책은 아니지만, 적어도 이를 통해 몇 가지 일반적인 사용자 오류를 식별하고 방지할 수 있습니다.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[ERC-20 표준](https://eips.ethereum.org/EIPS/eip-20)은 컨트랙트가 실패를 보고하는 두 가지 방법을 지원합니다:

1. 되돌리기
2. `false` 반환

두 경우를 모두 처리하면 코드가 더 복잡해지므로, 대신 [모든 실패가 되돌리기로 이어지도록](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96) 보장하는 [오픈제플린의 `SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol)를 사용합니다.

```solidity
/**
 * @title L1StandardBridge
 * @dev l1 ETH 및 ERC-20 브릿지는 예치된 l1 자금과 l2에서 사용 중인 표준 토큰을 저장하는 컨트랙트입니다. 이는 대응하는 l2 브릿지를 동기화하여, 예치 사실을 알리고 새로 완료된 인출을 수신합니다.
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

[L2StandardBridge](#l2-bridge-code)의 주소입니다.

```solidity

    // l1 토큰을 l2 토큰에 매핑하여 예치된 l1 토큰의 잔고를 나타냅니다
    mapping(address => mapping(address => uint256)) public deposits;
```

이와 같은 이중 [매핑](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)은 [2차원 희소 배열](https://en.wikipedia.org/wiki/Sparse_matrix)을 정의하는 방법입니다.
이 데이터 구조의 값은 `deposit[L1 token addr][L2 token addr]`로 식별됩니다.
기본값은 0입니다.
다른 값으로 설정된 셀만 스토리지에 기록됩니다.

```solidity

    /***************
     * 생성자 *
     ***************/

    // 이 컨트랙트는 프록시 뒤에 존재하므로, 생성자 매개변수는 사용되지 않습니다.
    constructor() CrossDomainEnabled(address(0)) {}
```

스토리지의 모든 변수를 복사하지 않고도 이 컨트랙트를 업그레이드할 수 있기를 원합니다.
이를 위해 [`delegatecall`](https://solidity-by-example.org/delegatecall/)를 사용하여 프록시 컨트랙트가 주소를 저장하는 별도의 컨트랙트로 호출을 전송하는 컨트랙트인 [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy)를 사용합니다(업그레이드 시 프록시에 해당 주소를 변경하도록 지시합니다).
`delegatecall`를 사용하면 스토리지는 _호출하는_ 컨트랙트의 스토리지로 유지되므로 모든 컨트랙트 상태 변수의 값은 영향을 받지 않습니다.

이 패턴의 한 가지 효과는 `delegatecall`의 _호출된_ 컨트랙트의 스토리지가 사용되지 않으므로 전달된 생성자 값이 중요하지 않다는 것입니다.
이것이 `CrossDomainEnabled` 생성자에 무의미한 값을 제공할 수 있는 이유입니다.
또한 아래의 초기화가 생성자와 분리된 이유이기도 합니다.

```solidity
    /******************
     * 초기화 *
     ******************/

    /**
     * @param _l1messenger 크로스체인 통신에 사용되는 l1 메신저 주소.
     * @param _l2TokenBridge l2 표준 브릿지 주소.
     */
    // slither-disable-next-line external-function
```

이 [슬리더 테스트](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external)는 컨트랙트 코드에서 호출되지 않으므로 `public` 대신 `external`로 선언할 수 있는 함수를 식별합니다.
`external` 함수의 가스 비용은 콜 데이터에 매개변수를 제공할 수 있기 때문에 더 낮을 수 있습니다.
`public`로 선언된 함수는 컨트랙트 내부에서 액세스할 수 있어야 합니다.
컨트랙트는 자신의 콜 데이터를 수정할 수 없으므로 매개변수는 메모리에 있어야 합니다.
이러한 함수가 외부에서 호출될 때 콜 데이터를 메모리로 복사해야 하며, 이로 인해 가스 비용이 발생합니다.
이 경우 함수는 한 번만 호출되므로 비효율성은 문제가 되지 않습니다.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

`initialize` 함수는 한 번만 호출되어야 합니다.
l1 크로스 도메인 메신저 또는 l2 토큰 브릿지의 주소가 변경되면, 새로운 프록시와 이를 호출하는 새로운 브릿지를 생성합니다.
이는 전체 시스템이 업그레이드되는 경우를 제외하고는 발생할 가능성이 낮으며, 매우 드문 일입니다.

이 함수에는 _누가_ 호출할 수 있는지 제한하는 메커니즘이 없다는 점에 유의하세요.
이는 이론적으로 공격자가 프록시와 브릿지의 첫 번째 버전을 배포할 때까지 기다렸다가 [프론트러닝](https://solidity-by-example.org/hacks/front-running/)을 통해 합법적인 사용자보다 먼저 `initialize` 함수에 도달할 수 있음을 의미합니다. 하지만 이를 방지하는 두 가지 방법이 있습니다:

1. 컨트랙트가 EOA에 의해 직접 배포되지 않고 [다른 컨트랙트가 이를 생성하는 트랜잭션에서](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595) 배포되는 경우, 전체 프로세스는 원자적(atomic)일 수 있으며 다른 트랜잭션이 실행되기 전에 완료될 수 있습니다.
2. `initialize`에 대한 합법적인 호출이 실패하면 새로 생성된 프록시와 브릿지를 무시하고 새로운 것을 생성하는 것이 항상 가능합니다.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

이것들은 브릿지가 알아야 할 두 가지 매개변수입니다.

```solidity

    /**************
     * 예치 *
     **************/

    /** @dev 송신자가 EOA일 것을 요구하는 제어자. 악의적인 컨트랙트가 initcode를 통해 이 확인을 우회할 수 있지만, 우리가 피하고자 하는 사용자 오류를 처리합니다.
     */
    modifier onlyEOA() {
        // 컨트랙트로부터의 예치를 중단하는 데 사용됩니다 (실수로 토큰을 잃어버리는 것을 방지)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

이것이 오픈제플린의 `Address` 유틸리티가 필요한 이유입니다.

```solidity
    /**
     * @dev 이 함수는 데이터 없이 호출되어
     * l2에 있는 호출자의 잔고로 일정량의 ETH를 예치할 수 있습니다.
     * receive 함수는 데이터를 받지 않으므로, 보수적인
     * 기본 금액이 l2로 전달됩니다.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

이 함수는 테스트 목적으로 존재합니다.
인터페이스 정의에 나타나지 않는다는 점에 유의하세요. 일반적인 용도가 아닙니다.

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

이 두 함수는 실제 ETH 입금을 처리하는 함수인 `_initiateETHDeposit`를 감싸는 래퍼입니다.

```solidity
    /**
     * @dev ETH를 저장하고 l2 ETH 게이트웨이에 예치 사실을 알림으로써 예치 로직을 수행합니다.
     * @param _from l1에서 예치금을 가져올 계정.
     * @param _to l2에서 예치금을 받을 계정.
     * @param _l2Gas l2에서 예치를 완료하는 데 필요한 가스 한도.
     * @param _data l2로 전달할 선택적 데이터. 이 데이터는 외부 컨트랙트의 편의를 위해서만 제공됩니다. 최대 길이를 강제하는 것 외에, 이 컨트랙트들은 그 내용에 대해 어떠한 보장도 하지 않습니다.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // finalizeDeposit 호출을 위한 콜 데이터 구성
        bytes memory message = abi.encodeWithSelector(
```

크로스 도메인 메시지가 작동하는 방식은 대상 컨트랙트가 메시지를 콜 데이터로 사용하여 호출되는 것입니다.
Solidity 컨트랙트는 항상 [ABI 사양](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html)에 따라 콜 데이터를 해석합니다.
Solidity 함수 [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions)는 해당 콜 데이터를 생성합니다.

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

여기서 메시지는 다음 매개변수를 사용하여 [`finalizeDeposit` 함수](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148)를 호출하는 것입니다:

| 매개변수 | 값 | 의미 |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0) | l1에서 ETH(ERC-20 토큰이 아님)를 나타내는 특수 값 |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | 옵티미즘에서 ETH를 관리하는 l2 컨트랙트, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (이 컨트랙트는 옵티미즘 내부 전용입니다) |
| \_from | \_from | ETH를 보내는 l1의 주소 |
| \_to | \_to | ETH를 받는 l2의 주소 |
| amount | msg.value | 전송된 Wei의 양 (이미 브릿지로 전송됨) |
| \_data | \_data | 입금에 첨부할 추가 데이터 |

```solidity
        // l2로 콜 데이터 전송
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

크로스 도메인 메신저를 통해 메시지를 보냅니다.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

이 전송을 수신하는 탈중앙화 애플리케이션 (dapp)에 알리기 위해 이벤트를 발생시킵니다.

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

이 두 함수는 실제 ERC-20 입금을 처리하는 함수인 `_initiateERC20Deposit`를 감싸는 래퍼입니다.

```solidity
    /**
     * @dev l2 예치 토큰 컨트랙트에 예치 사실을 알리고 핸들러를 호출하여 l1 자금을 잠금으로써 예치 로직을 수행합니다. (예: transferFrom)
     *
     * @param _l1Token 예치하려는 l1 ERC-20의 주소
     * @param _l2Token 해당 l1에 대응하는 l2 ERC-20의 주소
     * @param _from l1에서 예치금을 가져올 계정
     * @param _to l2에서 예치금을 받을 계정
     * @param _amount 예치할 ERC-20의 양.
     * @param _l2Gas l2에서 예치를 완료하는 데 필요한 가스 한도.
     * @param _data l2로 전달할 선택적 데이터. 이 데이터는 외부 컨트랙트의 편의를 위해서만 제공됩니다. 최대 길이를 강제하는 것 외에, 이 컨트랙트들은 그 내용에 대해 어떠한 보장도 하지 않습니다.
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

이 함수는 위의 `_initiateETHDeposit`와 유사하지만 몇 가지 중요한 차이점이 있습니다.
첫 번째 차이점은 이 함수가 토큰 주소와 전송할 금액을 매개변수로 받는다는 것입니다.
ETH의 경우 브릿지에 대한 호출에 이미 브릿지 계정으로의 자산 전송이 포함되어 있습니다(`msg.value`).

```solidity
        // l1에서 예치가 시작되면, l1 브릿지는 향후
        // 인출을 위해 자금을 자신에게 전송합니다. safeTransferFrom은 컨트랙트에 코드가 있는지도 확인하므로, 만약
        // _from이 EOA이거나 주소(0)인 경우 이는 실패합니다.
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20 토큰 전송은 ETH와 다른 프로세스를 따릅니다:

1. 사용자(`_from`)는 브릿지에 적절한 토큰을 전송할 수 있는 허용량을 부여합니다.
2. 사용자는 토큰 컨트랙트의 주소, 금액 등을 사용하여 브릿지를 호출합니다.
3. 브릿지는 입금 프로세스의 일부로 토큰을 (자신에게) 전송합니다.

첫 번째 단계는 마지막 두 단계와 별개의 트랜잭션에서 발생할 수 있습니다.
하지만 `_initiateERC20Deposit`를 호출하는 두 함수(`depositERC20` 및 `depositERC20To`)가 `_from` 매개변수로 `msg.sender`만을 사용하여 이 함수를 호출하기 때문에 프론트러닝은 문제가 되지 않습니다.

```solidity
        // _l2Token.finalizeDeposit(_to, _amount)를 위한 콜 데이터 구성
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // l2로 콜 데이터 전송
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

입금된 토큰 금액을 `deposits` 데이터 구조에 추가합니다.
동일한 l1 ERC-20 토큰에 해당하는 여러 주소가 l2에 있을 수 있으므로, 입금을 추적하기 위해 l1 ERC-20 토큰의 브릿지 잔액을 사용하는 것만으로는 충분하지 않습니다.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * 크로스체인 함수 *
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

l2 브릿지는 l2 크로스 도메인 메신저에 메시지를 보내고, 이로 인해 l1 크로스 도메인 메신저가 이 함수를 호출하게 됩니다(물론 [메시지를 완료하는 트랜잭션](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions)이 l1에 제출된 후).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

이것이 크로스 도메인 메신저에서 오고 l2 토큰 브릿지에서 시작된 _합법적인_ 메시지인지 확인합니다.
이 함수는 브릿지에서 ETH를 인출하는 데 사용되므로 승인된 호출자만 호출할 수 있도록 해야 합니다.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

ETH를 전송하는 방법은 `msg.value`에 있는 Wei의 양으로 수신자를 호출하는 것입니다.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

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

이 함수는 위의 `finalizeETHWithdrawal`와 유사하며 ERC-20 토큰에 필요한 변경 사항이 있습니다.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

`deposits` 데이터 구조를 업데이트합니다.

```solidity

        // l1에서 인출이 완료되면, l1 브릿지는 인출자에게 자금을 전송합니다
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * 임시 - ETH 마이그레이션 *
     *****************************/

    /**
     * @dev 계정에 ETH 잔고를 추가합니다. 이는 ETH가
     * 이전 게이트웨이에서 새 게이트웨이로 마이그레이션될 수 있도록 하기 위함입니다.
     * 참고: 이는 이전 컨트랙트로부터 마이그레이션된 ETH를 받을 수 있도록 단 한 번의 업그레이드를 위해서만 남겨둡니다
     */
    function donateETH() external payable {}
}
```

브릿지의 이전 구현이 있었습니다.
해당 구현에서 이 구현으로 이동할 때 모든 자산을 이동해야 했습니다.
ERC-20 토큰은 그냥 이동할 수 있습니다.
하지만 컨트랙트로 ETH를 전송하려면 해당 컨트랙트의 승인이 필요하며, 이것이 `donateETH`가 우리에게 제공하는 것입니다.

## 레이어 2 (l2)의 ERC-20 토큰 {#erc-20-tokens-on-l2}

ERC-20 토큰이 표준 브릿지에 맞으려면 표준 브릿지가, 그리고 _오직_ 표준 브릿지만이 토큰을 발행할 수 있도록 허용해야 합니다.
이는 브릿지가 옵티미즘에서 유통되는 토큰의 수가 l1 브릿지 컨트랙트 내부에 잠긴 토큰의 수와 동일한지 확인해야 하기 때문에 필요합니다.
l2에 토큰이 너무 많으면 일부 사용자는 자산을 l1으로 다시 브릿지할 수 없게 됩니다.
신뢰할 수 있는 브릿지 대신, 우리는 본질적으로 [부분 지급 준비금 제도](https://www.investopedia.com/terms/f/fractionalreservebanking.asp)를 재현하게 될 것입니다.
l1에 토큰이 너무 많으면 l2 토큰을 소각하지 않고는 해제할 방법이 없기 때문에 일부 토큰은 브릿지 컨트랙트 내부에 영원히 잠겨 있게 됩니다.

### IL2StandardERC20 {#il2standarderc20}

표준 브릿지를 사용하는 l2의 모든 ERC-20 토큰은 표준 브릿지에 필요한 함수와 이벤트가 있는 [이 인터페이스](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol)를 제공해야 합니다.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[표준 ERC-20 인터페이스](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)에는 `mint` 및 `burn` 함수가 포함되어 있지 않습니다.
이러한 메서드는 토큰을 생성하고 파괴하는 메커니즘을 지정하지 않은 [ERC-20 표준](https://eips.ethereum.org/EIPS/eip-20)에서 요구하지 않습니다.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[ERC-165 인터페이스](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol)는 컨트랙트가 제공하는 함수를 지정하는 데 사용됩니다.
[여기에서 표준을 읽을 수 있습니다](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

이 함수는 이 컨트랙트로 브릿지된 l1 토큰의 주소를 제공합니다.
반대 방향으로는 유사한 함수가 없다는 점에 유의하세요.
구현 당시 l2 지원이 계획되었는지 여부에 관계없이 모든 l1 토큰을 브릿지할 수 있어야 합니다.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

토큰을 발행(생성)하고 소각(파괴)하는 함수 및 이벤트입니다.
토큰 수가 올바른지(l1에 잠긴 토큰 수와 동일한지) 확인하기 위해 브릿지만이 이러한 함수를 실행할 수 있는 유일한 엔티티여야 합니다.

### L2StandardERC20 {#l2standarderc20}

[이것은 `IL2StandardERC20` 인터페이스의 구현입니다](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
어떤 종류의 사용자 지정 로직이 필요한 경우가 아니라면 이것을 사용해야 합니다.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[오픈제플린 ERC-20 컨트랙트](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
옵티미즘은 바퀴를 재발명하는 것을 믿지 않으며, 특히 바퀴가 잘 감사되었고 자산을 보유할 만큼 충분히 신뢰할 수 있어야 할 때는 더욱 그렇습니다.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

이것들은 우리가 요구하고 ERC-20은 일반적으로 요구하지 않는 두 가지 추가 구성 매개변수입니다.

```solidity

    /**
     * @param _l2Bridge l2 표준 브릿지의 주소.
     * @param _l1Token 해당하는 l1 토큰의 주소.
     * @param _name ERC-20 이름.
     * @param _symbol ERC-20 심볼.
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

먼저 상속받은 컨트랙트(`ERC20(_name, _symbol)`)의 생성자를 호출한 다음 자체 변수를 설정합니다.

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Only L2 Bridge can mint and burn");
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
모든 인터페이스는 지원되는 여러 함수이며, 해당 함수들의 [ABI 함수 선택자](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector)의 [배타적 논리합(XOR)](https://en.wikipedia.org/wiki/Exclusive_or)으로 식별됩니다.

l2 브릿지는 자산을 보내는 ERC-20 컨트랙트가 `IL2StandardERC20`인지 확인하기 위한 온전성 검사(sanity check)로 ERC-165를 사용합니다.

**참고:** 악성 컨트랙트가 `supportsInterface`에 대해 거짓 답변을 제공하는 것을 막을 방법은 없으므로, 이는 온전성 검사 메커니즘이지 보안 메커니즘이 _아닙니다_.

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

l2 브릿지만이 자산을 발행하고 소각할 수 있습니다.

`_mint` 및 `_burn`는 실제로 [오픈제플린 ERC-20 컨트랙트](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn)에 정의되어 있습니다.
해당 컨트랙트는 이를 외부에 노출하지 않을 뿐입니다. 토큰을 발행하고 소각하는 조건은 ERC-20을 사용하는 방법의 수만큼 다양하기 때문입니다.

## 레이어 2 (l2) 브릿지 코드 {#l2-bridge-code}

이것은 옵티미즘에서 브릿지를 실행하는 코드입니다.
[이 컨트랙트의 소스는 여기에 있습니다](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* 인터페이스 임포트 */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) 인터페이스는 위에서 본 [l1의 동등한 인터페이스](#il1erc20bridge)와 매우 유사합니다.
두 가지 중요한 차이점이 있습니다:

1. l1에서는 입금을 초기화하고 인출을 완료합니다.
   여기서는 인출을 초기화하고 입금을 완료합니다.
2. l1에서는 ETH와 ERC-20 토큰을 구별해야 합니다.
   l2에서는 옵티미즘의 내부 ETH 잔액이 [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) 주소를 가진 ERC-20 토큰으로 처리되기 때문에 둘 다에 대해 동일한 함수를 사용할 수 있습니다.

```solidity
/* 라이브러리 임포트 */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* 컨트랙트 임포트 */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev l2 표준 브릿지는 l1 표준 브릿지와 함께 작동하여
 * l1과 l2 간의 ETH 및 ERC-20 전환을 가능하게 하는 컨트랙트입니다.
 * 이 컨트랙트는 l1 표준 브릿지로의 예치 소식을 들었을 때 새로운 토큰의 발행자 역할을 합니다.
 * 또한 이 컨트랙트는 인출을 목적으로 하는 토큰을 소각하는 역할을 하며, l1 브릿지에 l1 자금을 해제하도록 알립니다.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * 외부 컨트랙트 참조 *
     ********************************/

    address public l1TokenBridge;
```

l1 브릿지의 주소를 추적합니다.
l1의 동등한 것과 대조적으로 여기서는 이 변수가 _필요하다는_ 점에 유의하세요.
l1 브릿지의 주소는 사전에 알 수 없습니다.

```solidity

    /***************
     * 생성자 *
     ***************/

    /**
     * @param _l2CrossDomainMessenger 이 컨트랙트에서 사용하는 크로스 도메인 메신저.
     * @param _l1TokenBridge 메인 체인에 배포된 l1 브릿지의 주소.
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

이 두 함수는 인출을 초기화합니다.
l1 토큰 주소를 지정할 필요가 없다는 점에 유의하세요.
l2 토큰은 l1의 동등한 주소를 알려줄 것으로 예상됩니다.

```solidity

    /**
     * @dev 토큰을 소각하고 l1 토큰 게이트웨이에 인출 사실을 알림으로써
     *      인출 로직을 수행합니다.
     * @param _l2Token 인출이 시작된 l2 토큰의 주소.
     * @param _from l2에서 인출금을 가져올 계정.
     * @param _to l1에서 인출금을 받을 계정.
     * @param _amount 인출할 토큰의 양.
     * @param _l1Gas 사용되지 않지만, 잠재적인 상위 호환성 고려를 위해 포함됨.
     * @param _data l1으로 전달할 선택적 데이터. 이 데이터는 외부 컨트랙트의 편의를 위해서만 제공됩니다. 최대 길이를 강제하는 것 외에, 이 컨트랙트들은 그 내용에 대해 어떠한 보장도 하지 않습니다.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // 인출이 시작되면, 후속 l2
        // 사용을 방지하기 위해 인출자의 자금을 소각합니다
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

우리는 `_from` 매개변수에 의존하지 _않고_ 위조하기 훨씬 더 어려운(제가 아는 한 불가능한) `msg.sender`에 의존한다는 점에 유의하세요.

```solidity

        // l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)를 위한 콜 데이터 구성
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

l1에서는 ETH와 ERC-20을 구별해야 합니다.

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

        // l1 브릿지로 메시지 전송
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * 크로스체인 함수: 예치 *
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

메시지의 출처가 합법적인지 확인합니다.
이 함수는 `_mint`를 호출하며 브릿지가 l1에서 소유한 토큰으로 충당되지 않는 토큰을 제공하는 데 사용될 수 있기 때문에 이는 중요합니다.

```solidity
        // 대상 토큰이 규정을 준수하는지 확인하고
        // l1에 예치된 토큰이 이곳의 l2 예치 토큰 표현과 일치하는지 검증합니다
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

온전성 검사:

1. 올바른 인터페이스가 지원되는지
2. l2 ERC-20 컨트랙트의 l1 주소가 토큰의 l1 출처와 일치하는지

```solidity
        ) {
            // 예치가 완료되면, l2의 계정에 동일한 양의
            // 토큰을 입금합니다.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

온전성 검사를 통과하면 입금을 완료합니다:

1. 토큰을 발행합니다
2. 적절한 이벤트를 발생시킵니다

```solidity
        } else {
            // 예치 대상인 l2 토큰이 올바른 주소에 대해 동의하지 않거나
            // 자신의 l1 토큰의 올바른 인터페이스를 지원하지 않습니다.
            // 이는 악의적인 l2 토큰이 있거나, 사용자가 어떤 이유로든
            // 예치할 잘못된 l2 토큰 주소를 지정한 경우에만 발생해야 합니다.
            // 어느 경우든, 여기서 프로세스를 중단하고 인출
            // 메시지를 구성하여 일부 경우에 사용자가 자금을 빼낼 수 있도록 합니다.
            // 악의적인 토큰 컨트랙트를 완전히 방지할 방법은 없지만, 이는
            // 사용자 오류를 제한하고 일부 형태의 악의적인 컨트랙트 동작을 완화합니다.
```

사용자가 잘못된 l2 토큰 주소를 사용하여 감지 가능한 오류를 범한 경우, 입금을 취소하고 l1에서 토큰을 반환하고자 합니다.
l2에서 이를 수행할 수 있는 유일한 방법은 결함 이의 제기 기간을 기다려야 하는 메시지를 보내는 것이지만, 이는 사용자가 토큰을 영구적으로 잃는 것보다 훨씬 낫습니다.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // 예치금을 송신자에게 되돌려주기 위해 여기서 _to와 _from을 바꿨습니다
                _from,
                _amount,
                _data
            );

            // l1 브릿지로 메시지 전송
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## 결론 {#conclusion}

표준 브릿지는 자산 전송을 위한 가장 유연한 메커니즘입니다.
하지만 너무 일반적이기 때문에 항상 사용하기 가장 쉬운 메커니즘은 아닙니다.
특히 인출의 경우, 대부분의 사용자는 이의 제기 기간을 기다리지 않고 인출을 완료하기 위해 머클 증명이 필요하지 않은 [서드파티 브릿지](https://optimism.io/apps#bridge)를 사용하는 것을 선호합니다.

이러한 브릿지는 일반적으로 l1에 자산을 보유하고 있으며, 소액의 수수료(종종 표준 브릿지 인출의 가스 비용보다 적음)로 즉시 제공하는 방식으로 작동합니다.
브릿지(또는 이를 운영하는 사람)가 l1 자산이 부족할 것으로 예상하면 l2에서 충분한 자산을 전송합니다. 이는 매우 큰 규모의 인출이므로 인출 비용이 많은 금액에 걸쳐 상각되어 훨씬 더 작은 비율을 차지하게 됩니다.

이 글이 레이어 2 (l2)가 어떻게 작동하는지, 그리고 명확하고 안전한 Solidity 코드를 작성하는 방법에 대해 더 많이 이해하는 데 도움이 되었기를 바랍니다.

[제 작업물은 여기에서 더 볼 수 있습니다](https://cryptodocguy.pro/).
