---
title: "테스트를 위해 솔리디티 스마트 계약을 모의하는 방법"
description: "테스트할 때 계약을 놀려야 하는 이유"
author: Markus Waas
lang: ko
tags: [ "솔리디티", "스마트 계약", "테스트", "모킹" ]
skill: intermediate
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[모의 객체](https://wikipedia.org/wiki/Mock_object)는 객체 지향 프로그래밍에서 흔히 사용되는 디자인 패턴입니다. 이는 '놀리다'라는 의미를 가진 고대 프랑스어 'mocquer'에서 유래했으며, '실제 무언가를 모방하다'라는 의미로 발전했습니다. 이것이 바로 프로그래밍에서 우리가 하는 일입니다. 원한다면 스마트 계약을 놀려도 되지만, 가능하면 언제든지 모의(mock)하세요. 그러면 삶이 더 편해집니다.

## 모의 객체로 계약 단위 테스트하기 {#unit-testing-contracts-with-mocks}

계약을 모의한다는 것은 기본적으로 원래 계약과 매우 유사하게 작동하지만 개발자가 쉽게 제어할 수 있는 방식으로 해당 계약의 두 번째 버전을 만드는 것을 의미합니다. 계약이 복잡해서 [계약의 일부만 단위 테스트](/developers/docs/smart-contracts/testing/)하고 싶은 경우가 많습니다. 문제는 이 작은 부분을 테스트하는 데 도달하기 어려운 매우 특정한 계약 상태가 필요한 경우입니다.

매번 계약을 필요한 상태로 만드는 복잡한 테스트 설정 로직을 작성하거나 모의 객체를 작성할 수 있습니다. 상속을 사용하면 계약을 쉽게 모의할 수 있습니다. 원래 계약에서 상속받는 두 번째 모의 계약을 만들기만 하면 됩니다. 이제 모의 객체에 대한 함수를 재정의할 수 있습니다. 예를 들어 살펴보겠습니다.

## 예시: 비공개 ERC20 {#example-private-erc20}

초기 비공개 기간이 있는 ERC-20 계약 예시를 사용합니다. 소유자는 비공개 사용자를 관리할 수 있으며, 초기에는 해당 사용자만 토큰을 받을 수 있습니다. 일정 시간이 지나면 누구나 토큰을 사용할 수 있습니다. 궁금하시다면, 새로운 OpenZeppelin 계약 v3의 [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) 훅을 사용하고 있습니다.

```solidity
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrivateERC20 is ERC20, Ownable {
    mapping (address => bool) public isPrivateUser;
    uint256 private publicAfterTime;

    constructor(uint256 privateERC20timeInSec) ERC20("PrivateERC20", "PRIV") public {
        publicAfterTime = now + privateERC20timeInSec;
    }

    function addUser(address user) external onlyOwner {
        isPrivateUser[user] = true;
    }

    function isPublic() public view returns (bool) {
        return now >= publicAfterTime;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        require(_validRecipient(to), "PrivateERC20: invalid recipient");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

이제 모의해 보겠습니다.

```solidity
pragma solidity ^0.6.0;
import "../PrivateERC20.sol";

contract PrivateERC20Mock is PrivateERC20 {
    bool isPublicConfig;

    constructor() public PrivateERC20(0) {}

    function setIsPublic(bool isPublic) external {
        isPublicConfig = isPublic;
    }

    function isPublic() public view returns (bool) {
        return isPublicConfig;
    }
}
```

다음 오류 메시지 중 하나가 표시됩니다.

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

새로운 0.6 솔리디티 버전을 사용하고 있으므로, 재정의할 수 있는 함수에는 `virtual` 키워드를 추가하고 재정의하는 함수에는 `override`를 추가해야 합니다. 따라서 두 `isPublic` 함수에 이를 추가해 보겠습니다.

이제 단위 테스트에서 대신 `PrivateERC20Mock`을 사용할 수 있습니다. 비공개 사용 시간 동안의 동작을 테스트하려면 `setIsPublic(false)`를 사용하고, 공개 사용 시간을 테스트하려면 `setIsPublic(true)`를 사용하세요. 물론 이 예시에서는 [시간 헬퍼](https://docs.openzeppelin.com/test-helpers/0.5/api#increase)를 사용하여 시간을 적절하게 변경할 수도 있습니다. 하지만 이제 모킹의 개념이 명확해졌을 것이며, 단순히 시간을 앞당기는 것만큼 쉽지 않은 시나리오를 상상할 수 있을 것입니다.

## 많은 계약 모킹하기 {#mocking-many-contracts}

모든 단일 모의 객체에 대해 다른 계약을 만들어야 한다면 복잡해질 수 있습니다. 이것이 불편하다면 [MockContract](https://github.com/gnosis/mock-contract) 라이브러리를 살펴볼 수 있습니다. 이를 통해 즉석에서 계약의 동작을 재정의하고 변경할 수 있습니다. 하지만 다른 계약에 대한 호출을 모의하는 경우에만 작동하므로 우리 예시에는 적용되지 않습니다.

## 모킹은 훨씬 더 강력할 수 있습니다 {#mocking-can-be-even-more-powerful}

모킹의 힘은 여기서 그치지 않습니다.

- 함수 추가: 특정 함수를 재정의하는 것뿐만 아니라 추가 함수를 더하는 것도 유용합니다. 토큰의 좋은 예는 모든 사용자가 무료로 새 토큰을 받을 수 있도록 추가적인 `mint` 함수를 두는 것입니다.
- 테스트넷에서 사용: 탈중앙화앱과 함께 테스트넷에서 계약을 배포하고 테스트할 때 모의 버전을 사용하는 것을 고려해 보세요. 꼭 필요한 경우가 아니면 함수 재정의를 피하세요. 결국 실제 로직을 테스트하고 싶을 것입니다. 하지만 예를 들어 계약 상태를 처음으로 간단히 리셋하는 리셋 함수를 추가하면 유용할 수 있으며, 새로운 배포가 필요하지 않습니다. 당연히 메인넷 계약에는 이것을 원하지 않을 것입니다.
