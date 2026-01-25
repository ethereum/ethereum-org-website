---
title: "스마트 계약 라이브러리"
description: "재사용 가능한 스마트 계약 라이브러리 및 구성 요소를 찾아 이더리움 개발 프로젝트를 가속화하세요."
lang: ko
---

프로젝트에서 모든 스마트 계약을 처음부터 작성할 필요가 없습니다. 프로젝트에 재사용 가능한 빌딩 블록을 제공하는 많은 오픈 소스 스마트 계약 라이브러리가 있어, 처음부터 모든 것을 다시 만들 필요 없이 시간을 절약할 수 있습니다.

## 필수 구성 요소 {#prerequisites}

스마트 계약 라이브러리에 뛰어들기 전에, 스마트 계약의 구조를 잘 이해하는 것이 좋습니다. 아직 확인하지 않았다면 [스마트 계약 구조](/developers/docs/smart-contracts/anatomy/)로 이동하세요.

## 라이브러리 구성 {#whats-in-a-library}

스마트 계약 라이브러리에서는 보통 두 가지 유형의 빌딩 블록을 찾을 수 있습니다: 계약에 추가할 수 있는 재사용 가능한 동작과 다양한 표준의 구현입니다.

### 동작 {#behaviors}

스마트 계약을 작성할 때, 계약에서 보호된 작업을 수행하기 위해 _admin_ 주소를 할당하거나 예기치 않은 문제가 발생했을 때 긴급 _pause_ 버튼을 추가하는 것처럼, 유사한 패턴을 여러 번 작성하게 될 가능성이 큽니다.

스마트 계약 라이브러리는 일반적으로 솔리디티(Solidity)에서 [라이브러리](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) 또는 [상속](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance)을 통해 이러한 동작의 재사용 가능한 구현을 제공합니다.

예를 들어, 다음은 [OpenZeppelin Contracts 라이브러리](https://github.com/OpenZeppelin/openzeppelin-contracts)의 [`Ownable` 계약](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol)의 간소화된 버전입니다. 이 계약은 주소를 계약의 소유자로 지정하고 해당 소유자에게만 메서드에 대한 접근을 제한하는 제어자를 제공합니다.

```solidity
contract Ownable {
    address public owner;

    constructor() internal {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: 호출자가 소유자가 아닙니다");
        _;
    }
}
```

이러한 빌딩 블록을 계약에 사용하려면 먼저 이를 가져와 계약에서 확장해야 합니다. 이를 통해 기본 `Ownable` 계약에서 제공하는 제어자를 사용하여 자신의 함수를 보호할 수 있습니다.

```solidity
import ".../Ownable.sol"; // 가져온 라이브러리의 경로

contract MyContract is Ownable {
    // 다음 함수는 소유자만 호출할 수 있습니다
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

또 다른 인기 있는 예는 [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) 또는 [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html)입니다. 이들은 언어에서 제공되지 않는 오버플로우 검사를 포함한 산술 기능을 제공하는 라이브러리입니다. 계약을 오버플로우로부터 보호하기 위해 기본 산술 연산 대신 이러한 라이브러리 중 하나를 사용하는 것이 좋은 관행입니다.

### 표준 {#standards}

[구성 가능성 및 상호 운용성](/developers/docs/smart-contracts/composability/)을 촉진하기 위해 이더리움 커뮤니티는 **ERC** 형식으로 여러 표준을 정의했습니다. 자세한 내용은 [표준](/developers/docs/standards/) 섹션에서 확인할 수 있습니다.

계약의 일부로 ERC를 포함할 때는, 직접 구현하는 대신 표준 구현을 찾는 것이 좋습니다. 많은 스마트 계약 라이브러리에는 가장 인기 있는 ERC의 구현이 포함되어 있습니다. 예를 들어, 널리 사용되는 [ERC20 대체 가능 토큰 표준](/developers/tutorials/understand-the-erc-20-token-smart-contract/)은 [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/), [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20)에서 찾아볼 수 있습니다. 또한, 일부 ERC는 ERC 자체의 일부로 표준 구현을 제공합니다.

몇몇 ERC는 독립적인 것이 아니라 다른 ERC에 추가로 제공되는 경우도 있습니다. 예를 들어, [ERC2612](https://eips.ethereum.org/EIPS/eip-2612)는 ERC20의 사용성 개선을 위한 확장 기능을 추가합니다.

## 라이브러리 추가 방법 {#how-to}

프로젝트에 라이브러리를 포함하는 구체적인 방법에 대해서는 항상 라이브러리의 문서를 참조하세요. 일부 솔리디티(Solidity) 계약 라이브러리는 `npm`을 사용하여 패키지로 제공되므로 `npm install`을 사용하여 간단히 설치할 수 있습니다. 계약 [컴파일](/developers/docs/smart-contracts/compiling/)을 위한 대부분의 도구는 스마트 계약 라이브러리를 `node_modules`에서 찾으므로 다음과 같이 할 수 있습니다.

```solidity
// node_modules에서 @openzeppelin/contracts 라이브러리를 로드합니다
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

사용하는 방법에 관계없이 라이브러리를 포함할 때는 항상 [언어](/developers/docs/smart-contracts/languages/) 버전을 주시해야 합니다. 예를 들면 솔리디티 0.5에서 계약을 작성하고 있는 경우 솔리디티 0.6 라이브러리를 사용할 수 없습니다.

## 사용 시점 {#when-to-use}

프로젝트에서 스마트 계약 라이브러리를 사용하는 것은 여러 가지 장점이 있습니다. 첫째, 직접 코딩하지 않고도 시스템에 포함할 수 있는 즉시 사용 가능한 빌딩 블록을 제공하여 시간을 절약할 수 있습니다.

보안도 중요한 장점입니다. 오픈 소스 스마트 계약 라이브러리는 많은 프로젝트가 이를 의존하므로, 커뮤니티에서 지속적인 검토가 이루어집니다. 응용 프로그램 코드에서 오류를 발견하는 것이 재사용 가능한 계약 라이브러리에서 오류를 발견하는 것보다 훨씬 더 흔합니다. 응용 프로그램 코드에서 오류를 발견하는 것이 재사용 가능한 계약 라이브러리에서 오류를 발견하는 것보다 훨씬 더 흔합니다. 일부 라이브러리는 보안 강화를 위해 [외부 감사](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits)를 받기도 합니다.

그러나 스마트 계약 라이브러리를 사용할 때는 익숙하지 않은 코드를 프로젝트에 포함할 위험이 있습니다. 계약을 가져와 프로젝트에 바로 포함시키는 것은 유혹적이지만, 해당 계약이 무엇을 하는지 잘 모르면, 예상치 못한 동작으로 인해 시스템에 문제를 도입할 수 있습니다. 가져온 코드의 문서를 읽고, 코드를 검토한 후 프로젝트의 일부로 만들도록 하세요!

마지막으로 라이브러리를 포함할지 여부를 결정할 때, 그 라이브러리의 전체적인 사용성을 고려하세요. 광범위하게 채택된 라이브러리는 커뮤니티가 더 크고 더 많은 사람들이 문제를 점검할 가능성이 있습니다. 스마트 계약을 사용하여 구축할 때 보안을 최우선으로 생각해야 합니다!

## 관련 도구 {#related-tools}

**OpenZeppelin Contracts -** **_안전한 스마트 계약 개발을 위한 가장 인기 있는 라이브러리_**

- [문서](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [커뮤니티 포럼](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_안전하고 단순하며 유연한 스마트 계약용 구성 요소_**

- [문서](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_실제 환경에서 모든 기능을 갖춘 분산 애플리케이션을 구축하는 데 도움이 되는 계약, 라이브러리 및 예제가 포함된 솔리디티(Solidity) 프로젝트_**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb 솔리디티(Solidity) SDK -** **_맞춤형 스마트 계약을 효율적으로 구축하는 데 필요한 도구를 제공합니다_**

- [문서](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## 관련 튜토리얼 {#related-tutorials}

- [이더리움 개발자를 위한 보안 고려사항](/developers/docs/smart-contracts/security/) _– 라이브러리 사용을 포함하여 스마트 계약을 구축할 때의 보안 고려사항에 대한 튜토리얼입니다._
- [ERC-20 토큰 스마트 계약 이해하기](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _- 여러 라이브러리에서 제공하는 ERC20 표준에 대한 튜토리얼입니다._

## 더 읽어보기 {#further-reading}

_도움이 되었던 커뮤니티 참고 자료를 알고 계신가요? 이 페이지를 편집해서 추가하세요!_
