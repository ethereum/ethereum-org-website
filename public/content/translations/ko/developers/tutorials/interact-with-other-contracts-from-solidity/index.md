---
title: "솔리디티에서 다른 계약과 상호작용하기"
description: "기존 계약에서 스마트 계약을 배포하고 상호작용하는 방법"
author: "jdourlens"
tags: [ "스마트 계약", "솔리디티", "리믹스", "배포하기", "결합성" ]
skill: advanced
lang: ko
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

이전 튜토리얼에서는 [첫 스마트 계약 배포하기](/developers/tutorials/deploying-your-first-smart-contract/) 방법을 배우고, [수식어를 사용한 스마트 계약 접근 제어](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/)나 [Solidity에서 오류 처리하기](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/)와 같은 기능을 추가했습니다. 이번 튜토리얼에서는 기존 계약에서 스마트 계약을 배포하고 상호작용하는 방법을 배워보겠습니다.

`CounterFactory`라는 이름의 팩토리를 생성하여 누구나 자신만의 `Counter` 스마트 계약을 가질 수 있도록 하는 계약을 만들 것입니다. 먼저, 초기 `Counter` 스마트 계약의 코드는 다음과 같습니다.

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "귀하는 계약의 소유자가 아닙니다");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "팩토리를 사용해야 합니다");
        _;
    }

     constructor(address owner) public {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}
```

참고로, 저희는 팩토리의 주소와 계약 소유자의 주소를 추적하기 위해 계약 코드를 약간 수정했습니다. 다른 계약에서 계약 코드를 호출하면, msg.sender는 계약 팩토리의 주소를 참조하게 됩니다. 계약을 사용하여 다른 계약과 상호작용하는 것은 일반적인 관행이므로, 이것은 **반드시 이해해야 할 매우 중요한 점**입니다. 따라서 복잡한 경우에는 발신자가 누구인지 주의해야 합니다.

이를 위해 상태 변경 함수가 팩토리에 의해서만 호출되도록 보장하는 `onlyFactory` 수식어를 추가했으며, 이때 팩토리는 원래 호출자를 매개변수로 전달합니다.

다른 모든 Counter를 관리할 새로운 `CounterFactory` 내부에, 소유자와 해당 카운터 계약 주소를 연결하는 매핑을 추가할 것입니다.

```solidity
mapping(address => Counter) _counters;
```

이더리움에서 매핑은 자바스크립트의 객체와 동일하며, A 유형의 키를 B 유형의 값에 매핑할 수 있게 해줍니다. 이 경우, 우리는 소유자의 주소를 해당 Counter의 인스턴스와 매핑합니다.

누군가를 위해 새로운 Counter를 인스턴스화하는 것은 다음과 같습니다.

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

먼저 해당 사용자가 이미 카운터를 소유하고 있는지 확인합니다. 카운터를 소유하고 있지 않다면, 해당 주소를 `Counter` 생성자에 전달하여 새로운 카운터를 인스턴스화하고 새로 생성된 인스턴스를 매핑에 할당합니다.

특정 Counter의 개수를 가져오는 코드는 다음과 같습니다.

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

첫 번째 함수는 주어진 주소에 대한 Counter 계약이 존재하는지 확인한 다음, 인스턴스에서 `getCount` 메서드를 호출합니다. 두 번째 함수인 `getMyCount`는 msg.sender를 `getCount` 함수에 직접 전달하기 위한 편의 함수입니다.

`increment` 함수도 매우 유사하지만, 원래 트랜잭션 발신자를 `Counter` 계약으로 전달합니다.

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

너무 많이 호출되면 카운터에서 오버플로우가 발생할 수 있다는 점에 유의하세요. 이러한 경우를 방지하려면 [SafeMath 라이브러리](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/)를 최대한 활용해야 합니다.

계약을 배포하려면 `CounterFactory`와 `Counter`의 코드를 모두 제공해야 합니다. 예를 들어 Remix에서 배포할 때, CounterFactory를 선택해야 합니다.

전체 코드는 다음과 같습니다.

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "귀하는 계약의 소유자가 아닙니다");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "팩토리를 사용해야 합니다");
        _;
    }

     constructor(address owner) public {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}

contract CounterFactory {

    mapping(address => Counter) _counters;

    function createCounter() public {
        require (_counters[msg.sender] == Counter(0));
        _counters[msg.sender] = new Counter(msg.sender);
    }

    function increment() public {
        require (_counters[msg.sender] != Counter(0));
        Counter(_counters[msg.sender]).increment(msg.sender);
    }

    function getCount(address account) public view returns (uint256) {
        require (_counters[account] != Counter(0));
        return (_counters[account].getCount());
    }

    function getMyCount() public view returns (uint256) {
        return (getCount(msg.sender));
    }

}
```

컴파일 후, Remix 배포 섹션에서 배포할 팩토리를 선택합니다.

![Remix에서 배포할 팩토리 선택](./counterfactory-deploy.png)

그런 다음 계약 팩토리를 테스트하며 값이 변경되는 것을 확인할 수 있습니다. 다른 주소에서 스마트 계약을 호출하려면 Remix의 계정 선택 메뉴에서 주소를 변경해야 합니다.
