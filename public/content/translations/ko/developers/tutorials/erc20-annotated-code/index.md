---
title: "ERC-20 컨트랙트 살펴보기"
description: "오픈제플린 ERC-20 컨트랙트에는 무엇이 포함되어 있으며, 그 이유는 무엇일까요?"
author: "오리 포메란츠"
lang: ko
tags: ["Solidity", "erc-20"]
skill: beginner
breadcrumb: "ERC-20 살펴보기"
published: 2021-03-09
---

## 소개 {#introduction}

이더리움의 가장 일반적인 용도 중 하나는 특정 그룹이 거래 가능한 토큰, 즉 일종의 자체 통화를 만드는 것입니다. 이러한 토큰은 일반적으로 [ERC-20](/developers/docs/standards/tokens/erc-20/)이라는 표준을 따릅니다. 이 표준 덕분에 유동성 풀 및 지갑과 같이 모든 ERC-20 토큰과 함께 작동하는 도구를 작성할 수 있습니다. 이 글에서는 [인터페이스 정의](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)뿐만 아니라 [오픈제플린 Solidity ERC20 구현](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)을 분석해 보겠습니다.

이것은 주석이 달린 소스 코드입니다. ERC-20을 구현하려면 [이 튜토리얼을 읽어보세요](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## 인터페이스 {#the-interface}

ERC-20과 같은 표준의 목적은 지갑이나 탈중앙화 거래소와 같은 애플리케이션 전반에서 상호운용 가능한 많은 토큰 구현을 허용하는 것입니다. 이를 달성하기 위해 [인터페이스](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/)를 만듭니다. 토큰 컨트랙트를 사용해야 하는 모든 코드는 인터페이스에서 동일한 정의를 사용할 수 있으며, 메타마스크와 같은 지갑이든, etherscan.io와 같은 탈중앙화 애플리케이션(dapp)이든, 유동성 풀과 같은 다른 컨트랙트이든 관계없이 이를 사용하는 모든 토큰 컨트랙트와 호환될 수 있습니다.

![Illustration of the ERC-20 interface](erc20_interface.png)

숙련된 프로그래머라면 [Java](https://www.w3schools.com/java/java_interface.asp)나 [C 헤더 파일](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html)에서 비슷한 구조를 본 기억이 있을 것입니다.

이것은 오픈제플린의 [ERC-20 인터페이스](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) 정의입니다. [사람이 읽을 수 있는 표준](https://eips.ethereum.org/EIPS/eip-20)을 Solidity 코드로 번역한 것입니다. 물론 인터페이스 자체는 어떤 작업을 _어떻게_ 수행할지 정의하지 않습니다. 이는 아래의 컨트랙트 소스 코드에 설명되어 있습니다.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Solidity 파일에는 라이선스 식별자가 포함되어야 합니다. [여기에서 라이선스 목록을 확인할 수 있습니다](https://spdx.org/licenses/). 다른 라이선스가 필요한 경우 주석에 설명하면 됩니다.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Solidity 언어는 여전히 빠르게 발전하고 있으며, 새 버전은 이전 코드와 호환되지 않을 수 있습니다([여기 참조](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). 따라서 언어의 최소 버전뿐만 아니라 코드를 테스트한 최신 버전인 최대 버전도 지정하는 것이 좋습니다.

&nbsp;

```solidity
/**
 * @dev EIP에 정의된 ERC-20 표준의 인터페이스입니다.
 */
```

주석의 `@dev`는 소스 코드에서 문서를 생성하는 데 사용되는 [NatSpec 형식](https://docs.soliditylang.org/en/develop/natspec-format.html)의 일부입니다.

&nbsp;

```solidity
interface IERC20 {
```

관례적으로 인터페이스 이름은 `I`로 시작합니다.

&nbsp;

```solidity
    /**
     * @dev 존재하는 토큰의 양을 반환합니다.
     */
    function totalSupply() external view returns (uint256);
```

이 함수는 `external`이며, 이는 [컨트랙트 외부에서만 호출할 수 있음](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2)을 의미합니다. 컨트랙트 내 토큰의 총 공급량을 반환합니다. 이 값은 이더리움에서 가장 일반적인 타입인 부호 없는 256비트(256비트는 EVM의 기본 워드 크기입니다)를 사용하여 반환됩니다. 이 함수는 또한 `view`이기도 한데, 이는 상태를 변경하지 않음을 의미하므로 블록체인의 모든 노드가 실행할 필요 없이 단일 노드에서 실행될 수 있습니다. 이러한 종류의 함수는 트랜잭션을 생성하지 않으며 [가스](/developers/docs/gas/) 비용이 들지 않습니다.

**참고:** 이론적으로는 컨트랙트 생성자가 실제 값보다 적은 총 공급량을 반환하여 각 토큰이 실제보다 더 가치 있는 것처럼 보이게 속일 수 있을 것처럼 보일 수 있습니다. 하지만 그러한 우려는 블록체인의 진정한 본질을 무시한 것입니다. 블록체인에서 일어나는 모든 일은 모든 노드에서 검증할 수 있습니다. 이를 위해 모든 컨트랙트의 기계어 코드와 스토리지는 모든 노드에서 사용할 수 있습니다. 컨트랙트의 Solidity 코드를 게시할 의무는 없지만, 소스 코드와 컴파일에 사용된 Solidity 버전을 게시하여 제공한 기계어 코드와 대조하여 검증할 수 있게 하지 않는 한 아무도 여러분을 진지하게 받아들이지 않을 것입니다.
예를 들어, [이 컨트랙트](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract)를 참조하세요.

&nbsp;

```solidity
    /**
     * @dev `account`가 소유한 토큰의 양을 반환합니다.
     */
    function balanceOf(address account) external view returns (uint256);
```

이름에서 알 수 있듯이 `balanceOf`는 계정의 잔액을 반환합니다. 이더리움 계정은 Solidity에서 160비트를 보유하는 `address` 타입을 사용하여 식별됩니다. 이 함수 역시 `external` 및 `view`입니다.

&nbsp;

```solidity
    /**
     * @dev 호출자의 계정에서 `recipient`로 `amount`만큼의 토큰을 전송합니다.
     *
     * 작업의 성공 여부를 나타내는 부울 값을 반환합니다.
     *
     * {Transfer} 이벤트를 발생시킵니다.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

`transfer` 함수는 호출자로부터 다른 주소로 토큰을 전송합니다. 이는 상태 변경을 수반하므로 `view`가 아닙니다. 사용자가 이 함수를 호출하면 트랜잭션이 생성되고 가스 비용이 발생합니다. 또한 `Transfer` 이벤트를 발생시켜 블록체인 상의 모든 사람에게 해당 이벤트를 알립니다.

이 함수는 두 가지 다른 유형의 호출자를 위해 두 가지 유형의 출력을 가집니다.

- 사용자 인터페이스에서 직접 함수를 호출하는 사용자. 일반적으로 사용자는 트랜잭션을 제출하고 무기한의 시간이 걸릴 수 있는 응답을 기다리지 않습니다. 사용자는 트랜잭션 해시로 식별되는 트랜잭션 영수증을 찾거나 `Transfer` 이벤트를 찾아 무슨 일이 일어났는지 확인할 수 있습니다.
- 전체 트랜잭션의 일부로 함수를 호출하는 다른 컨트랙트. 이러한 컨트랙트는 동일한 트랜잭션에서 실행되므로 결과를 즉시 얻을 수 있으며, 따라서 함수의 반환 값을 사용할 수 있습니다.

컨트랙트의 상태를 변경하는 다른 함수들도 동일한 유형의 출력을 생성합니다.

&nbsp;

허용량은 계정이 다른 소유자에게 속한 일부 토큰을 사용할 수 있도록 허용합니다. 이는 예를 들어 판매자 역할을 하는 컨트랙트에 유용합니다. 컨트랙트는 이벤트를 모니터링할 수 없으므로, 구매자가 판매자 컨트랙트로 직접 토큰을 전송한다면 해당 컨트랙트는 지불을 받았는지 알 수 없습니다. 대신 구매자는 판매자 컨트랙트가 특정 금액을 사용할 수 있도록 허용하고, 판매자는 해당 금액을 전송합니다. 이는 판매자 컨트랙트가 호출하는 함수를 통해 수행되므로 판매자 컨트랙트는 성공 여부를 알 수 있습니다.

```solidity
    /**
     * @dev `spender`가 {transferFrom}을 통해 `owner`를 대신하여 사용할 수 있도록 허용된 토큰의 남은 양을 반환합니다. 기본값은 0입니다.
     *
     * 이 값은 {approve} 또는 {transferFrom}이 호출될 때 변경됩니다.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

`allowance` 함수를 사용하면 누구나 한 주소(`owner`)가 다른 주소(`spender`)에서 사용할 수 있도록 허용한 허용량이 얼마인지 조회할 수 있습니다.

&nbsp;

```solidity
    /**
     * @dev 호출자의 토큰에 대해 `spender`의 허용량으로 `amount`를 설정합니다.
     *
     * 작업의 성공 여부를 나타내는 부울 값을 반환합니다.
     *
     * 중요: 이 메서드를 사용하여 허용량을 변경하면 불행한 트랜잭션 순서로 인해 누군가가 이전 허용량과 새 허용량을 모두 사용할 수 있는 위험이 발생할 수 있습니다. 이 경쟁 조건을 완화하는 한 가지 가능한 해결책은 먼저 spender의 허용량을 0으로 줄인 다음 원하는 값을 설정하는 것입니다:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * {Approval} 이벤트를 발생시킵니다.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

`approve` 함수는 허용량을 생성합니다. 이것이 어떻게 악용될 수 있는지에 대한 메시지를 반드시 읽어보세요. 이더리움에서는 자신의 트랜잭션 순서는 제어할 수 있지만, 상대방의 트랜잭션이 발생한 것을 볼 때까지 자신의 트랜잭션을 제출하지 않는 한 다른 사람의 트랜잭션이 실행되는 순서는 제어할 수 없습니다.

&nbsp;

```solidity
    /**
     * @dev 허용량 메커니즘을 사용하여 `sender`에서 `recipient`로 `amount`만큼의 토큰을 전송합니다. 그런 다음 호출자의 허용량에서 `amount`가 차감됩니다.
     *
     * 작업의 성공 여부를 나타내는 부울 값을 반환합니다.
     *
     * {Transfer} 이벤트를 발생시킵니다.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

마지막으로, `transferFrom`는 사용자가 허용량을 실제로 사용하는 데 사용됩니다.

&nbsp;

```solidity

    /**
     * @dev `value`만큼의 토큰이 한 계정(`from`)에서 다른 계정(`to`)으로 전송될 때 발생합니다.
     *
     * `value`는 0일 수 있습니다.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev {approve} 호출에 의해 `owner`에 대한 `spender`의 허용량이 설정될 때 발생합니다. `value`는 새로운 허용량입니다.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

이러한 이벤트는 ERC-20 컨트랙트의 상태가 변경될 때 발생합니다.

## 실제 컨트랙트 {#the-actual-contract}

이것은 ERC-20 표준을 구현하는 실제 컨트랙트이며, [여기에서 가져왔습니다](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol). 있는 그대로 사용하기 위한 것은 아니지만, 이를 [상속](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm)하여 사용 가능한 형태로 확장할 수 있습니다.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### Import 문 {#import-statements}

위의 인터페이스 정의 외에도 컨트랙트 정의는 두 개의 다른 파일을 가져옵니다(import).

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol`는 이더가 없는 사용자도 블록체인을 사용할 수 있게 해주는 시스템인 [OpenGSN](https://www.opengsn.org/)을 사용하는 데 필요한 정의입니다. 이것은 이전 버전이므로 OpenGSN과 통합하려면 [이 튜토리얼을 사용하세요](https://docs.opengsn.org/javascript-client/tutorial.html).
- [SafeMath 라이브러리](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/)는 Solidity 버전 <strong>&lt;0.8.0</strong>에서 산술 오버플로/언더플로를 방지합니다. Solidity ≥0.8.0에서는 산술 연산이 오버플로/언더플로 시 자동으로 되돌리기(revert)를 수행하므로 SafeMath가 필요하지 않습니다. 이 컨트랙트는 이전 컴파일러 버전과의 이전 버전 호환성을 위해 SafeMath를 사용합니다.

&nbsp;

이 주석은 컨트랙트의 목적을 설명합니다.

```solidity
/**
 * @dev {IERC20} 인터페이스의 구현입니다.
 *
 * 이 구현은 토큰이 생성되는 방식에 구애받지 않습니다. 즉, 파생된 컨트랙트에서 {_mint}를 사용하여 공급 메커니즘을 추가해야 합니다.
 * 일반적인 메커니즘은 {ERC20PresetMinterPauser}를 참조하세요.
 *
 * 팁: 자세한 내용은 가이드를 참조하세요
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[공급 메커니즘 구현 방법].
 *
 * 우리는 일반적인 오픈제플린 가이드라인을 따랐습니다: 함수는 실패 시 `false`를 반환하는 대신 revert를 수행합니다. 그럼에도 불구하고 이러한 동작은 관례적이며 ERC-20 애플리케이션의 기대치와 충돌하지 않습니다.
 *
 * 또한 {transferFrom} 호출 시 {Approval} 이벤트가 발생합니다.
 * 이를 통해 애플리케이션은 해당 이벤트를 수신하는 것만으로 모든 계정에 대한 허용량을 재구성할 수 있습니다. 사양에서 요구하지 않기 때문에 EIP의 다른 구현은 이러한 이벤트를 발생시키지 않을 수 있습니다.
 *
 * 마지막으로, 허용량 설정과 관련된 잘 알려진 문제를 완화하기 위해 비표준 {decreaseAllowance} 및 {increaseAllowance}
 * 함수가 추가되었습니다. {IERC20-approve}를 참조하세요.
 */

```

### 컨트랙트 정의 {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

이 줄은 상속을 지정하며, 이 경우에는 위의 `IERC20`와 OpenGSN을 위한 `Context`에서 상속받습니다.

&nbsp;

```solidity

    using SafeMath for uint256;

```

이 줄은 `SafeMath` 라이브러리를 `uint256` 타입에 연결합니다. 이 라이브러리는 [여기](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol)에서 찾을 수 있습니다.

### 변수 정의 {#variable-definitions}

이러한 정의는 컨트랙트의 상태 변수를 지정합니다. 이 변수들은 `private`로 선언되지만, 이는 블록체인 상의 다른 컨트랙트가 이를 읽을 수 없다는 것만을 의미합니다. _블록체인에는 비밀이 없으며_, 모든 노드의 소프트웨어는 모든 블록에서 모든 컨트랙트의 상태를 가지고 있습니다. 관례적으로 상태 변수의 이름은 `_<something>`로 지정됩니다.

처음 두 변수는 [매핑(mappings)](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)으로, 키가 숫자 값이라는 점을 제외하면 [연관 배열(associative arrays)](https://wikipedia.org/wiki/Associative_array)과 거의 동일하게 작동합니다. 스토리지는 기본값(0)과 다른 값을 가진 항목에 대해서만 할당됩니다.

```solidity
    mapping (address => uint256) private _balances;
```

첫 번째 매핑인 `_balances`는 주소와 해당 주소의 이 토큰 잔액입니다. 잔액에 접근하려면 `_balances[<address>]` 구문을 사용합니다.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

이 변수 `_allowances`는 앞서 설명한 허용량을 저장합니다. 첫 번째 인덱스는 토큰의 소유자이고, 두 번째는 허용량을 가진 컨트랙트입니다. 주소 A가 주소 B의 계정에서 사용할 수 있는 금액에 접근하려면 `_allowances[B][A]`를 사용합니다.

&nbsp;

```solidity
    uint256 private _totalSupply;
```

이름에서 알 수 있듯이 이 변수는 토큰의 총 공급량을 추적합니다.

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

이 세 변수는 가독성을 높이는 데 사용됩니다. 처음 두 개는 설명이 필요 없지만 `_decimals`는 그렇지 않습니다.

한편으로 이더리움에는 부동 소수점이나 분수 변수가 없습니다. 다른 한편으로 사람들은 토큰을 나눌 수 있는 것을 좋아합니다. 사람들이 통화로 금을 선택한 이유 중 하나는 누군가 오리 한 마리 값어치의 소를 사고 싶어 할 때 거스름돈을 주기가 어려웠기 때문입니다.

해결책은 정수를 추적하되, 실제 토큰 대신 거의 가치가 없는 분수 토큰을 세는 것입니다. 이더의 경우 분수 토큰을 Wei라고 하며, 10^18 Wei는 1 ETH와 같습니다. 작성 당시 10,000,000,000,000 Wei는 약 1 미국 센트 또는 유로 센트입니다.

애플리케이션은 토큰 잔액을 표시하는 방법을 알아야 합니다. 사용자가 3,141,000,000,000,000,000 Wei를 가지고 있다면, 그것은 3.14 ETH일까요? 31.41 ETH일까요? 3,141 ETH일까요? 이더의 경우 1 ETH당 10^18 Wei로 정의되지만, 여러분의 토큰에 대해서는 다른 값을 선택할 수 있습니다. 토큰을 나누는 것이 의미가 없다면 `_decimals` 값을 0으로 사용할 수 있습니다. ETH와 동일한 표준을 사용하려면 <strong>18</strong>이라는 값을 사용하세요.

### 생성자 {#the-constructor}

```solidity
    /**
     * @dev {name} 및 {symbol}의 값을 설정하고, {decimals}를 기본값인 18로 초기화합니다.
     *
     * {decimals}에 다른 값을 선택하려면 {_setupDecimals}를 사용하세요.
     *
     * 이 세 가지 값은 모두 불변입니다: 생성자 실행 중에 한 번만 설정할 수 있습니다.
     */
    constructor (string memory name_, string memory symbol_) public {
        // Solidity ≥0.7.0에서는 'public'이 암시적이므로 생략할 수 있습니다.

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

생성자는 컨트랙트가 처음 생성될 때 호출됩니다. 관례적으로 함수 매개변수의 이름은 `<something>_`로 지정됩니다.

### 사용자 인터페이스 함수 {#user-interface-functions}

```solidity
    /**
     * @dev 토큰의 이름을 반환합니다.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev 토큰의 심볼을 반환하며, 일반적으로 이름의 짧은 버전입니다.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev 사용자 표현을 얻기 위해 사용되는 소수점 이하 자릿수를 반환합니다.
     * 예를 들어, `decimals`가 `2`인 경우 `505` 토큰의 잔액은 사용자에게 `5,05` (`505 / 10 ** 2`)로 표시되어야 합니다.
     *
     * 토큰은 일반적으로 이더와 Wei의 관계를 모방하여 18의 값을 선택합니다. {_setupDecimals}가 호출되지 않는 한 이 값은 {ERC20}이 사용하는 값입니다.
     *
     * 참고: 이 정보는 _표시_ 목적으로만 사용됩니다: {IERC20-balanceOf} 및 {IERC20-transfer}를 포함하여 컨트랙트의 산술 연산에는 전혀 영향을 미치지 않습니다.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

이러한 함수인 `name`, `symbol`, `decimals`는 사용자 인터페이스가 컨트랙트에 대해 알 수 있도록 도와주어 제대로 표시할 수 있게 해줍니다.

반환 타입은 `string memory`이며, 이는 메모리에 저장된 문자열을 반환함을 의미합니다. 문자열과 같은 변수는 세 곳에 저장될 수 있습니다.

| | 수명 | 컨트랙트 접근 | 가스 비용 |
| -------- | ------------- | --------------- | -------------------------------------------------------------- |
| Memory | 함수 호출 | 읽기/쓰기 | 수십 또는 수백 (위치가 높을수록 더 높음) |
| Calldata | 함수 호출 | 읽기 전용 | 반환 타입으로 사용할 수 없으며, 함수 매개변수 타입으로만 사용 가능 |
| Storage | 변경될 때까지 | 읽기/쓰기 | 높음 (읽기 800, 쓰기 20k) |

이 경우 `memory`가 최선의 선택입니다.

### 토큰 정보 읽기 {#read-token-information}

이들은 총 공급량이나 계정의 잔액 등 토큰에 대한 정보를 제공하는 함수입니다.

```solidity
    /**
     * @dev {IERC20-totalSupply}를 참조하세요.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

`totalSupply` 함수는 토큰의 총 공급량을 반환합니다.

&nbsp;

```solidity
    /**
     * @dev {IERC20-balanceOf}를 참조하세요.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

계정의 잔액을 읽습니다. 누구나 다른 사람의 계정 잔액을 가져올 수 있다는 점에 유의하세요. 어차피 모든 노드에서 사용할 수 있기 때문에 이 정보를 숨기려고 하는 것은 의미가 없습니다. _블록체인에는 비밀이 없습니다._

### 토큰 전송 {#transfer-tokens}

```solidity
    /**
     * @dev {IERC20-transfer}를 참조하세요.
     *
     * 요구 사항:
     *
     * - `recipient`는 제로 주소일 수 없습니다.
     * - 호출자는 최소한 `amount`만큼의 잔액을 가지고 있어야 합니다.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

`transfer` 함수는 발신자의 계정에서 다른 계정으로 토큰을 전송하기 위해 호출됩니다. 불리언(boolean) 값을 반환하지만 그 값은 항상 <strong>true</strong>라는 점에 유의하세요. 전송이 실패하면 컨트랙트는 호출을 되돌리기(revert)합니다.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

`_transfer` 함수가 실제 작업을 수행합니다. 이 함수는 다른 컨트랙트 함수에서만 호출할 수 있는 프라이빗(private) 함수입니다. 관례적으로 프라이빗 함수는 상태 변수와 마찬가지로 `_<something>`로 이름이 지정됩니다.

일반적으로 Solidity에서는 메시지 발신자에 대해 `msg.sender`를 사용합니다. 하지만 이는 [OpenGSN](https://opengsn.org/)을 손상시킵니다. 토큰으로 이더 없는 트랜잭션을 허용하려면 `_msgSender()`를 사용해야 합니다. 일반 트랜잭션의 경우 `msg.sender`를 반환하지만, 이더 없는 트랜잭션의 경우 메시지를 중계한 컨트랙트가 아닌 원래 서명자를 반환합니다.

### 허용량 함수 {#allowance-functions}

이들은 허용량 기능을 구현하는 함수인 `allowance`, `approve`, `transferFrom`, `_approve`입니다. 또한 오픈제플린 구현은 기본 표준을 넘어 보안을 향상시키는 몇 가지 기능인 `increaseAllowance` 및 `decreaseAllowance`를 포함합니다.

#### allowance 함수 {#allowance}

```solidity
    /**
     * @dev {IERC20-allowance}를 참조하세요.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

`allowance` 함수를 사용하면 누구나 허용량을 확인할 수 있습니다.

#### approve 함수 {#approve}

```solidity
    /**
     * @dev {IERC20-approve}를 참조하세요.
     *
     * 요구 사항:
     *
     * - `spender`는 제로 주소일 수 없습니다.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

이 함수는 허용량을 생성하기 위해 호출됩니다. 위의 `transfer` 함수와 유사합니다.

- 이 함수는 실제 작업을 수행하는 내부 함수(이 경우 `_approve`)를 호출하기만 합니다.
- 이 함수는 `true`를 반환하거나(성공 시) 되돌리기(revert)를 수행합니다(실패 시).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

상태 변경이 발생하는 위치의 수를 최소화하기 위해 내부 함수를 사용합니다. 상태를 변경하는 _모든_ 함수는 보안 감사가 필요한 잠재적인 보안 위험입니다. 이렇게 하면 오류가 발생할 가능성이 줄어듭니다.

#### transferFrom 함수 {#transferfrom}

이것은 사용자가 허용량을 사용하기 위해 호출하는 함수입니다. 이를 위해서는 사용 중인 금액을 전송하고 해당 금액만큼 허용량을 줄이는 두 가지 작업이 필요합니다.

```solidity
    /**
     * @dev {IERC20-transferFrom}을 참조하세요.
     *
     * 업데이트된 허용량을 나타내는 {Approval} 이벤트를 발생시킵니다. 이는 EIP에서 요구하지 않습니다. {ERC20}의 시작 부분에 있는 참고 사항을 참조하세요.
     *
     * 요구 사항:
     *
     * - `sender` 및 `recipient`는 제로 주소일 수 없습니다.
     * - `sender`는 최소한 `amount`만큼의 잔액을 가지고 있어야 합니다.
     * - 호출자는 ``sender``의 토큰에 대해 최소한 `amount`만큼의 허용량을 가지고 있어야 합니다.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

`a.sub(b, "message")` 함수 호출은 두 가지 작업을 수행합니다. 첫째, 새로운 허용량인 `a-b`를 계산합니다. 둘째, 이 결과가 음수가 아닌지 확인합니다. 음수인 경우 제공된 메시지와 함께 호출이 되돌리기(revert)됩니다. 호출이 되돌려질 때 해당 호출 중에 이전에 수행된 모든 처리는 무시되므로 `_transfer`를 실행 취소할 필요가 없다는 점에 유의하세요.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### 오픈제플린 안전성 추가 기능 {#openzeppelin-safety-additions}

0이 아닌 허용량을 다른 0이 아닌 값으로 설정하는 것은 위험합니다. 왜냐하면 자신의 트랜잭션 순서만 제어할 수 있을 뿐 다른 사람의 트랜잭션 순서는 제어할 수 없기 때문입니다. 순진한 앨리스(Alice)와 정직하지 않은 빌(Bill)이라는 두 사용자가 있다고 상상해 보세요. 앨리스는 빌에게 어떤 서비스를 원하고, 그 비용이 5개의 토큰이라고 생각하여 빌에게 5개 토큰의 허용량을 줍니다.

그러다 상황이 바뀌어 빌의 가격이 10개의 토큰으로 오릅니다. 여전히 서비스를 원하는 앨리스는 빌의 허용량을 10으로 설정하는 트랜잭션을 보냅니다. 빌은 트랜잭션 풀에서 이 새로운 트랜잭션을 보는 순간 앨리스의 토큰 5개를 사용하고 가스 가격이 훨씬 높아 더 빨리 채굴될 트랜잭션을 보냅니다. 그런 식으로 빌은 먼저 5개의 토큰을 사용한 다음, 앨리스의 새로운 허용량이 채굴되면 10개를 더 사용하여 앨리스가 승인하려던 것보다 많은 총 15개의 토큰을 사용할 수 있습니다. 이 기술을 [프론트러닝](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running)이라고 합니다.

| 앨리스 트랜잭션 | 앨리스 논스 | 빌 트랜잭션 | 빌 논스 | 빌의 허용량 | 앨리스로부터 얻은 빌의 총 수입 |
| ----------------- | ----------- | ----------------------------- | ---------- | ---------------- | ---------------------------- |
| approve(Bill, 5) | 10 | | | 5 | 0 |
| | | transferFrom(Alice, Bill, 5) | 10,123 | 0 | 5 |
| approve(Bill, 10) | 11 | | | 10 | 5 |
| | | transferFrom(Alice, Bill, 10) | 10,124 | 0 | 15 |

이 문제를 피하기 위해 이 두 함수(`increaseAllowance` 및 `decreaseAllowance`)를 사용하면 특정 금액만큼 허용량을 수정할 수 있습니다. 따라서 빌이 이미 5개의 토큰을 사용했다면 5개만 더 사용할 수 있게 됩니다. 타이밍에 따라 두 가지 방식으로 작동할 수 있으며, 두 경우 모두 빌은 10개의 토큰만 얻게 됩니다.

A:

| 앨리스 트랜잭션 | 앨리스 논스 | 빌 트랜잭션 | 빌 논스 | 빌의 허용량 | 앨리스로부터 얻은 빌의 총 수입 |
| -------------------------- | ----------: | ---------------------------- | ---------: | ---------------: | ---------------------------- |
| approve(Bill, 5) | 10 | | | 5 | 0 |
| | | transferFrom(Alice, Bill, 5) | 10,123 | 0 | 5 |
| increaseAllowance(Bill, 5) | 11 | | | 0+5 = 5 | 5 |
| | | transferFrom(Alice, Bill, 5) | 10,124 | 0 | 10 |

B:

| 앨리스 트랜잭션 | 앨리스 논스 | 빌 트랜잭션 | 빌 논스 | 빌의 허용량 | 앨리스로부터 얻은 빌의 총 수입 |
| -------------------------- | ----------: | ----------------------------- | ---------: | ---------------: | ---------------------------: |
| approve(Bill, 5) | 10 | | | 5 | 0 |
| increaseAllowance(Bill, 5) | 11 | | | 5+5 = 10 | 0 |
| | | transferFrom(Alice, Bill, 10) | 10,124 | 0 | 10 |

```solidity
    /**
     * @dev 호출자가 `spender`에게 부여한 허용량을 원자적으로 증가시킵니다.
     *
     * 이는 {IERC20-approve}에 설명된 문제에 대한 완화책으로 사용할 수 있는 {approve}의 대안입니다.
     *
     * 업데이트된 허용량을 나타내는 {Approval} 이벤트를 발생시킵니다.
     *
     * 요구 사항:
     *
     * - `spender`는 제로 주소일 수 없습니다.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

`a.add(b)` 함수는 안전한 덧셈입니다. `a`+`b`>=`2^256`인 드문 경우에도 일반적인 덧셈처럼 래핑(wrap around)되지 않습니다.

```solidity

    /**
     * @dev 호출자가 `spender`에게 부여한 허용량을 원자적으로 감소시킵니다.
     *
     * 이는 {IERC20-approve}에 설명된 문제에 대한 완화책으로 사용할 수 있는 {approve}의 대안입니다.
     *
     * 업데이트된 허용량을 나타내는 {Approval} 이벤트를 발생시킵니다.
     *
     * 요구 사항:
     *
     * - `spender`는 제로 주소일 수 없습니다.
     * - `spender`는 호출자에 대해 최소한 `subtractedValue`만큼의 허용량을 가지고 있어야 합니다.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### 토큰 정보를 수정하는 함수 {#functions-that-modify-token-information}

실제 작업을 수행하는 네 가지 함수는 `_transfer`, `_mint`, `_burn`, `_approve`입니다.

#### _transfer 함수 {#transfer}

```solidity
    /**
     * @dev `sender`에서 `recipient`로 `amount`만큼의 토큰을 전송합니다.
     *
     * 이 내부 함수는 {transfer}와 동일하며, 예를 들어 자동 토큰 수수료, 슬래싱 메커니즘 등을 구현하는 데 사용할 수 있습니다.
     *
     * {Transfer} 이벤트를 발생시킵니다.
     *
     * 요구 사항:
     *
     * - `sender`는 제로 주소일 수 없습니다.
     * - `recipient`는 제로 주소일 수 없습니다.
     * - `sender`는 최소한 `amount`만큼의 잔액을 가지고 있어야 합니다.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

이 함수 `_transfer`는 한 계정에서 다른 계정으로 토큰을 전송합니다. `transfer`(발신자 자신의 계정에서 전송하는 경우) 및 `transferFrom`(허용량을 사용하여 다른 사람의 계정에서 전송하는 경우) 모두에서 호출됩니다.

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

이더리움에서 제로 주소를 실제로 소유한 사람은 아무도 없습니다(즉, 일치하는 공개키가 제로 주소로 변환되는 개인 키를 아는 사람은 아무도 없습니다). 사람들이 해당 주소를 사용할 때는 대개 소프트웨어 버그이므로, 제로 주소가 발신자나 수신자로 사용되면 실패 처리합니다.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

이 컨트랙트를 사용하는 방법에는 두 가지가 있습니다.

1. 자체 코드를 위한 템플릿으로 사용
1. [이를 상속](https://www.bitdegree.org/learn/solidity-inheritance)하고 수정해야 하는 함수만 재정의(override)

오픈제플린 ERC-20 코드는 이미 감사를 거쳐 안전한 것으로 입증되었기 때문에 두 번째 방법이 훨씬 좋습니다. 상속을 사용하면 수정하는 함수가 무엇인지 명확해지며, 사람들은 컨트랙트를 신뢰하기 위해 해당 특정 함수만 감사하면 됩니다.

토큰의 소유자가 바뀔 때마다 함수를 수행하는 것이 유용한 경우가 많습니다. 하지만 `_transfer`는 매우 중요한 함수이며 안전하지 않게 작성될 가능성이 있으므로(아래 참조) 재정의하지 않는 것이 가장 좋습니다. 해결책은 [훅(hook) 함수](https://wikipedia.org/wiki/Hooking)인 `_beforeTokenTransfer`입니다. 이 함수를 재정의할 수 있으며, 각 전송 시 호출됩니다.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

이 줄들이 실제로 전송을 수행합니다. 이들 사이에는 **아무것도** 없으며, 수신자에게 추가하기 전에 발신자에게서 전송된 금액을 뺀다는 점에 유의하세요. 중간에 다른 컨트랙트에 대한 호출이 있었다면 이 컨트랙트를 속이는 데 사용될 수 있었기 때문에 이는 중요합니다. 이렇게 하면 전송이 원자적(atomic)이 되어 중간에 아무 일도 일어날 수 없습니다.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

마지막으로 `Transfer` 이벤트를 발생시킵니다. 스마트 컨트랙트는 이벤트에 접근할 수 없지만, 블록체인 외부에서 실행되는 코드는 이벤트를 수신하고 이에 반응할 수 있습니다. 예를 들어, 지갑은 소유자가 언제 더 많은 토큰을 얻는지 추적할 수 있습니다.

#### _mint 및 _burn 함수 {#mint-and-burn}

이 두 함수(`_mint` 및 `_burn`)는 토큰의 총 공급량을 수정합니다. 이들은 내부 함수이며 이 컨트랙트에는 이들을 호출하는 함수가 없으므로, 컨트랙트를 상속하고 어떤 조건에서 새 토큰을 발행하거나 기존 토큰을 소각할지 결정하는 자체 로직을 추가하는 경우에만 유용합니다.

**참고:** 모든 ERC-20 토큰에는 토큰 관리를 지시하는 자체 비즈니스 로직이 있습니다. 예를 들어, 고정 공급 컨트랙트는 생성자에서만 `_mint`을 호출하고 `_burn`는 절대 호출하지 않을 수 있습니다. 토큰을 판매하는 컨트랙트는 지불을 받을 때 `_mint`을 호출하고, 통제 불능의 인플레이션을 피하기 위해 어느 시점에는 `_burn`를 호출할 것입니다.

```solidity
    /** @dev `amount`만큼의 토큰을 생성하고 이를 `account`에 할당하여 총 공급량을 늘립니다.
     *
     * `from`이 제로 주소로 설정된 {Transfer} 이벤트를 발생시킵니다.
     *
     * 요구 사항:
     *
     * - `to`는 제로 주소일 수 없습니다.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

토큰의 총 개수가 변경될 때 `_totalSupply`를 반드시 업데이트하세요.

&nbsp;

```solidity
    /**
     * @dev `account`에서 `amount`만큼의 토큰을 파기하여 총 공급량을 줄입니다.
     *
     * `to`가 제로 주소로 설정된 {Transfer} 이벤트를 발생시킵니다.
     *
     * 요구 사항:
     *
     * - `account`는 제로 주소일 수 없습니다.
     * - `account`는 최소한 `amount`만큼의 토큰을 가지고 있어야 합니다.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

`_burn` 함수는 반대 방향으로 진행된다는 점을 제외하면 `_mint`과 거의 동일합니다.

#### _approve 함수 {#approve-2}

이것은 실제로 허용량을 지정하는 함수입니다. 소유자가 현재 잔액보다 높은 허용량을 지정할 수 있다는 점에 유의하세요. 전송 시점에 잔액을 확인하며, 이때의 잔액은 허용량이 생성될 때의 잔액과 다를 수 있으므로 이는 괜찮습니다.

```solidity
    /**
     * @dev `owner`의 토큰에 대해 `spender`의 허용량으로 `amount`를 설정합니다.
     *
     * 이 내부 함수는 `approve`와 동일하며, 예를 들어 특정 하위 시스템에 대한 자동 허용량 설정 등에 사용할 수 있습니다.
     *
     * {Approval} 이벤트를 발생시킵니다.
     *
     * 요구 사항:
     *
     * - `owner`는 제로 주소일 수 없습니다.
     * - `spender`는 제로 주소일 수 없습니다.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

`Approval` 이벤트를 발생시킵니다. 애플리케이션이 작성된 방식에 따라, 소유자나 이러한 이벤트를 수신하는 서버가 사용자 컨트랙트에 승인에 대해 알려줄 수 있습니다.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Decimals 변수 수정 {#modify-the-decimals-variable}

```solidity


    /**
     * @dev {decimals}를 기본값인 18이 아닌 다른 값으로 설정합니다.
     *
     * 경고: 이 함수는 생성자에서만 호출되어야 합니다. 토큰 컨트랙트와 상호작용하는 대부분의 애플리케이션은 {decimals}가 변경될 것이라고 예상하지 않으며, 변경될 경우 잘못 작동할 수 있습니다.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

이 함수는 사용자 인터페이스에 금액을 해석하는 방법을 알려주는 데 사용되는 `_decimals` 변수를 수정합니다. 생성자에서 이를 호출해야 합니다. 그 이후의 시점에 이를 호출하는 것은 정직하지 못한 일이며, 애플리케이션은 이를 처리하도록 설계되지 않았습니다.

### 훅(Hooks) {#hooks}

```solidity

    /**
     * @dev 토큰 전송 전에 호출되는 훅(Hook)입니다. 여기에는 발행 및 소각이 포함됩니다.
     *
     * 호출 조건:
     *
     * - `from`과 `to`가 모두 0이 아닐 때, ``from``의 토큰 `amount`만큼이 `to`로 전송됩니다.
     * - `from`이 0일 때, `to`를 위해 `amount`만큼의 토큰이 발행됩니다.
     * - `to`가 0일 때, ``from``의 토큰 `amount`만큼이 소각됩니다.
     * - `from`과 `to`는 결코 둘 다 0이 될 수 없습니다.
     *
     * 훅에 대해 자세히 알아보려면 xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks]를 참조하세요.
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

이것은 전송 중에 호출되는 훅 함수입니다. 여기서는 비어 있지만, 무언가를 수행해야 하는 경우 재정의하기만 하면 됩니다.

## 결론 {#conclusion}

복습을 위해 이 컨트랙트에서 가장 중요한 몇 가지 아이디어를 소개합니다(제 의견이며, 여러분의 의견은 다를 수 있습니다).

- _블록체인에는 비밀이 없습니다_. 스마트 컨트랙트가 접근할 수 있는 모든 정보는 전 세계 누구나 사용할 수 있습니다.
- 자신의 트랜잭션 순서는 제어할 수 있지만 다른 사람의 트랜잭션이 언제 발생하는지는 제어할 수 없습니다. 이것이 허용량을 변경하는 것이 위험할 수 있는 이유인데, 사용자가 두 허용량의 합계를 사용할 수 있게 되기 때문입니다.
- `uint256` 타입의 값은 래핑(wrap around)됩니다. 즉, <em>0-1=2^256-1</em>입니다. 이것이 원하는 동작이 아니라면 이를 확인해야 합니다(또는 이를 대신 수행해 주는 SafeMath 라이브러리를 사용해야 합니다). 이는 [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html)에서 변경되었다는 점에 유의하세요.
- 감사를 더 쉽게 만들기 위해 특정 타입의 모든 상태 변경을 특정 위치에서 수행하세요. 이것이 예를 들어 `approve`, `transferFrom`, `increaseAllowance`, `decreaseAllowance`에 의해 호출되는 `_approve`가 있는 이유입니다.
- 상태 변경은 중간에 다른 작업 없이 원자적(atomic)이어야 합니다(`_transfer`에서 볼 수 있듯이). 상태 변경 중에는 일관성 없는 상태가 되기 때문입니다. 예를 들어, 발신자의 잔액에서 차감하는 시점과 수신자의 잔액에 추가하는 시점 사이에는 존재해야 하는 것보다 적은 토큰이 존재합니다. 그 사이에 연산이 있는 경우, 특히 다른 컨트랙트에 대한 호출이 있는 경우 잠재적으로 악용될 수 있습니다.

이제 오픈제플린 ERC-20 컨트랙트가 어떻게 작성되는지, 특히 어떻게 더 안전하게 만들어지는지 살펴보았으니, 여러분만의 안전한 컨트랙트와 애플리케이션을 작성해 보세요.

[제 작업물은 여기에서 더 볼 수 있습니다](https://cryptodocguy.pro/).