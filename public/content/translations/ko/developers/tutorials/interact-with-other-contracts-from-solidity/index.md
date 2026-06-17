---
title: Solidity에서 다른 컨트랙트와 상호작용하기
description: 기존 컨트랙트에서 스마트 컨트랙트를 배포하고 상호작용하는 방법
author: "jdourlens"
tags: ["스마트 컨트랙트", "solidity", "remix", "배포", "결합성"]
skill: advanced
breadcrumb: 컨트랙트 상호작용
lang: ko
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

이전 튜토리얼에서 우리는 [첫 번째 스마트 컨트랙트를 배포하는 방법](/developers/tutorials/deploying-your-first-smart-contract/)과 [제어자를 사용한 접근 제어](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) 또는 [Solidity의 에러 처리](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/)와 같은 몇 가지 기능을 추가하는 방법에 대해 많이 배웠습니다. 이번 튜토리얼에서는 기존 컨트랙트에서 스마트 컨트랙트를 배포하고 상호작용하는 방법을 배워보겠습니다.

우리는 팩토리를 생성하여 누구나 자신만의 `Counter` 스마트 컨트랙트를 가질 수 있게 해주는 컨트랙트를 만들 것이며, 그 이름은 `CounterFactory`가 될 것입니다. 먼저 초기 `Counter` 스마트 컨트랙트의 코드는 다음과 같습니다.

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
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

팩토리의 주소와 컨트랙트 소유자의 주소를 추적하기 위해 컨트랙트 코드를 약간 수정했다는 점에 유의하세요. 다른 컨트랙트에서 컨트랙트 코드를 호출할 때, msg.sender는 컨트랙트 팩토리의 주소를 참조하게 됩니다. 컨트랙트를 사용하여 다른 컨트랙트와 상호작용하는 것은 일반적인 관행이므로 이는 **이해해야 할 매우 중요한 점**입니다. 따라서 복잡한 경우에는 발신자가 누구인지 주의해야 합니다.

이를 위해 우리는 상태 변경 함수가 원래 호출자를 매개변수로 전달할 팩토리에 의해서만 호출될 수 있도록 보장하는 `onlyFactory` 제어자도 추가했습니다.

다른 모든 Counter를 관리할 새로운 `CounterFactory` 내부에, 소유자를 그의 카운터 컨트랙트 주소와 연결하는 매핑을 추가할 것입니다.

```solidity
mapping(address => Counter) _counters;
```

이더리움에서 매핑은 JavaScript의 객체와 동일하며, A 타입의 키를 B 타입의 값에 매핑할 수 있게 해줍니다. 이 경우 우리는 소유자의 주소를 해당 Counter의 인스턴스와 매핑합니다.

누군가를 위해 새로운 Counter를 인스턴스화하는 것은 다음과 같습니다.

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

먼저 해당 사람이 이미 카운터를 소유하고 있는지 확인합니다. 카운터를 소유하고 있지 않다면, 그의 주소를 `Counter` 생성자에 전달하여 새로운 카운터를 인스턴스화하고 새로 생성된 인스턴스를 매핑에 할당합니다.

특정 Counter의 카운트를 가져오는 것은 다음과 같습니다.

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

첫 번째 함수는 주어진 주소에 대해 Counter 컨트랙트가 존재하는지 확인한 다음 인스턴스에서 `getCount` 메서드를 호출합니다. 두 번째 함수인 `getMyCount`는 msg.sender를 `getCount` 함수에 직접 전달하기 위한 간단한 단축 함수입니다.

`increment` 함수도 꽤 비슷하지만 원래 트랜잭션 발신자를 `Counter` 컨트랙트에 전달합니다.

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

너무 많이 호출될 경우, 우리의 카운터가 오버플로의 희생양이 될 수 있다는 점에 유의하세요. 이러한 가능한 상황으로부터 보호하기 위해 가능한 한 [SafeMath 라이브러리](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/)를 사용해야 합니다.

컨트랙트를 배포하려면 `CounterFactory`와 `Counter`의 코드를 모두 제공해야 합니다. 예를 들어 Remix에서 배포할 때는 CounterFactory를 선택해야 합니다.

전체 코드는 다음과 같습니다.

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
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

컴파일링 후, Remix 배포 섹션에서 배포할 팩토리를 선택합니다.

![Selecting the factory to be deployed in Remix](./counterfactory-deploy.png)

그런 다음 컨트랙트 팩토리를 테스트해 보며 값이 변경되는 것을 확인할 수 있습니다. 다른 주소에서 스마트 컨트랙트를 호출하려면 Remix의 계정(Account) 선택에서 주소를 변경해야 합니다.