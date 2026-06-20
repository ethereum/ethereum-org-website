---
title: "안전장치가 있는 ERC-20"
description: "사람들이 어리석은 실수를 피하도록 돕는 방법"
author: "오리 포메란츠"
lang: ko
tags: ["erc-20"]
skill: beginner
breadcrumb: "ERC-20 안전"
published: 2022-08-15
---

## 소개 {#introduction}

이더리움의 훌륭한 점 중 하나는 트랜잭션을 수정하거나 취소할 수 있는 중앙 권한이 없다는 것입니다. 이더리움의 큰 문제 중 하나는 사용자의 실수나 불법적인 트랜잭션을 취소할 권한을 가진 중앙 권한이 없다는 것입니다. 이 글에서는 사용자가 [ERC-20](/developers/docs/standards/tokens/erc-20/) 토큰과 관련하여 저지르는 일반적인 실수와 사용자가 이러한 실수를 피하도록 돕거나 중앙 권한에 일부 권한(예: 계정 동결)을 부여하는 ERC-20 컨트랙트를 만드는 방법에 대해 알아봅니다.

이 글에서는 [오픈제플린 ERC-20 토큰 컨트랙트](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)를 사용하지만, 이에 대해 자세히 설명하지는 않습니다. 관련 정보는 [여기](/developers/tutorials/erc20-annotated-code)에서 찾을 수 있습니다.

전체 소스 코드를 보려면 다음을 수행하세요.

1. [Remix IDE](https://remix.ethereum.org/)를 엽니다.
2. GitHub 클론 아이콘(![clone github icon](icon-clone.png))을 클릭합니다.
3. GitHub 리포지토리 `https://github.com/qbzzt/20220815-erc20-safety-rails`를 클론합니다.
4. <strong>contracts > erc20-safety-rails.sol</strong>을 엽니다.

## ERC-20 컨트랙트 생성 {#creating-an-erc-20-contract}

안전장치 기능을 추가하려면 먼저 ERC-20 컨트랙트가 필요합니다. 이 글에서는 [오픈제플린 컨트랙트 마법사(OpenZeppelin Contracts Wizard)](https://docs.openzeppelin.com/contracts/5.x/wizard)를 사용합니다. 다른 브라우저에서 열고 다음 지침을 따르세요.

1. <strong>ERC20</strong>을 선택합니다.
2. 다음 설정을 입력합니다.

   | 매개변수      | 값            |
   | -------------- | ---------------- |
   | Name           | SafetyRailsToken |
   | Symbol         | SAFE             |
   | Premint        | 1000             |
   | Features       | None             |
   | Access Control | Ownable          |
   | Upgradability  | None             |

3. 위로 스크롤하여 **Open in Remix**(Remix용)를 클릭하거나 다른 환경을 사용하려면 <strong>Download</strong>를 클릭합니다. 여기서는 Remix를 사용한다고 가정하며, 다른 환경을 사용하는 경우 적절히 변경하세요.
4. 이제 완전히 작동하는 ERC-20 컨트랙트가 준비되었습니다. `.deps` > `npm`를 확장하여 가져온 코드를 볼 수 있습니다.
5. 컨트랙트를 컴파일하고 배포하여 ERC-20 컨트랙트로 작동하는지 확인해 보세요. Remix 사용법을 배워야 한다면 [이 튜토리얼을 사용하세요](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## 일반적인 실수 {#common-mistakes}

### 실수 유형 {#the-mistakes}

사용자는 때때로 잘못된 주소로 토큰을 전송합니다. 사용자의 의도를 정확히 알 수는 없지만, 자주 발생하고 쉽게 감지할 수 있는 두 가지 오류 유형이 있습니다.

1. 컨트랙트 자체 주소로 토큰을 전송하는 경우. 예를 들어, [옵티미즘의 OP 토큰](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c)은 두 달도 채 되지 않아 [120,000개 이상](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042)의 OP 토큰이 쌓였습니다. 이는 사람들이 잃어버린 것으로 추정되는 상당한 금액의 자산을 나타냅니다.

2. [외부 소유 계정(EOA)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)이나 [스마트 컨트랙트](/developers/docs/smart-contracts)에 해당하지 않는 빈 주소로 토큰을 전송하는 경우. 이런 일이 얼마나 자주 발생하는지에 대한 통계는 없지만, [한 사건으로 인해 20,000,000개의 토큰을 잃을 뻔한 적도 있습니다](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### 전송 방지 {#preventing-transfers}

오픈제플린 ERC-20 컨트랙트에는 토큰이 전송되기 전에 호출되는 [훅(hook)인 `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368)가 포함되어 있습니다. 기본적으로 이 훅은 아무 작업도 수행하지 않지만, 문제가 있을 경우 되돌리기(revert)를 수행하는 검사와 같은 자체 기능을 여기에 연결할 수 있습니다.

이 훅을 사용하려면 생성자 뒤에 다음 함수를 추가하세요.

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

Solidity에 익숙하지 않다면 이 함수의 일부가 생소할 수 있습니다.

```solidity
        internal virtual
```

`virtual` 키워드는 우리가 `ERC20`에서 기능을 상속받아 이 함수를 재정의(override)한 것처럼, 다른 컨트랙트도 우리 컨트랙트를 상속받아 이 함수를 재정의할 수 있음을 의미합니다.

```solidity
        override(ERC20)
```

우리가 `_beforeTokenTransfer`의 ERC20 토큰 정의를 [재정의](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding)하고 있음을 명시적으로 지정해야 합니다. 일반적으로 보안 관점에서 명시적 정의는 암시적 정의보다 훨씬 낫습니다. 눈앞에 명확히 보이면 자신이 한 일을 잊어버릴 수 없기 때문입니다. 이것이 바로 우리가 어떤 상위 클래스의 `_beforeTokenTransfer`를 재정의하는지 지정해야 하는 이유이기도 합니다.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

이 줄은 우리가 상속받은 컨트랙트 중 해당 함수를 가진 컨트랙트의 `_beforeTokenTransfer` 함수를 호출합니다. 이 경우 `ERC20`에만 해당하며, `Ownable`에는 이 훅이 없습니다. 현재 `ERC20._beforeTokenTransfer`가 아무 작업도 수행하지 않더라도, 향후 기능이 추가될 경우를 대비하여 이를 호출합니다(컨트랙트는 배포 후 변경되지 않으므로, 나중에 컨트랙트를 다시 배포하기로 결정할 수 있습니다).

### 요구 사항 코딩 {#coding-the-requirements}

함수에 다음 요구 사항을 추가하고자 합니다.

- `to` 주소는 ERC-20 컨트랙트 자체의 주소인 `address(this)`와 같을 수 없습니다.
- `to` 주소는 비어 있을 수 없으며, 다음 중 하나여야 합니다.
  - 외부 소유 계정(EOA). 주소가 EOA인지 직접 확인할 수는 없지만, 주소의 ETH 잔액은 확인할 수 있습니다. EOA는 더 이상 사용되지 않더라도 거의 항상 잔액을 가지고 있습니다. 마지막 1 Wei까지 모두 비우는 것은 어렵기 때문입니다.
  - 스마트 컨트랙트. 주소가 스마트 컨트랙트인지 테스트하는 것은 조금 더 어렵습니다. 외부 코드 길이를 확인하는 [`EXTCODESIZE`](https://www.evm.codes/#3b)라는 연산 코드가 있지만, Solidity에서 직접 사용할 수는 없습니다. 이를 위해서는 EVM 어셈블리인 [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html)을 사용해야 합니다. Solidity에서 사용할 수 있는 다른 값들([`<address>.code` 및 `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types))도 있지만, 가스 비용이 더 많이 듭니다.

새로운 코드를 한 줄씩 살펴보겠습니다.

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

이것은 첫 번째 요구 사항으로, `to`와 `this(address)`가 같지 않은지 확인합니다.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

이것은 주소가 컨트랙트인지 확인하는 방법입니다. Yul에서 직접 출력을 받을 수 없으므로, 대신 결과를 저장할 변수(이 경우 `isToContract`)를 정의합니다. Yul은 모든 연산 코드를 함수로 간주하는 방식으로 작동합니다. 따라서 먼저 [`EXTCODESIZE`](https://www.evm.codes/#3b)를 호출하여 컨트랙트 크기를 가져온 다음, [`GT`](https://www.evm.codes/#11)를 사용하여 0이 아닌지 확인합니다(부호 없는 정수를 다루고 있으므로 당연히 음수가 될 수 없습니다). 그런 다음 결과를 `isToContract`에 씁니다.

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

마지막으로, 빈 주소에 대한 실제 검사를 수행합니다.

## 관리자 액세스 {#admin-access}

때로는 실수를 되돌릴 수 있는 관리자가 있으면 유용합니다. 남용 가능성을 줄이기 위해 이 관리자를 [다중서명](https://blog.logrocket.com/security-choices-multi-signature-wallets/)으로 설정하여 여러 사람이 작업에 동의해야만 실행되도록 할 수 있습니다. 이 글에서는 두 가지 관리 기능을 다룹니다.

1. 계정 동결 및 동결 해제. 이는 예를 들어 계정이 손상되었을 수 있는 경우에 유용할 수 있습니다.
2. 자산 정리.

   때때로 사기꾼들은 합법성을 얻기 위해 실제 토큰의 컨트랙트로 사기성 토큰을 전송합니다. 예를 들어 [여기](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders)를 참조하세요. 합법적인 ERC-20 컨트랙트는 [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042)입니다. 이를 사칭하는 스캠은 [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe)입니다.

   또한 사람들이 실수로 합법적인 ERC-20 토큰을 우리 컨트랙트로 전송할 수도 있으며, 이것이 토큰을 빼낼 방법을 마련해야 하는 또 다른 이유입니다.

오픈제플린은 관리자 액세스를 활성화하는 두 가지 메커니즘을 제공합니다.

- [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) 컨트랙트에는 단일 소유자가 있습니다. `onlyOwner` [제어자(modifier)](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm)가 있는 함수는 해당 소유자만 호출할 수 있습니다. 소유자는 소유권을 다른 사람에게 이전하거나 완전히 포기할 수 있습니다. 다른 모든 계정의 권한은 일반적으로 동일합니다.
- [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) 컨트랙트에는 [역할 기반 액세스 제어(RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control)가 있습니다.

단순성을 위해 이 글에서는 `Ownable`를 사용합니다.

### 컨트랙트 동결 및 해제 {#freezing-and-thawing-contracts}

컨트랙트를 동결하고 해제하려면 몇 가지 변경 사항이 필요합니다.

- 어떤 주소가 동결되었는지 추적하기 위해 주소에서 [부울(boolean)](https://en.wikipedia.org/wiki/Boolean_data_type)로의 [매핑(mapping)](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)이 필요합니다. 모든 값은 초기에 0이며, 부울 값의 경우 false로 해석됩니다. 기본적으로 계정은 동결되지 않으므로 이것이 우리가 원하는 동작입니다.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- 계정이 동결되거나 해제될 때 관심 있는 사람에게 알리기 위한 [이벤트](https://www.tutorialspoint.com/solidity/solidity_events.htm). 엄밀히 말해 이러한 작업에 이벤트가 필수적인 것은 아니지만, 오프체인 코드가 이러한 이벤트를 수신하고 무슨 일이 일어나고 있는지 파악하는 데 도움이 됩니다. 다른 사람과 관련이 있을 수 있는 일이 발생할 때 스마트 컨트랙트가 이벤트를 발생시키는 것은 좋은 관행으로 간주됩니다.

  이벤트는 인덱싱되므로 계정이 동결되거나 해제된 모든 시간을 검색할 수 있습니다.

  ```solidity
    // 계정이 동결되거나 동결 해제될 때
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- 계정 동결 및 해제를 위한 함수. 이 두 함수는 거의 동일하므로 동결 함수만 살펴보겠습니다.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm)로 표시된 함수는 다른 스마트 컨트랙트에서 호출하거나 트랜잭션에 의해 직접 호출될 수 있습니다.

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  계정이 이미 동결된 경우 되돌리기(revert)를 수행합니다. 그렇지 않으면 계정을 동결하고 이벤트를 `emit`(발생)합니다.

- 동결된 계정에서 자금이 이동하는 것을 방지하기 위해 `_beforeTokenTransfer`를 변경합니다. 동결된 계정으로 자금을 전송하는 것은 여전히 가능하다는 점에 유의하세요.

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### 자산 정리 {#asset-cleanup}

이 컨트랙트가 보유한 ERC-20 토큰을 해제하려면 해당 토큰이 속한 토큰 컨트랙트에서 [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) 또는 [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve) 함수를 호출해야 합니다. 이 경우 허용량(allowance)에 가스를 낭비할 필요가 없으므로 직접 전송하는 것이 좋습니다.

```solidity
    function cleanupERC20(
        address erc20,
        address dest
    )
        public
        onlyOwner
    {
        IERC20 token = IERC20(erc20);
```

이것은 주소를 받을 때 컨트랙트용 객체를 생성하는 구문입니다. 소스 코드의 일부로 ERC20 토큰에 대한 정의가 있고(4번째 줄 참조), 해당 파일에 오픈제플린 ERC-20 컨트랙트의 인터페이스인 [IERC20에 대한 정의](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)가 포함되어 있기 때문에 이 작업을 수행할 수 있습니다.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

이것은 정리 함수이므로 토큰을 남기고 싶지 않을 것입니다. 사용자로부터 수동으로 잔액을 가져오는 대신 프로세스를 자동화하는 것이 좋습니다.

## 결론 {#conclusion}

이것은 완벽한 해결책이 아닙니다. "사용자가 실수했다"는 문제에 대한 완벽한 해결책은 없습니다. 그러나 이러한 종류의 검사를 사용하면 적어도 일부 실수는 방지할 수 있습니다. 계정을 동결하는 기능은 위험할 수 있지만, 해커가 탈취한 자금을 사용하지 못하게 함으로써 특정 해킹의 피해를 제한하는 데 사용할 수 있습니다.

[제 작업물은 여기에서 더 볼 수 있습니다](https://cryptodocguy.pro/).