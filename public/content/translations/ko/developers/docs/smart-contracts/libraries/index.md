---
title: "스마트 컨트랙트 라이브러리"
description: "이더리움 개발 프로젝트를 가속화할 수 있는 재사용 가능한 스마트 컨트랙트 라이브러리와 구성 요소를 알아보세요."
lang: ko
---

프로젝트의 모든 스마트 컨트랙트를 처음부터 작성할 필요는 없습니다. 프로젝트에 재사용 가능한 구성 요소를 제공하여 불필요한 중복 작업을 피할 수 있게 해주는 다양한 오픈 소스 스마트 컨트랙트 라이브러리가 있습니다.

## 전제 조건 {#prerequisites}

스마트 컨트랙트 라이브러리에 대해 알아보기 전에 스마트 컨트랙트의 구조를 잘 이해해 두는 것이 좋습니다. 아직 읽어보지 않았다면 [스마트 컨트랙트 해부학](/developers/docs/smart-contracts/anatomy/)을 확인해 보세요.

## 라이브러리에는 무엇이 있나요? {#whats-in-a-library}

스마트 컨트랙트 라이브러리에서는 일반적으로 두 가지 종류의 구성 요소를 찾을 수 있습니다. 컨트랙트에 추가할 수 있는 재사용 가능한 동작과 다양한 표준의 구현체입니다.

### 동작 {#behaviors}

스마트 컨트랙트를 작성할 때, 컨트랙트에서 보호된 작업을 수행하기 위해 _관리자(admin)_ 주소를 할당하거나 예기치 않은 문제가 발생했을 때 비상 _일시 정지(pause)_ 버튼을 추가하는 등 비슷한 패턴을 반복해서 작성하게 될 가능성이 높습니다.

스마트 컨트랙트 라이브러리는 일반적으로 이러한 동작의 재사용 가능한 구현체를 [라이브러리](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) 형태로 제공하거나 Solidity의 [상속](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance)을 통해 제공합니다.

예를 들어, 다음은 [오픈제플린 컨트랙트 라이브러리](https://github.com/OpenZeppelin/openzeppelin-contracts)의 [`Ownable` 컨트랙트](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol)를 단순화한 버전입니다. 이 컨트랙트는 특정 주소를 컨트랙트의 소유자로 지정하고, 해당 소유자만 메서드에 접근할 수 있도록 제한하는 제어자(modifier)를 제공합니다.

```solidity
contract Ownable {
    address public owner;

    constructor() internal {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
}
```

컨트랙트에서 이와 같은 구성 요소를 사용하려면 먼저 이를 임포트(import)한 다음, 자신의 컨트랙트에서 확장(extend)해야 합니다. 이렇게 하면 기본 `Ownable` 컨트랙트에서 제공하는 제어자를 사용하여 자체 함수를 보호할 수 있습니다.

```solidity
import ".../Ownable.sol"; // 가져온 라이브러리 경로

contract MyContract is Ownable {
    // 다음 함수는 소유자만 호출할 수 있습니다
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

또 다른 인기 있는 예로는 [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math)나 [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html)가 있습니다. 이들은 (기본 컨트랙트와 달리) 언어 자체에서 제공하지 않는 오버플로 검사가 포함된 산술 함수를 제공하는 라이브러리입니다. 치명적인 결과를 초래할 수 있는 오버플로로부터 컨트랙트를 보호하기 위해 기본 산술 연산 대신 이러한 라이브러리 중 하나를 사용하는 것이 좋습니다!

### 표준 {#standards}

[조합성 및 상호운용성](/developers/docs/smart-contracts/composability/)을 촉진하기 위해 이더리움 커뮤니티는 **ERC** 형태로 여러 표준을 정의했습니다. 이에 대한 자세한 내용은 [표준](/developers/docs/standards/) 섹션에서 확인할 수 있습니다.

컨트랙트의 일부로 ERC를 포함할 때는 직접 구현하려고 하기보다는 표준 구현체를 찾는 것이 좋습니다. 많은 스마트 컨트랙트 라이브러리에는 가장 인기 있는 ERC에 대한 구현체가 포함되어 있습니다. 예를 들어, 널리 사용되는 [ERC-20 대체 가능 토큰 표준](/developers/tutorials/understand-the-erc-20-token-smart-contract/)은 [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) 및 [오픈제플린](https://docs.openzeppelin.com/contracts/3.x/erc20)에서 찾을 수 있습니다. 또한 일부 ERC는 ERC 자체의 일부로 공식 구현체를 제공하기도 합니다.

일부 ERC는 독립적이지 않고 다른 ERC에 추가되는 형태라는 점도 언급할 가치가 있습니다. 예를 들어, [ERC-2612](https://eips.ethereum.org/EIPS/eip-2612)는 사용성을 개선하기 위해 ERC-20에 확장 기능을 추가합니다.

## 라이브러리 추가 방법 {#how-to}

프로젝트에 라이브러리를 포함하는 구체적인 방법은 항상 포함하려는 라이브러리의 문서를 참조하세요. 여러 Solidity 컨트랙트 라이브러리는 `npm`을 사용하여 패키징되므로, 간단히 `npm install`할 수 있습니다. 컨트랙트를 [컴파일링](/developers/docs/smart-contracts/compiling/)하는 대부분의 도구는 스마트 컨트랙트 라이브러리를 찾기 위해 `node_modules`를 확인하므로 다음과 같이 할 수 있습니다.

```solidity
// node_modules에서 @openzeppelin/contracts 라이브러리를 불러옵니다
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

어떤 방법을 사용하든 라이브러리를 포함할 때는 항상 [언어](/developers/docs/smart-contracts/languages/) 버전을 주의 깊게 확인하세요. 예를 들어, Solidity 0.5로 컨트랙트를 작성하는 경우 Solidity 0.6용 라이브러리를 사용할 수 없습니다.

## 언제 사용해야 하나요? {#when-to-use}

프로젝트에 스마트 컨트랙트 라이브러리를 사용하면 여러 가지 이점이 있습니다. 무엇보다도, 직접 코딩할 필요 없이 시스템에 포함할 수 있는 바로 사용 가능한 구성 요소를 제공하여 시간을 절약해 줍니다.

보안 또한 큰 장점입니다. 오픈 소스 스마트 컨트랙트 라이브러리는 종종 철저한 검증을 거칩니다. 많은 프로젝트가 이러한 라이브러리에 의존하기 때문에, 커뮤니티는 이를 지속적으로 검토할 강력한 동기를 갖게 됩니다. 재사용 가능한 컨트랙트 라이브러리보다 애플리케이션 코드에서 오류가 발견되는 경우가 훨씬 더 많습니다. 일부 라이브러리는 추가적인 보안을 위해 [외부 감사](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits)를 받기도 합니다.

하지만 스마트 컨트랙트 라이브러리를 사용하면 익숙하지 않은 코드를 프로젝트에 포함시킬 위험이 따릅니다. 컨트랙트를 임포트하여 프로젝트에 바로 포함시키고 싶은 유혹이 들 수 있지만, 해당 컨트랙트가 어떤 역할을 하는지 제대로 이해하지 못하면 예기치 않은 동작으로 인해 시스템에 의도치 않게 문제를 일으킬 수 있습니다. 임포트하는 코드의 문서를 항상 읽어보고, 프로젝트의 일부로 만들기 전에 코드 자체를 검토하세요!

마지막으로, 라이브러리 포함 여부를 결정할 때는 전반적인 사용 현황을 고려하세요. 널리 채택된 라이브러리는 더 큰 커뮤니티를 보유하고 있으며, 더 많은 사람들이 문제를 찾아본다는 장점이 있습니다. 스마트 컨트랙트를 구축할 때는 보안을 최우선으로 고려해야 합니다!

## 관련 도구 {#related-tools}

**오픈제플린 컨트랙트(OpenZeppelin Contracts) -** **_안전한 스마트 컨트랙트 개발을 위한 가장 인기 있는 라이브러리입니다._**

- [문서](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [커뮤니티 포럼](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_스마트 컨트랙트를 위한 안전하고 간단하며 유연한 구성 요소입니다._**

- [문서](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_실제 환경을 위한 모든 기능을 갖춘 분산 애플리케이션을 구축하는 데 도움이 되는 컨트랙트, 라이브러리 및 예제가 포함된 Solidity 프로젝트입니다._**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK -** **_맞춤형 스마트 컨트랙트를 효율적으로 구축하는 데 필요한 도구를 제공합니다._**

- [문서](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## 관련 튜토리얼 {#related-tutorials}

- [이더리움 개발자를 위한 보안 고려 사항](/developers/docs/smart-contracts/security/) _– 라이브러리 사용을 포함하여 스마트 컨트랙트를 구축할 때의 보안 고려 사항에 대한 튜토리얼입니다._
- [ERC-20 토큰 스마트 컨트랙트 이해하기](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _- 여러 라이브러리에서 제공하는 ERC-20 표준에 대한 튜토리얼입니다._

## 더 읽을거리 {#further-reading}

_도움이 된 커뮤니티 리소스를 알고 계시나요? 이 페이지를 편집하여 추가해 주세요!_