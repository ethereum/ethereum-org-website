---
title: "ERC-20 계약 살펴보기"
description: "OpenZeppelin ERC-20 계약에는 무엇이 있으며 왜 사용될까요?"
author: Ori Pomerantz
lang: ko
tags: [ "솔리디티", "erc-20" ]
skill: beginner
published: 2021-03-09
---

## 소개 {#introduction}

이더리움이 사용되는 대표적인 곳 중 하나는 거래 가능한 토큰을 만드는 그룹입니다. 거래 가능한 토큰은 자체 통화라고도 불립니다. 이러한 토큰은 일반적으로 [ERC-20](/developers/docs/standards/tokens/erc-20/) 표준을 따릅니다. 이 표준을 통해 모든 ERC-20 토큰에서 작동하는 유동성 풀이나 지갑 같은 도구를 작성할 수 있습니다. 이 글에서는 [OpenZeppelin 솔리디티 ERC20 구현](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)과 [인터페이스 정의](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)에 대해 분석해 보겠습니다.

이 문서에 나오는 소스 코드는 주석을 포함합니다. ERC-20을 구현하고 싶다면 [이 튜토리얼을 읽어보세요](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## 인터페이스 {#the-interface}

ERC-20과 같은 표준의 목적은 지갑 및 탈중앙화 거래소와 같은 애플리케이션 전반에서 상호 운용 가능한 많은 토큰 구현을 허용하는 것입니다. 이를 위해 [인터페이스](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/)를 만듭니다. 토큰 계약을 사용해야 하는 코드는 인터페이스에서 동일한 정의를 사용하여 이를 사용하는 모든 토큰 계약과 호환될 수 있습니다. MetaMask와 같은 지갑이든, etherscan.io와 같은 탈중앙화앱이든, 유동성 풀과 같은 다른 계약이든 상관없습니다.

![ERC-20 인터페이스 그림](erc20_interface.png)

숙련된 프로그래머라면 [Java](https://www.w3schools.com/java/java_interface.asp)나 [C 헤더 파일](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html)에서 비슷한 구조를 본 기억이 있을 것입니다.

이것은 OpenZeppelin의 [ERC-20 인터페이스](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)에 대한 정의입니다. 이는 [사람이 읽을 수 있는 표준](https://eips.ethereum.org/EIPS/eip-20)을 솔리디티 코드로 번역한 것입니다. 물론 인터페이스 자체가 무언가를 _어떻게_ 해야 하는지 정의하지는 않습니다. 이는 아래 계약 소스 코드에 설명되어 있습니다.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

솔리디티 파일은 라이선스 식별자를 포함해야 합니다. [여기에서 라이선스 목록을 볼 수 있습니다](https://spdx.org/licenses/). 다른 라이선스가 필요한 경우 주석에 설명하면 됩니다.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

솔리디티 언어는 여전히 빠르게 발전하고 있으며, 새 버전은 이전 코드와 호환되지 않을 수 있습니다([여기 참조](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). 따라서 언어의 최소 버전뿐만 아니라 코드를 테스트한 최신 버전인 최대 버전도 지정하는 것이 좋습니다.

&nbsp;

```solidity
/**
 * @dev EIP에 정의된 ERC20 표준의 인터페이스입니다.
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

이 함수는 `external`이며, 이는 [계약 외부에서만 호출할 수 있음](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2)을 의미합니다.
계약에 있는 토큰의 총공급량을 반환합니다. 이 값은 이더리움에서 가장 일반적인 유형인 부호 없는 256비트를 사용하여 반환됩니다(256비트는 EVM의 기본 워드 크기임). 이 함수는 또한 `view` 함수인데, 이는 상태를 변경하지 않으므로 블록체인의 모든 노드에서 실행하는 대신 단일 노드에서 실행할 수 있음을 의미합니다. 이러한 종류의 함수는 트랜잭션을 생성하지 않으며 [가스](/developers/docs/gas/)가 들지 않습니다.

**참고:** 이론적으로 계약 생성자가 실제 값보다 적은 총공급량을 반환하여 각 토큰이 실제보다 더 가치 있는 것처럼 보이게 속일 수 있는 것처럼 보일 수 있습니다. 그러나 그 두려움은 블록체인의 진정한 본질을 무시하는 것입니다. 블록체인에서 일어나는 모든 일은 모든 노드에서 검증할 수 있습니다. 이를 위해 모든 계약의 기계어 코드와 저장 공간은 모든 노드에서 사용할 수 있습니다. 계약에 대한 솔리디티 코드를 공개할 필요는 없지만, 소스 코드와 컴파일된 솔리디티 버전을 공개하지 않으면 누구도 진지하게 받아들이지 않을 것입니다. 그래야 제공한 기계어 코드와 대조하여 검증할 수 있기 때문입니다.
예를 들어, [이 계약](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract)을 참조하세요.

&nbsp;

```solidity
    /**
     * @dev `account`가 소유한 토큰의 양을 반환합니다.
     */
    function balanceOf(address account) external view returns (uint256);
```

이름에서 알 수 있듯이, `balanceOf`는 계정의 잔액을 반환합니다. 이더리움 계정은 솔리디티에서 160비트를 보유하는 `address` 유형을 사용하여 식별됩니다.
이 함수 또한 `external` 및 `view`입니다.

&nbsp;

```solidity
    /**
     * @dev 호출자 계정에서 `recipient`로 `amount` 만큼의 토큰을 이동시킵니다.
     *
     * 작업 성공 여부를 나타내는 불리언 값을 반환합니다.
     *
     * {Transfer} 이벤트를 발생시킵니다.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

`transfer` 함수는 호출자로부터 다른 주소로 토큰을 전송합니다. 이는 상태 변경을 포함하므로 `view`가 아닙니다.
사용자가 이 함수를 호출하면 트랜잭션이 생성되고 가스가 소모됩니다. 또한 `Transfer` 이벤트를 발생시켜 블록체인의 모든 사람에게 해당 이벤트를 알립니다.

이 함수는 두 가지 다른 유형의 호출자에 대해 두 가지 유형의 출력을 가집니다.

- 사용자 인터페이스에서 직접 함수를 호출하는 사용자. 일반적으로 사용자는 트랜잭션을 제출하고 응답을 기다리지 않는데, 이는 무기한의 시간이 걸릴 수 있습니다. 사용자는 트랜잭션 영수증(트랜잭션 해시로 식별됨)을 찾거나 `Transfer` 이벤트를 찾아 무슨 일이 일어났는지 확인할 수 있습니다.
- 전체 트랜잭션의 일부로 함수를 호출하는 다른 계약. 이러한 계약은 동일한 트랜잭션에서 실행되기 때문에 즉시 결과를 얻으므로 함수 반환 값을 사용할 수 있습니다.

계약의 상태를 변경하는 다른 함수에 의해서도 동일한 유형의 출력이 생성됩니다.

&nbsp;

허용량을 사용하면 계정이 다른 소유자에게 속한 일부 토큰을 사용할 수 있습니다.
예를 들어 판매자 역할을 하는 계약에 유용합니다. 계약은 이벤트를 모니터링할 수 없으므로 구매자가 판매자 계약으로 직접 토큰을 전송하면 해당 계약은 지불되었는지 알 수 없습니다. 대신, 구매자는 판매자 계약이 특정 금액을 사용하도록 허용하고 판매자는 해당 금액을 전송합니다.
이는 판매자 계약이 호출하는 함수를 통해 수행되므로 판매자 계약은 성공 여부를 알 수 있습니다.

```solidity
    /**
     * @dev {transferFrom}을 통해 `spender`가 `owner`를 대신하여 사용할 수 있도록 허용된 나머지 토큰 수를 반환합니다. 기본값은 0입니다.
     *
     * {approve} 또는 {transferFrom}이 호출되면 이 값이 변경됩니다.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

`allowance` 함수를 사용하면 누구나 한 주소(`owner`)가 다른 주소(`spender`)에게 허용한 허용량이 얼마인지 조회할 수 있습니다.

&nbsp;

```solidity
    /**
     * @dev 호출자의 토큰에 대한 `spender`의 허용량으로 `amount`를 설정합니다.
     *
     * 작업 성공 여부를 나타내는 불리언 값을 반환합니다.
     *
     * 중요: 이 방법으로 허용량을 변경하면 불행한
     * 트랜잭션 순서로 인해 누군가 이전 허용량과 새 허용량을 모두 사용할 수 있는 위험이 따릅니다. 이 경쟁
     * 조건을 완화하기 위한 한 가지 가능한 해결책은 먼저 지출자의 허용량을 0으로 줄이고 그 후에
     * 원하는 값을 설정하는 것입니다:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * {Approval} 이벤트를 발생시킵니다.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

`approve` 함수는 허용량을 생성합니다. 이 함수가 어떻게 남용될 수 있는지에 대한 메시지를 반드시 읽어보세요. 이더리움에서는 자신의 트랜잭션 순서는 제어할 수 있지만, 상대방의 트랜잭션이 발생한 것을 보기 전까지는 자신의 트랜잭션을 제출하지 않는 한 다른 사람의 트랜잭션이 실행되는 순서는 제어할 수 없습니다.

&nbsp;

```solidity
    /**
     * @dev 허용량 메커니즘을 사용하여 `sender`에서 `recipient`로 `amount` 토큰을 이동합니다. 그러면 호출자의
     * 허용량에서 `amount`가 차감됩니다.
     *
     * 작업 성공 여부를 나타내는 불리언 값을 반환합니다.
     *
     * {Transfer} 이벤트를 발생시킵니다.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

마지막으로 지출자는 `transferFrom`을 사용하여 실제로 허용량을 사용합니다.

&nbsp;

```solidity

    /**
     * @dev `value` 토큰이 한 계정(`from`)에서
     * 다른 계정(`to`)으로 이동할 때 발생합니다.
     *
     * `value`는 0일 수 있다는 점에 유의하세요.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev {approve}를 호출하여 `owner`의 `spender`에 대한 허용 한도를
     * 설정할 때 발생합니다. `value`는 새로운 허용 한도입니다.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

이러한 이벤트는 ERC-20 컨트랙트의 상태가 변경될 때 발생합니다.

## 실제 컨트랙트 {#the-actual-contract}

이는 ERC-20 표준을 구현하는 실제 컨트랙트이며,
[여기](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)에서 가져왔습니다.
있는 그대로 사용하기 위한 것은 아니지만,
여기에서 [상속](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm)하여 사용 가능한 것으로 확장할 수 있습니다.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### 가져오기 구문 {#import-statements}

위의 인터페이스 정의 외에도 컨트랙트 정의는 두 개의 다른 파일을 가져옵니다:

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol`은 이더가 없는 사용자가 블록체인을 사용할 수 있도록 하는 시스템인 [OpenGSN](https://www.opengsn.org/)을 사용하기 위해 필요한 정의입니다. 이것은 이전 버전이므로 OpenGSN과 통합하려면
  [이 튜토리얼](https://docs.opengsn.org/javascript-client/tutorial.html)을 사용하세요.
- [SafeMath 라이브러리](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/)는 **&lt;0.8.0** 버전의 솔리디티에서 산술 오버플로우/언더플로우를 방지합니다. 솔리디티 ≥0.8.0에서는 산술 연산이 오버플로우/언더플로우 시 자동으로 되돌려지므로 SafeMath가 불필요합니다. 이 컨트랙트는 이전 컴파일러 버전과의 하위 호환성을 위해 SafeMath를 사용합니다.

&nbsp;

이 주석은 컨트랙트의 목적을 설명합니다.

```solidity
/**
 * @dev {IERC20} 인터페이스의 구현입니다.
 *
 * 이 구현은 토큰 생성 방식과 무관합니다. 즉, {_mint}를 사용하여
 * 파생된 컨트랙트에 공급 메커니즘을 추가해야 함을 의미합니다.
 * 일반적인 메커니즘은 {ERC20PresetMinterPauser}를 참조하세요.
 *
 * 팁: 자세한 내용은 가이드
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[공급 메커니즘 구현 방법]을 참조하세요.
 *
 * 일반적인 OpenZeppelin 가이드라인을 따랐습니다. 함수는 실패 시 `false`를 반환하는 대신
 * 되돌려집니다. 이 동작은 관례적이며 ERC20 애플리케이션의
 * 기대와 충돌하지 않습니다.
 *
 * 또한 {transferFrom}을 호출하면 {Approval} 이벤트가 발생합니다.
 * 이를 통해 애플리케이션은 해당 이벤트를 수신하는 것만으로 모든 계정의 허용량을
 * 재구성할 수 있습니다. EIP의 다른 구현에서는 사양에 요구되지 않으므로
 * 이러한 이벤트를 발생시키지 않을 수 있습니다.
 *
 * 마지막으로, 허용량 설정과 관련된 잘 알려진 문제를 완화하기 위해
 * 비표준 {decreaseAllowance} 및 {increaseAllowance}
 * 함수가 추가되었습니다. {IERC20-approve}를 참조하세요.
 */

```

### 컨트랙트 정의 {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

이 줄은 상속을 지정하며, 이 경우 OpenGSN을 위해 위에서 설명한 `IERC20` 및 `Context`로부터 상속받습니다.

&nbsp;

```solidity

    using SafeMath for uint256;

```

이 줄은 `SafeMath` 라이브러리를 `uint256` 유형에 연결합니다. 이 라이브러리는
[여기](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol)에서 찾을 수 있습니다.

### 변수 정의 {#variable-definitions}

이 정의는 컨트랙트의 상태 변수를 지정합니다. 이 변수들은 `private`으로 선언되었지만,
이는 블록체인의 다른 컨트랙트가 이를 읽을 수 없다는 것을 의미할 뿐입니다. _블록체인에는
비밀이 없습니다_. 모든 노드의 소프트웨어는 모든 블록에서 모든 컨트랙트의 상태를 가집니다. 관례적으로, 상태 변수는 `_<무엇인가>`로 명명됩니다.

처음 두 변수는 [매핑](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)으로,
키가 숫자 값이라는 점을 제외하고 [연관 배열](https://wikipedia.org/wiki/Associative_array)과 거의 동일하게 작동합니다. 저장 공간은 기본값(0)과 다른 값을 가진 항목에 대해서만 할당됩니다.

```solidity
    mapping (address => uint256) private _balances;
```

첫 번째 매핑인 `_balances`는 주소와 해당 토큰의 잔액입니다. 잔액에 접근하려면
`_balances[<주소>]` 구문을 사용합니다.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

이 변수 `_allowances`는 앞서 설명한 허용량을 저장합니다. 첫 번째 인덱스는 토큰의 소유자이며,
두 번째 인덱스는 허용량이 부여된 컨트랙트입니다. 주소 A가 주소 B의 계정에서 사용할 수 있는
금액에 접근하려면 `_allowances[B][A]`를 사용합니다.

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

이 세 가지 변수는 가독성을 높이기 위해 사용됩니다. 처음 두 개는 그 자체로 설명이 되지만, `_decimals`는 그렇지 않습니다.

한편, 이더리움에는 부동 소수점이나 분수 변수가 없습니다. 반면에
인간은 토큰을 나눌 수 있기를 원합니다. 사람들이 금을 화폐로 정착시킨 한 가지 이유는 누군가 소 한 마리의 가치로 오리 한 마리를 사려고 할 때 거스름돈을 만들기 어려웠기 때문입니다.

해결책은 정수를 추적하되, 실제 토큰 대신 거의 가치가 없는
부분 토큰을 세는 것입니다. 이더의 경우 부분 토큰을 wei라고 하며, 10^18 wei는 1
ETH와 같습니다. 작성 시점에서 10,000,000,000,000 wei는 대략 미국 또는 유로 1센트입니다.

애플리케이션은 토큰 잔액을 표시하는 방법을 알아야 합니다. 사용자가 3,141,000,000,000,000,000 wei를 가지고 있다면, 그것은
3.14 ETH일까요? 31.41 ETH일까요? 3,141 ETH일까요? 이더의 경우 ETH에 대해 10^18 wei로 정의되어 있지만, 여러분의
토큰에 대해서는 다른 값을 선택할 수 있습니다. 토큰을 나누는 것이 의미가 없다면
`_decimals` 값을 0으로 사용할 수 있습니다. ETH와 동일한 표준을 사용하고 싶다면 **18** 값을 사용하세요.

### 생성자 {#the-constructor}

```solidity
    /**
     * @dev {name} 및 {symbol} 값을 설정하고, {decimals}를
     * 기본값 18로 초기화합니다.
     *
     * {decimals}에 다른 값을 선택하려면 {_setupDecimals}를 사용하세요.
     *
     * 이 세 값은 모두 불변입니다. 즉, 생성 중에
     * 한 번만 설정할 수 있습니다.
     */
    constructor (string memory name_, string memory symbol_) public {
        // 솔리디티 ≥0.7.0에서는 'public'이 암시적이므로 생략할 수 있습니다.

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

생성자는 컨트랙트가 처음 생성될 때 호출됩니다. 관례적으로 함수 매개변수는 `<something>_`으로 명명됩니다.

### 사용자 인터페이스 함수 {#user-interface-functions}

```solidity
    /**
     * @dev 토큰의 이름을 반환합니다.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev 토큰의 심볼을 반환하며, 일반적으로 이름의
     * 축약 버전입니다.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev 사용자 표현을 얻는 데 사용되는 소수점 자릿수를 반환합니다.
     * 예를 들어, `decimals`가 `2`이면, `505` 토큰의 잔액은
     * 사용자에게 `5,05`(`505 / 10 ** 2`)로 표시되어야 합니다.
     *
     * 토큰은 보통 이더와 wei 간의 관계를 모방하여 18이라는 값을
     * 선택합니다. 이는 {_setupDecimals}가 호출되지 않는 한 {ERC20}이 사용하는
     * 값입니다.
     *
     * 참고: 이 정보는 _표시_ 목적으로만 사용되며, 
     * {IERC20-balanceOf} 및 {IERC20-transfer}를 포함한 컨트랙트의 어떠한
     * 산술 연산에도 영향을 미치지 않습니다.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

`name`, `symbol`, `decimals` 함수는 사용자 인터페이스가 컨트랙트에 대해 알 수 있도록 하여 제대로 표시할 수 있도록 돕습니다.

반환 유형은 `string memory`이며, 이는 메모리에 저장된 문자열을 반환함을 의미합니다. 문자열과 같은 변수는
세 위치에 저장될 수 있습니다:

|      | 수명      | 컨트랙트 액세스 | 가스 비용                                         |
| ---- | ------- | -------- | --------------------------------------------- |
| 메모리  | 함수 호출   | 읽기/쓰기    | 수십 또는 수백 (더 높은 위치일수록 더 높음) |
| 콜데이터 | 함수 호출   | 읽기 전용    | 반환 유형으로 사용할 수 없으며, 함수 매개변수 유형으로만 사용 가능        |
| 스토리지 | 변경될 때까지 | 읽기/쓰기    | 높음 (읽기 800, 쓰기 20k)        |

이 경우 `memory`가 가장 좋은 선택입니다.

### 토큰 정보 읽기 {#read-token-information}

이 함수들은 총 공급량 또는 계정의 잔액과 같은 토큰에 대한 정보를 제공합니다.

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

계정의 잔액을 읽습니다. 누구나 다른 사람의 계정 잔액을 조회할 수 있음에 유의하세요. 이 정보는 모든 노드에서 확인할 수 있으므로 숨기려고 해도 소용없습니다. _블록체인에는 비밀이 없습니다._

### 토큰 전송 {#transfer-tokens}

```solidity
    /**
     * @dev {IERC20-transfer}를 참조하세요.
     *
     * 요구 사항:
     *
     * - `수신자`는 0 주소일 수 없습니다.
     * - 호출자는 최소 `금액`의 잔액을 가지고 있어야 합니다.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

`transfer` 함수는 보낸 사람의 계정에서 다른 계정으로 토큰을 전송하기 위해 호출됩니다. 부울 값을 반환하지만 그 값은 항상 **true**라는 점에 유의하세요. 전송이 실패하면 컨트랙트는 호출을 되돌립니다.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

`_transfer` 함수가 실제 작업을 수행합니다. 이 함수는 다른 컨트랙트 함수에서만 호출할 수 있는 비공개 함수입니다. 관례적으로 비공개 함수는 상태 변수와 마찬가지로 `_<something>`으로 명명됩니다.

일반적으로 솔리디티에서는 메시지 발신자에 대해 `msg.sender`를 사용합니다. 그러나 이는 [OpenGSN](http://opengsn.org/)에서 문제를 일으킵니다. 토큰으로 이더 없는 트랜잭션을 허용하려면 `_msgSender()`를 사용해야 합니다. 일반 트랜잭션의 경우 `msg.sender`를 반환하지만 이더가 없는 트랜잭션의 경우 메시지를 중계한 컨트랙트가 아닌 원래 서명자를 반환합니다.

### 허용량 함수 {#allowance-functions}

다음은 허용량 기능을 구현하는 함수입니다: `allowance`, `approve`, `transferFrom`, `_approve`. 또한 OpenZeppelin 구현은 기본 표준을 넘어 보안을 개선하는 몇 가지 기능인 `increaseAllowance` 및 `decreaseAllowance`를 포함합니다.

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
     * - `spender`는 0 주소일 수 없습니다.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

이 함수는 허용량을 생성하기 위해 호출됩니다. 위의 `transfer` 함수와 유사합니다:

- 이 함수는 실제 작업을 수행하는 내부 함수(이 경우 `_approve`)를 호출할 뿐입니다.
- 함수는 `true`를 반환하거나(성공 시) 되돌립니다(실패 시).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

상태 변경이 발생하는 곳의 수를 최소화하기 위해 내부 함수를 사용합니다. 상태를 변경하는 _모든_ 함수는 보안 감사가 필요한 잠재적인 보안 위험입니다. 이렇게 하면 실수를 할 가능성이 줄어듭니다.

#### transferFrom 함수 {#transferFrom}

지출자가 허용량을 사용하기 위해 호출하는 함수입니다. 여기에는 두 가지 작업이 필요합니다. 사용된 금액을 전송하고 그 금액만큼 허용량을 줄이는 것입니다.

```solidity
    /**
     * @dev {IERC20-transferFrom}를 참조하세요.
     *
     * 업데이트된 허용량을 나타내는 {Approval} 이벤트를 발생시킵니다. 이는
     * EIP에서 요구하지 않습니다. {ERC20}의 시작 부분에 있는 참고 사항을 참조하세요.
     *
     * 요구 사항:
     *
     * - `sender` 및 `recipient`는 0 주소일 수 없습니다.
     * - `sender`는 최소 `amount`의 잔액을 가지고 있어야 합니다.
     * - 호출자는 ``sender``의 토큰에 대해 최소
     * `amount`의 허용량을 가지고 있어야 합니다.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

`a.sub(b, "메시지")` 함수 호출은 두 가지 작업을 수행합니다. 첫째, 새로운 허용량인 `a-b`를 계산합니다.
둘째, 이 결과가 음수가 아닌지 확인합니다. 음수이면 제공된 메시지와 함께 호출이 되돌려집니다. 호출이 되돌려질 때 해당 호출 중에 이전에 수행된 모든 처리는 무시되므로 `_transfer`를 되돌릴 필요가 없다는 점에 유의하세요.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: 전송 금액이 허용량을 초과합니다"));
        return true;
    }
```

#### OpenZeppelin 안전 추가 사항 {#openzeppelin-safety-additions}

0이 아닌 허용량을 다른 0이 아닌 값으로 설정하는 것은 위험합니다. 자신의 트랜잭션 순서만 제어할 수 있고 다른 사람의 트랜잭션 순서는 제어할 수 없기 때문입니다. 순진한 앨리스와 부정직한 빌이라는 두 사용자가 있다고 상상해 보세요. 앨리스는 빌에게서 어떤 서비스를 원하는데, 그 비용이 5 토큰이라고 생각해서 빌에게 5 토큰의 허용량을 줍니다.

그런 다음 상황이 바뀌어 빌의 가격이 10 토큰으로 오릅니다. 여전히 서비스를 원하는 앨리스는 빌의 허용량을 10으로 설정하는 트랜잭션을 보냅니다. 빌은 트랜잭션 풀에서 이 새로운 트랜잭션을 보는 순간 앨리스의 5 토큰을 사용하는 트랜잭션을 보내고 훨씬 더 높은 가스 가격을 설정하여 더 빨리 채굴되도록 합니다. 그렇게 하면 빌은 먼저 5 토큰을 사용하고, 앨리스의 새로운 허용량이 채굴되면 10 토큰을 더 사용하여 총 15 토큰을 사용할 수 있습니다. 이는 앨리스가 승인하려던 것보다 많은 금액입니다. 이 기술을 [선행매매](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running)라고 합니다.

| 앨리스의 트랜잭션                            | 앨리스 Nonce | 빌 트랜잭션                                           | 빌 Nonce | 빌의 허용량 | 앨리스로부터의 빌 총수입 |
| ------------------------------------ | --------- | ------------------------------------------------ | ------- | ------ | ------------- |
| approve(Bill, 5)  | 10        |                                                  |         | 5      | 0             |
|                                      |           | transferFrom(Alice, Bill, 5)  | 10,123  | 0      | 5             |
| approve(Bill, 10) | 11        |                                                  |         | 10     | 5             |
|                                      |           | transferFrom(Alice, Bill, 10) | 10,124  | 0      | 15            |

이 문제를 피하기 위해, 이 두 함수(`increaseAllowance`와 `decreaseAllowance`)를 사용하면 허용량을 특정 금액만큼 수정할 수 있습니다. 따라서 빌이 이미 5개의 토큰을 사용했다면, 그는 5개만 더 사용할 수 있을 것입니다. 타이밍에 따라 두 가지 방식으로 작동할 수 있으며, 두 가지 모두 빌이 10개의 토큰만 얻는 것으로 끝납니다:

A:

| 앨리스의 트랜잭션                                     | 앨리스 Nonce | 빌 트랜잭션                                          | 빌 Nonce |  빌의 허용량 | 앨리스로부터의 빌 총수입 |
| --------------------------------------------- | --------: | ----------------------------------------------- | ------: | ------: | ------------- |
| approve(Bill, 5)           |        10 |                                                 |         |       5 | 0             |
|                                               |           | transferFrom(Alice, Bill, 5) |  10,123 |       0 | 5             |
| increaseAllowance(Bill, 5) |        11 |                                                 |         | 0+5 = 5 | 5             |
|                                               |           | transferFrom(Alice, Bill, 5) |  10,124 |       0 | 10            |

B:

| 앨리스의 트랜잭션                                     | 앨리스 Nonce | 빌 트랜잭션                                           | 빌 Nonce |   빌의 허용량 | 앨리스로부터의 빌 총수입 |
| --------------------------------------------- | --------: | ------------------------------------------------ | ------: | -------: | ------------: |
| approve(Bill, 5)           |        10 |                                                  |         |        5 |             0 |
| increaseAllowance(Bill, 5) |        11 |                                                  |         | 5+5 = 10 |             0 |
|                                               |           | transferFrom(Alice, Bill, 10) |  10,124 |        0 |            10 |

```solidity
    /**
     * @dev 호출자에 의해 `spender`에게 부여된 허용량을 원자적으로 증가시킵니다.
     *
     * 이것은 {IERC20-approve}에 설명된 문제에 대한 완화책으로 사용할 수 있는 {approve}의 대안입니다.
     *
     * 업데이트된 허용량을 나타내는 {Approval} 이벤트를 발생시킵니다.
     *
     * 요구 사항:
     *
     * - `spender`는 0 주소일 수 없습니다.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

관례적으로 상태 변수는 `_<something>`으로 명명됩니다. 첫 두 변수는 [매핑](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)으로, 키가 숫자 값이라는 점을 제외하고는 [연관 배열](https://wikipedia.org/wiki/Associative_array)과 거의 동일하게 동작합니다.

저장 공간은 기본값(0)과 다른 값을 가진 항목에만 할당됩니다.

```solidity
    mapping (address => uint256) private _balances;
```

첫 번째 매핑인 `_balances`는 주소와 해당 토큰의 잔액입니다.

#### 잔액에 접근하려면 `_balances[<address>]` 구문을 사용합니다.

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

이 변수 `_allowances`는 앞에서 설명한 허용량을 저장합니다. 첫 번째 인덱스는 토큰의 소유자이고, 두 번째는 허용량이 있는 계약입니다.

&nbsp;

```solidity
    uint256 private _totalSupply;
```

이름에서 알 수 있듯이, 이 변수는 토큰의 총 공급량을 추적합니다.     string private _name;
string private _symbol;
uint8 private _decimals;

&nbsp;

```solidity
처음 두 개는 자명하지만 `_decimals`는 그렇지 않습니다.
```

한편으로, 이더리움에는 부동 소수점이나 분수 변수가 없습니다.

1. 다른 한편으로, 인간은 토큰을 나눌 수 있는 것을 좋아합니다.
2. 사람들이 통화로 금을 선택한 이유 중 하나는 누군가가 소 한 마리 값의 오리를 사려고 할 때 거스름돈을 만들기가 어려웠기 때문입니다.

해결책은 정수를 추적하는 것이지만, 실제 토큰 대신 거의 가치가 없는 분수 토큰을 세는 것입니다. 이더의 경우, 분수 토큰은 wei라고 불리며, 10^18 wei는 1 ETH와 같습니다.

글을 쓰는 시점에서 10,000,000,000,000 wei는 대략 1 미국 센트 또는 유로 센트입니다. 애플리케이션은 토큰 잔액을 어떻게 표시해야 하는지 알아야 합니다. 사용자가 3,141,000,000,000,000,000 wei를 가지고 있다면, 그것은 3.14 ETH인가요? 31.41 ETH인가요?

&nbsp;

```solidity
이더의 경우 ETH에 대해 10^18 wei로 정의되지만, 토큰에 대해서는 다른 값을 선택할 수 있습니다.
```

토큰을 나누는 것이 의미가 없다면 `_decimals` 값을 0으로 사용할 수 있습니다. ETH와 동일한 표준을 사용하려면 값 **18**을 사용하세요. 생성자 {#the-constructor}     /\*\*
\* @dev {name}과 {symbol}의 값을 설정하고, {decimals}를 기본값인 18로 초기화합니다.
\*
\* {decimals}에 대해 다른 값을 선택하려면 {_setupDecimals}를 사용하세요.
\*
\* 이 세 가지 값은 모두 불변입니다: 생성 중에 한 번만 설정할 수 있습니다.
\*/
constructor (string memory name_, string memory symbol_) public {
// 솔리디티 ≥0.7.0에서는 'public'이 암시적이므로 생략할 수 있습니다.
```
    _name = name_;
    _symbol = symbol_;
    _decimals = 18;
}
```

&nbsp;

```solidity
관례적으로 함수 매개변수는 `<something>_`로 명명됩니다.
```

사용자 인터페이스 함수 {#user-interface-functions}

```solidity
    /**
     * @dev 토큰의 이름을 반환합니다.
     */
    function name() public view returns (string memory) {
        return _name;
    }
```

```solidity
    /**
     * @dev 토큰의 기호를 반환하며, 보통 이름의 짧은 버전입니다.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }
```

/**
 * @dev 사용자 표현을 얻는 데 사용되는 소수점 자릿수를 반환합니다.
 * 예를 들어, `decimals`가 `2`이면, `505` 토큰의 잔액은
 * 사용자에게 `5,05`(`505 / 10 ** 2`)로 표시되어야 합니다.
 *
 * 토큰은 보통 18의 값을 선택하며, 이는 이더와 wei의 관계를 모방한 것입니다. 이는 {_setupDecimals}가 호출되지 않는 한
 * {ERC20}이 사용하는 값입니다.
 *
 * 참고: 이 정보는 _표시_ 목적으로만 사용됩니다: 계약의 어떤
 * 산술에도 영향을 미치지 않으며, {IERC20-balanceOf} 및 {IERC20-transfer}를 포함합니다.
 */
function decimals() public view returns (uint8) {
    return _decimals;
} 이 함수들, `name`, `symbol`, `decimals`는 사용자 인터페이스가 계약에 대해 알 수 있도록 도와주어 제대로 표시할 수 있게 합니다.
```

#### 반환 유형은 `string memory`로, 메모리에 저장된 문자열을 반환한다는 의미입니다.

문자열과 같은 변수는 세 곳에 저장될 수 있습니다:
수명

계약 액세스
가스 비용 메모리

```solidity
함수 호출
```

읽기/쓰기

&nbsp;

```solidity
읽기 전용
```

반환 유형으로 사용할 수 없고, 함수 매개변수 유형으로만 사용 가능

#### 변경될 때까지

높음 (읽기 800, 쓰기 20k) 이 경우, `memory`가 최선의 선택입니다. 토큰 정보 읽기 {#read-token-information}

```solidity
이 함수들은 총 공급량이나 계정 잔액과 같은 토큰에 대한 정보를 제공합니다.
```

&nbsp;

`totalSupply` 함수는 토큰의 총 공급량을 반환합니다.     /\*\*
\* @dev {IERC20-balanceOf}를 참조하세요.
\*/
function balanceOf(address account) public view override returns (uint256) {
return _balances[account];
}

```solidity
계정의 잔액을 읽습니다.
```

### 누구나 다른 사람의 계정 잔액을 가져올 수 있다는 점에 유의하세요.

```solidity
이 정보는 어쨌든 모든 노드에서 사용할 수 있으므로 숨기려고 해도 소용이 없습니다.
```

_블록체인에는 비밀이 없습니다._
토큰 전송하기 {#transfer-tokens}     /\*\*
\* @dev {IERC20-transfer}를 참조하세요.
\*
\* 요구 사항:
\*
\* - `recipient`는 0 주소일 수 없습니다.
\* - 호출자는 최소 `amount`의 잔액을 가지고 있어야 합니다.
\*/
function transfer(address recipient, uint256 amount) public virtual override returns (bool) {

### 훅 {#hooks}

이 함수는 부울 값을 반환하지만, 그 값은 항상 **true**라는 점에 유의하세요. 전송이 실패하면 계약은 호출을 되돌립니다.

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

## 결론 {#conclusion}

이것은 다른 계약 함수에 의해서만 호출될 수 있는 비공개 함수입니다.

- _이더리움 상에 비공개 정보란 없습니다_. 일반적으로 솔리디티에서는 메시지 발신인으로 `msg.sender`를 사용합니다.
- 하지만 이는 [OpenGSN](http://opengsn.org/)을 깨뜨립니다. 토큰으로 이더 없는 트랜잭션을 허용하려면 `_msgSender()`를 사용해야 합니다.
- 이 함수는 일반 트랜잭션의 경우 `msg.sender`를 반환하지만, 이더 없는 트랜잭션의 경우 메시지를 중계한 계약이 아닌 원래 서명자를 반환합니다. 허용량 함수 {#allowance-functions} 이 함수들은 허용량 기능을 구현하는 함수들입니다: `allowance`, `approve`, `transferFrom`, 그리고 `_approve`. 또한, OpenZeppelin 구현은 기본 표준을 넘어 보안을 향상시키는 몇 가지 기능, 즉 `increaseAllowance`와 `decreaseAllowance`를 포함합니다.
- allowance 함수 {#allowance}
  /\*\*
  \* @dev {IERC20-allowance}를 참조하세요.
  \*/
  function allowance(address owner, address spender) public view virtual override returns (uint256) {
  return _allowances[owner][spender];
  }
- `allowance` 함수는 누구나 어떤 허용량이든 확인할 수 있게 해줍니다. approve 함수 {#approve}     /\*\*
  \* @dev {IERC20-approve}를 참조하세요.
  \*
  \* 요구 사항:
  \*
  \* - `spender`는 0 주소일 수 없습니다.
  \*/
  function approve(address spender, uint256 amount) public virtual override returns (bool) { 이 함수는 허용량을 생성하기 위해 호출됩니다.

위의 `transfer` 함수와 비슷합니다.

[여기서 제 작업에 대한 자세한 내용을 확인하세요](https://cryptodocguy.pro/).
