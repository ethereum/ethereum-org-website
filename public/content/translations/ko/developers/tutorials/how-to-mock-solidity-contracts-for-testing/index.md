---
title: 테스트를 위해 Solidity 스마트 컨트랙트를 모킹하는 방법
description: 테스트할 때 컨트랙트를 모킹해야 하는 이유
author: 마르쿠스 바스
lang: ko
tags:
  - solidity
  - 스마트 컨트랙트
  - 테스트
  - 모킹
skill: intermediate
breadcrumb: 컨트랙트 모킹
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[모의 객체(Mock objects)](https://wikipedia.org/wiki/Mock_object)는 객체 지향 프로그래밍에서 흔히 사용되는 디자인 패턴입니다. '놀리다(making fun of)'라는 의미의 고대 프랑스어 'mocquer'에서 유래하여 '진짜를 모방하다'라는 의미로 발전했으며, 이는 실제로 우리가 프로그래밍에서 하고 있는 일입니다. 원한다면 스마트 컨트랙트를 놀려도(make fun of) 좋지만, 가능하면 항상 모킹(mock)하세요. 그러면 개발이 훨씬 수월해집니다.

## 모의 객체를 활용한 컨트랙트 단위 테스트 {#unit-testing-contracts-with-mocks}

컨트랙트를 모킹한다는 것은 본질적으로 원본과 매우 유사하게 동작하지만 개발자가 쉽게 제어할 수 있는 두 번째 버전의 컨트랙트를 만드는 것을 의미합니다. 종종 복잡한 컨트랙트에서 [컨트랙트의 작은 부분만 단위 테스트](/developers/docs/smart-contracts/testing/)하고 싶을 때가 있습니다. 문제는 이 작은 부분을 테스트하기 위해 도달하기 매우 어려운 특정한 컨트랙트 상태가 필요하다면 어떻게 해야 할까요?

매번 컨트랙트를 필요한 상태로 만드는 복잡한 테스트 설정 로직을 작성하거나, 모의 객체(mock)를 작성할 수 있습니다. 상속을 사용하면 컨트랙트 모킹이 쉽습니다. 원본 컨트랙트를 상속받는 두 번째 모의 컨트랙트를 만들기만 하면 됩니다. 이제 모의 객체에서 함수를 오버라이드(override)할 수 있습니다. 예제를 통해 살펴보겠습니다.

## 예제: 프라이빗 ERC-20 {#example-private-erc20}

초기에 프라이빗 기간을 가지는 예제 ERC-20 컨트랙트를 사용해 보겠습니다. 소유자는 프라이빗 사용자를 관리할 수 있으며, 처음에는 이 사용자들만 토큰을 받을 수 있습니다. 특정 시간이 지나면 모든 사람이 토큰을 사용할 수 있게 됩니다. 참고로, 여기서는 새로운 오픈제플린 컨트랙트 v3의 [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) 훅(hook)을 사용하고 있습니다.

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

이제 이를 모킹해 보겠습니다.

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

다음과 같은 오류 메시지 중 하나가 나타날 것입니다:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

새로운 0.6 Solidity 버전을 사용하고 있으므로, 오버라이드할 수 있는 함수에는 `virtual` 키워드를 추가하고, 오버라이드하는 함수에는 override를 추가해야 합니다. 따라서 두 `isPublic` 함수 모두에 이를 추가해 보겠습니다.

이제 단위 테스트에서 대신 `PrivateERC20Mock`를 사용할 수 있습니다. 프라이빗 사용 기간 동안의 동작을 테스트하려면 `setIsPublic(false)`를 사용하고, 마찬가지로 퍼블릭 사용 기간을 테스트하려면 `setIsPublic(true)`를 사용하세요. 물론 이 예제에서는 [시간 헬퍼(time helpers)](https://docs.openzeppelin.com/test-helpers/0.5/api#increase)를 사용하여 시간을 적절히 변경할 수도 있습니다. 하지만 이제 모킹의 개념이 명확해졌을 것이며, 단순히 시간을 앞당기는 것만큼 쉽지 않은 시나리오도 상상할 수 있을 것입니다.

## 여러 컨트랙트 모킹하기 {#mocking-many-contracts}

모든 모의 객체마다 다른 컨트랙트를 생성해야 한다면 코드가 지저분해질 수 있습니다. 이것이 번거롭다면 [MockContract](https://github.com/gnosis/mock-contract) 라이브러리를 살펴보세요. 이 라이브러리를 사용하면 즉석에서 컨트랙트의 동작을 오버라이드하고 변경할 수 있습니다. 하지만 이는 다른 컨트랙트에 대한 호출을 모킹할 때만 작동하므로, 우리의 예제에서는 작동하지 않습니다.

## 모킹의 더 강력한 활용 {#mocking-can-be-even-more-powerful}

모킹의 강력함은 여기서 끝나지 않습니다.

- 함수 추가: 특정 함수를 오버라이드하는 것뿐만 아니라 추가 함수를 더하는 것도 유용합니다. 토큰의 좋은 예로는 모든 사용자가 무료로 새 토큰을 받을 수 있도록 `mint` 함수를 추가하는 것입니다.
- 테스트넷에서의 사용: 탈중앙화 애플리케이션 (dapp)과 함께 테스트넷에 컨트랙트를 배포하고 테스트할 때, 모킹된 버전을 사용하는 것을 고려해 보세요. 꼭 필요한 경우가 아니라면 함수 오버라이드는 피하세요. 결국 실제 로직을 테스트해야 하기 때문입니다. 하지만 예를 들어, 새로운 배포 없이 컨트랙트 상태를 처음으로 되돌리는 리셋 함수를 추가하는 것은 유용할 수 있습니다. 당연히 메인넷 컨트랙트에는 이러한 기능이 포함되기를 원하지 않을 것입니다.