---
title: 스마트 컨트랙트 소개
description: 스마트 컨트랙트의 고유한 특징과 한계에 초점을 맞춘 개요입니다.
lang: ko
---

## 스마트 컨트랙트란 무엇인가요? {#what-is-a-smart-contract}

"스마트 컨트랙트"는 단순히 [이더리움](/) 블록체인에서 실행되는 프로그램입니다. 이는 이더리움 블록체인의 특정 주소에 존재하는 코드(함수)와 데이터(상태)의 모음입니다.

스마트 컨트랙트는 [이더리움 계정](/developers/docs/accounts/)의 한 종류입니다. 즉, 잔액을 보유하며 트랜잭션의 대상이 될 수 있습니다. 하지만 사용자가 제어하는 것이 아니라 네트워크에 배포되어 프로그래밍된 대로 실행됩니다. 사용자 계정은 스마트 컨트랙트에 정의된 함수를 실행하는 트랜잭션을 제출하여 스마트 컨트랙트와 상호작용할 수 있습니다. 스마트 컨트랙트는 일반적인 계약처럼 규칙을 정의하고 코드를 통해 이를 자동으로 강제할 수 있습니다. 기본적으로 스마트 컨트랙트는 삭제할 수 없으며, 스마트 컨트랙트와의 상호작용은 되돌릴 수 없습니다.

## 전제 조건 {#prerequisites}

이제 막 시작했거나 덜 기술적인 소개를 찾고 있다면, [스마트 컨트랙트 소개](/smart-contracts/)를 추천합니다.

스마트 컨트랙트의 세계로 뛰어들기 전에 [계정](/developers/docs/accounts/), [트랜잭션](/developers/docs/transactions/) 및 [이더리움 가상 머신](/developers/docs/evm/)에 대해 읽어보시기 바랍니다.

## 디지털 자판기 {#a-digital-vending-machine}

[닉 사보(Nick Szabo)](https://unenumerated.blogspot.com/)가 설명한 것처럼, 스마트 컨트랙트를 가장 잘 비유할 수 있는 것은 자판기일 것입니다. 올바른 입력이 주어지면 특정 출력이 보장됩니다.

자판기에서 간식을 뽑으려면 다음과 같이 합니다.

```
돈 + 간식 선택 = 간식 나옴
```

이러한 로직이 자판기에 프로그래밍되어 있습니다.

스마트 컨트랙트도 자판기처럼 로직이 프로그래밍되어 있습니다. 이 자판기가 Solidity로 작성된 스마트 컨트랙트라면 어떤 모습일지 보여주는 간단한 예시는 다음과 같습니다.

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // 컨트랙트의 상태 변수를 선언합니다
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // 'VendingMachine' 컨트랙트가 배포될 때:
    // 1. 배포 주소를 컨트랙트의 소유자로 설정합니다
    // 2. 배포된 스마트 컨트랙트의 컵케이크 잔액을 100으로 설정합니다
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // 소유자가 스마트 컨트랙트의 컵케이크 잔액을 증가시킬 수 있도록 허용합니다
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // 누구나 컵케이크를 구매할 수 있도록 허용합니다
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

자판기가 판매 직원의 필요성을 없애주는 것처럼, 스마트 컨트랙트는 많은 산업에서 중개자를 대체할 수 있습니다.

## 무허가성 {#permissionless}

누구나 스마트 컨트랙트를 작성하여 네트워크에 배포할 수 있습니다. [스마트 컨트랙트 언어](/developers/docs/smart-contracts/languages/)로 코딩하는 방법을 배우고, 컨트랙트를 배포할 수 있는 충분한 ETH만 있으면 됩니다. 스마트 컨트랙트를 배포하는 것은 기술적으로 트랜잭션이므로, 단순한 ETH 전송에 가스를 지불하는 것과 같은 방식으로 [가스](/developers/docs/gas/)를 지불해야 합니다. 하지만 컨트랙트 배포에 드는 가스 비용은 훨씬 더 높습니다.

이더리움에는 스마트 컨트랙트를 작성하기 위한 개발자 친화적인 언어들이 있습니다.

- Solidity
- Vyper

[언어에 대해 더 알아보기](/developers/docs/smart-contracts/languages/)

하지만 이더리움 가상 머신이 컨트랙트를 해석하고 저장할 수 있도록 배포 전에 반드시 컴파일되어야 합니다. [컴파일에 대해 더 알아보기](/developers/docs/smart-contracts/compiling/)

## 조합성 {#composability}

스마트 컨트랙트는 이더리움 상에 공개되어 있으며 오픈 API로 생각할 수 있습니다. 즉, 자신의 스마트 컨트랙트에서 다른 스마트 컨트랙트를 호출하여 가능한 기능을 크게 확장할 수 있습니다. 심지어 컨트랙트가 다른 컨트랙트를 배포할 수도 있습니다.

[스마트 컨트랙트 조합성](/developers/docs/smart-contracts/composability/)에 대해 자세히 알아보세요.

## 한계 {#limitations}

스마트 컨트랙트 단독으로는 오프체인 소스에서 데이터를 가져올 수 없기 때문에 "현실 세계"의 이벤트에 대한 정보를 얻을 수 없습니다. 즉, 현실 세계의 이벤트에 반응할 수 없습니다. 이는 의도적으로 설계된 것입니다. 외부 정보에 의존하면 보안과 탈중앙화에 중요한 합의를 위태롭게 할 수 있기 때문입니다.

하지만 블록체인 애플리케이션이 오프체인 데이터를 사용할 수 있는 것은 중요합니다. 이에 대한 해결책은 오프체인 데이터를 수집하여 스마트 컨트랙트에서 사용할 수 있게 해주는 도구인 [오라클](/developers/docs/oracles/)입니다.

스마트 컨트랙트의 또 다른 한계는 최대 컨트랙트 크기입니다. 스마트 컨트랙트의 최대 크기는 24KB이며, 이를 초과하면 가스가 고갈됩니다. 이는 [다이아몬드 패턴(The Diamond Pattern)](https://eips.ethereum.org/EIPS/eip-2535)을 사용하여 우회할 수 있습니다.

## 다중서명 컨트랙트 {#multisig}

다중서명(Multisig) 컨트랙트는 트랜잭션을 실행하기 위해 여러 개의 유효한 서명이 필요한 스마트 컨트랙트 계정입니다. 이는 상당한 양의 이더나 다른 토큰을 보유한 컨트랙트의 단일 장애점(single point of failure)을 피하는 데 매우 유용합니다. 또한 다중서명은 컨트랙트 실행 및 키 관리 책임을 여러 당사자에게 분산시키고, 단일 개인 키의 분실이 돌이킬 수 없는 자금 손실로 이어지는 것을 방지합니다. 이러한 이유로 다중서명 컨트랙트는 간단한 DAO 거버넌스에 사용될 수 있습니다. 다중서명은 실행을 위해 허용 가능한 M개의 서명 중 N개의 서명(N ≤ M, M > 1)을 요구합니다. `N = 3, M = 5` 및 `N = 4, M = 7`이 일반적으로 사용됩니다. 4/7 다중서명은 7개의 가능한 유효 서명 중 4개가 필요합니다. 즉, 3개의 서명을 분실하더라도 자금을 회수할 수 있습니다. 이 경우, 컨트랙트가 실행되려면 키 보유자의 과반수가 동의하고 서명해야 함을 의미하기도 합니다.

## 스마트 컨트랙트 리소스 {#smart-contract-resources}

**오픈제플린 컨트랙트 -** **_안전한 스마트 컨트랙트 개발을 위한 라이브러리입니다._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [커뮤니티 포럼](https://forum.openzeppelin.com/c/general/16)

## 더 읽어보기 {#further-reading}

- [코인베이스: 스마트 컨트랙트란 무엇인가요?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [체인링크: 스마트 컨트랙트란 무엇인가요?](https://chain.link/education/smart-contracts)
- [동영상: 쉽게 설명하는 스마트 컨트랙트](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: Web3 학습 및 감사 플랫폼](https://updraft.cyfrin.io)

## 튜토리얼: 이더리움의 스마트 컨트랙트 서명(EIP-1271) {#tutorials}

- [EIP-1271: 스마트 컨트랙트 서명하기 및 검증](/developers/tutorials/eip-1271-smart-contract-signatures/) _– EIP-1271이 스마트 컨트랙트에서 서명을 검증할 수 있게 하는 방법과 Safe 구현에 대한 설명입니다._