---
title: "안전장치가 있는 ERC-20"
description: "사람들이 사소한 실수를 피하도록 돕는 방법"
author: Ori Pomerantz
lang: ko
tags: [ "erc-20" ]
skill: beginner
published: 2022-08-15
---

## 소개 {#introduction}

이더리움의 가장 큰 장점 중 하나는 트랜잭션을 수정하거나 취소할 수 있는 중앙 기관이 없다는 것입니다. 이더리움의 큰 문제 중 하나는 사용자 실수나 불법적인 트랜잭션을 취소할 권한을 가진 중앙 기관이 없다는 것입니다. 이 글에서는 사용자가 [ERC-20](/developers/docs/standards/tokens/erc-20/) 토큰으로 저지르는 일반적인 실수와 사용자가 이러한 실수를 피하도록 돕거나 중앙 기관에 일부 권한(예: 계정 동결)을 부여하는 ERC-20 계약을 만드는 방법에 대해 알아봅니다.

[OpenZeppelin ERC-20 토큰 계약](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)을 사용하지만 이 글에서는 자세히 설명하지 않습니다. 이 정보는 [여기](/developers/tutorials/erc20-annotated-code)에서 찾을 수 있습니다.

전체 소스 코드를 보려면:

1. [Remix IDE](https://remix.ethereum.org/)를 엽니다.
2. 깃허브 복제 아이콘(![깃허브 복제 아이콘](icon-clone.png))을 클릭합니다.
3. 깃허브 리포지토리 `https://github.com/qbzzt/20220815-erc20-safety-rails`를 복제합니다.
4. **contracts > erc20-safety-rails.sol**을 엽니다.

## ERC-20 계약 생성 {#creating-an-erc-20-contract}

안전장치 기능을 추가하기 전에 ERC-20 계약이 필요합니다. 이 글에서는 [OpenZeppelin 계약 마법사](https://docs.openzeppelin.com/contracts/5.x/wizard)를 사용합니다. 다른 브라우저에서 열고 다음 지침을 따르세요.

1. **ERC20**을 선택합니다.

2. 다음 설정을 입력하세요.

   | 매개 변수    | 값                |
   | -------- | ---------------- |
   | 이름       | SafetyRailsToken |
   | 기호       | SAFE             |
   | Premint  | 1000             |
   | 기능       | 없음               |
   | 액세스 제어   | Ownable          |
   | 업그레이드 기능 | 없음               |

3. 위로 스크롤하여 **Remix에서 열기**(Remix용)를 클릭하거나 **다운로드**를 클릭하여 다른 환경을 사용합니다. Remix를 사용한다고 가정하고, 다른 것을 사용한다면 적절하게 변경하세요.

4. 이제 완전히 작동하는 ERC-20 계약이 있습니다. `.deps` > `npm`을 확장하여 가져온 코드를 볼 수 있습니다.

5. 계약을 컴파일하고 배포하고 테스트하여 ERC-20 계약으로 작동하는지 확인합니다. Remix 사용법을 배워야 한다면 [이 튜토리얼](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth)을 사용하세요.

## 일반적인 실수 {#common-mistakes}

### 실수 {#the-mistakes}

사용자는 때때로 잘못된 주소로 토큰을 보냅니다. 사용자가 무엇을 하려고 했는지 마음을 읽을 수는 없지만, 자주 발생하고 쉽게 감지할 수 있는 두 가지 오류 유형이 있습니다.

1. 계약 자체 주소로 토큰 보내기. 예를 들어, [옵티미즘의 OP 토큰](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c)은 두 달도 채 되지 않아 [120,000개 이상의](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) OP 토큰을 축적했습니다. 이는 아마도 사람들이 그냥 잃어버린 상당한 양의 자산을 나타냅니다.

2. [외부 소유 계정](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) 또는 [스마트 계약](/developers/docs/smart-contracts)에 해당하지 않는 빈 주소로 토큰을 보냅니다. 이런 일이 얼마나 자주 발생하는지에 대한 통계는 없지만, [한 사건으로 20,000,000개의 토큰 손실이 발생할 뻔했습니다](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### 전송 방지 {#preventing-transfers}

OpenZeppelin ERC-20 계약에는 토큰이 전송되기 전에 호출되는 [훅, `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368)가 포함되어 있습니다. 기본적으로 이 훅은 아무것도 하지 않지만, 문제가 있는 경우 되돌리는 확인과 같은 자체 기능을 추가할 수 있습니다.

훅을 사용하려면 생성자 뒤에 이 함수를 추가하세요.

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

솔리디티에 익숙하지 않다면 이 함수의 일부가 새로울 수 있습니다.

```solidity
        internal virtual
```

`virtual` 키워드는 `ERC20`에서 기능을 상속하고 이 함수를 재정의한 것처럼 다른 계약이 우리에게서 상속하고 이 함수를 재정의할 수 있음을 의미합니다.

```solidity
        override(ERC20)
```

`_beforeTokenTransfer`의 ERC20 토큰 정의를 [재정의](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding)하고 있음을 명시적으로 지정해야 합니다. 일반적으로 보안 관점에서는 명시적 정의가 암시적 정의보다 훨씬 낫습니다. 바로 앞에 있으면 무언가를 했다는 사실을 잊을 수 없습니다. 이것이 또한 우리가 재정의하는 슈퍼클래스의 `_beforeTokenTransfer`를 지정해야 하는 이유입니다.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

이 줄은 우리가 상속한 계약의 `_beforeTokenTransfer` 함수를 호출합니다. 이 경우 `ERC20`만 해당하며, `Ownable`에는 이 훅이 없습니다. 현재 `ERC20._beforeTokenTransfer`는 아무것도 하지 않지만, 나중에 기능이 추가될 경우를 대비하여 호출합니다(그리고 계약은 배포 후 변경되지 않기 때문에 계약을 다시 배포하기로 결정합니다).

### 요구 사항 코딩 {#coding-the-requirements}

함수에 다음 요구 사항을 추가하려고 합니다.

- `to` 주소는 ERC-20 계약 자체의 주소인 `address(this)`와 같을 수 없습니다.
- `to` 주소는 비어 있을 수 없으며, 다음 중 하나여야 합니다.
  - 외부 소유 계정(EOA). 주소가 EOA인지 직접 확인할 수는 없지만, 주소의 ETH 잔액을 확인할 수 있습니다. EOA는 더 이상 사용되지 않더라도 거의 항상 잔액이 있습니다. 마지막 wei까지 비우기는 어렵습니다.
  - 스마트 계약. 주소가 스마트 계약인지 테스트하는 것은 조금 더 어렵습니다. 외부 코드 길이를 확인하는 [`EXTCODESIZE`](https://www.evm.codes/#3b)라는 opcode가 있지만 솔리디티에서 직접 사용할 수는 없습니다. 이를 위해 EVM 어셈블리인 [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html)을 사용해야 합니다. 솔리디티에서 사용할 수 있는 다른 값([`<address>.code` 및 `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types))이 있지만, 비용이 더 많이 듭니다.

새 코드를 한 줄씩 살펴보겠습니다.

```solidity
        require(to != address(this), "토큰을 계약 주소로 보낼 수 없습니다");
```

이것이 첫 번째 요구 사항입니다. `to`와 `this(address)`가 같지 않은지 확인합니다.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

이렇게 주소가 계약인지 확인합니다. Yul에서 직접 출력을 받을 수 없으므로 대신 결과를 저장할 변수(`isToContract`)를 정의합니다. Yul의 작동 방식은 모든 opcode가 함수로 간주된다는 것입니다. 따라서 먼저 [`EXTCODESIZE`](https://www.evm.codes/#3b)를 호출하여 계약 크기를 가져온 다음, [`GT`](https://www.evm.codes/#11)를 사용하여 0이 아닌지 확인합니다(부호 없는 정수를 다루므로 물론 음수가 될 수 없습니다). 그런 다음 결과를 `isToContract`에 씁니다.

```solidity
        require(to.balance != 0 || isToContract, "토큰을 빈 주소로 보낼 수 없습니다");
```

그리고 마지막으로, 빈 주소에 대한 실제 확인이 있습니다.

## 관리자 액세스 {#admin-access}

때로는 실수를 되돌릴 수 있는 관리자가 있는 것이 유용합니다. 악용 가능성을 줄이기 위해 이 관리자는 [다중서명](https://blog.logrocket.com/security-choices-multi-signature-wallets/)이 될 수 있으므로 여러 사람이 조치에 동의해야 합니다. 이 글에서는 두 가지 관리 기능을 다룹니다.

1. 계정 동결 및 해제. 예를 들어 계정이 손상되었을 수 있을 때 유용할 수 있습니다.
2. 자산 정리.

   때로는 사기꾼이 합법성을 얻기 위해 사기 토큰을 실제 토큰의 계약으로 보냅니다. 예를 들어, [여기](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders)를 참조하세요. 합법적인 ERC-20 계약은 [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042)입니다. 그것을 사칭하는 사기는 [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe)입니다.

   사람들이 실수로 합법적인 ERC-20 토큰을 우리 계약에 보낼 수도 있는데, 이는 토큰을 꺼낼 방법을 원하는 또 다른 이유입니다.

OpenZeppelin은 관리자 액세스를 활성화하는 두 가지 메커니즘을 제공합니다.

- [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) 계약에는 단일 소유자가 있습니다. `onlyOwner` [제어자](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm)가 있는 함수는 해당 소유자만 호출할 수 있습니다. 소유자는 소유권을 다른 사람에게 이전하거나 완전히 포기할 수 있습니다. 다른 모든 계정의 권한은 일반적으로 동일합니다.
- [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) 계약에는 [역할 기반 접근 제어(RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control)가 있습니다.

간단하게 하기 위해 이 글에서는 `Ownable`을 사용합니다.

### 계약 동결 및 해제 {#freezing-and-thawing-contracts}

계약을 동결하고 해제하려면 몇 가지 변경이 필요합니다.

- 어떤 주소가 동결되었는지 추적하기 위한 주소에서 [부울](https://en.wikipedia.org/wiki/Boolean_data_type)로의 [매핑](https://www.tutorialspoint.com/solidity/solidity_mappings.htm). 모든 값은 초기에 0이며, 부울 값의 경우 거짓으로 해석됩니다. 기본적으로 계정은 동결되지 않기 때문에 이것이 우리가 원하는 것입니다.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- 계정이 동결되거나 해제될 때 관심 있는 사람에게 알리는 [이벤트](https://www.tutorialspoint.com/solidity/solidity_events.htm). 기술적으로 말해서 이러한 작업에는 이벤트가 필요하지 않지만, 오프체인 코드가 이러한 이벤트를 수신하고 무슨 일이 일어나고 있는지 알 수 있도록 도와줍니다. 스마트 계약이 다른 사람과 관련이 있을 수 있는 일이 발생했을 때 이벤트를 내보내는 것은 좋은 매너로 간주됩니다.

  이벤트는 인덱싱되므로 계정이 동결되거나 해제된 모든 시간을 검색할 수 있습니다.

  ```solidity
    // 계정이 동결되거나 해제될 때
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- 계정 동결 및 해제 기능. 이 두 함수는 거의 동일하므로 동결 함수만 살펴보겠습니다.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm)으로 표시된 함수는 다른 스마트 계약에서 또는 트랜잭션에 의해 직접 호출될 수 있습니다.

  ```solidity
    {
        require(!frozenAccounts[addr], "계정이 이미 동결되었습니다");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  계정이 이미 동결된 경우 되돌립니다. 그렇지 않으면 동결하고 이벤트를 `emit`합니다.

- 동결된 계정에서 자금이 이동되는 것을 방지하기 위해 `_beforeTokenTransfer`를 변경합니다. 자금은 여전히 동결된 계정으로 이체될 수 있습니다.

  ```solidity
       require(!frozenAccounts[from], "계정이 동결되었습니다");
  ```

### 자산 정리 {#asset-cleanup}

이 계약이 보유한 ERC-20 토큰을 해제하려면 해당 토큰이 속한 토큰 계약에서 [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) 또는 [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve) 함수를 호출해야 합니다. 이 경우 허용량에 가스를 낭비할 필요가 없으므로 직접 전송하는 것이 좋습니다.

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

이것은 주소를 받았을 때 계약에 대한 객체를 만드는 구문입니다. 소스 코드의 일부로 ERC20 토큰에 대한 정의가 있고(4행 참조), 해당 파일에 OpenZeppelin ERC-20 계약의 인터페이스인 [IERC20에 대한 정의](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)가 포함되어 있기 때문에 이 작업을 수행할 수 있습니다.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

이것은 정리 기능이므로 아마도 토큰을 남기고 싶지 않을 것입니다. 사용자로부터 수동으로 잔액을 가져오는 대신 프로세스를 자동화하는 것이 좋습니다.

## 결론 {#conclusion}

이것은 완벽한 해결책이 아닙니다. "사용자가 실수를 했다" 문제에 대한 완벽한 해결책은 없습니다. 그러나 이러한 종류의 확인을 사용하면 적어도 일부 실수를 방지할 수 있습니다. 계정을 동결하는 기능은 위험하지만 해커에게 도난당한 자금을 거부함으로써 특정 해킹의 피해를 제한하는 데 사용할 수 있습니다.

[여기서 제 작업에 대한 자세한 내용을 확인하세요](https://cryptodocguy.pro/).
