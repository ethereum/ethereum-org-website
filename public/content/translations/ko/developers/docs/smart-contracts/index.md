---
title: "스마트 계약 소개"
description: "스마트 컨트랙트의 개요, 고유한 특징과 한계에 집중하여"
lang: ko
---

## 스마트 컨트랙트란 무엇인가요? 스마트 계약이란 무엇인가요? {#what-is-a-smart-contract}

"스마트 컨트랙트"란 간단히 말해서 이더리움 블록체인 상에서 작동하는 프로그램입니다. 이것은 이더리움 블록체인 상에서 특정한 주소에 살고 있는 코드(함수들) 와 데이터(상태) 의 모음입니다.

스마트 계약은 [이더리움 계정](/developers/docs/accounts/)의 한 유형입니다. 이는 잔액을 가지고 있으며 트랜잭션의 대상이 될 수 있음을 의미합니다. 그러나 사용자에 의해 조작되지 않고, 대신에 네트워크에 의해 배포되고 프로그램된 대로 작동합니다. 그렇기에 사용자 계정은 스마트 컨트랙트에 정의된 함수를 실행하는 트랜잭션을 제출함으로써 스마트 컨트랙트와 상호 작용할 수 있습니다. 스마트 컨트랙트는 일반적인 계약처럼 규칙을 정의할 수 있고, 코드를 통해 자동으로 규칙을 시행하기도 합니다. 스마트 계약은 기본적으로 삭제할 수 없으며, 스마트 계약과의 상호작용은 되돌릴 수 없습니다.

## 필수 구성 요소 {#prerequisites}

이제 막 시작하셨거나 덜 기술적인 소개를 찾고 계신다면, 저희의 [스마트 계약 소개](/smart-contracts/)를 추천합니다.

스마트 계약의 세계로 뛰어들기 전에 [계정](/developers/docs/accounts/), [트랜잭션](/developers/docs/transactions/), 그리고 [이더리움 가상 머신](/developers/docs/evm/)에 대해 충분히 숙지하시기 바랍니다.

## 디지털 자판기 {#a-digital-vending-machine}

스마트 계약에 대한 가장 좋은 비유는 [Nick Szabo](https://unenumerated.blogspot.com/)가 설명한 자판기일 것입니다. 올바른 입력으로, 확실한 결과가 보장됩니다.

자판기에서 snack을 사려면:

```
돈 + 간식 선택 = 간식 제공
```

이 로직은 자판기 안에 프로그램되었습니다.

자판기처럼 스마트 컨트랙트는 내부에 프로그램된 로직을 갖고 있습니다. 이 자판기가 솔리디티로 작성된 스마트 계약이라면 다음과 같이 보일 것입니다.

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // 계약의 상태 변수 선언
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // 'VendingMachine' 계약이 배포될 때:
    // 1. 배포하는 주소를 계약의 소유자로 설정
    // 2. 배포된 스마트 계약의 컵케이크 잔액을 100으로 설정
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // 소유자가 스마트 계약의 컵케이크 잔액을 늘릴 수 있도록 허용
    function refill(uint amount) public {
        require(msg.sender == owner, "소유자만 리필할 수 있습니다.");
        cupcakeBalances[address(this)] += amount;
    }

    // 누구나 컵케이크를 구매할 수 있도록 허용
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "컵케이크당 최소 1 ETH를 지불해야 합니다.");
        require(cupcakeBalances[address(this)] >= amount, "이 구매를 완료하기에 재고가 충분하지 않습니다.");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

자판기가 종업원에 대한 필요성을 없앤 것처럼, 스마트 컨트랙트는 많은 산업에서 중재자를 대체할 수 있습니다.

## 무허가성 {#permissionless}

누구나 스마트 컨트랙트를 작성할 수 있고 네트워크에 배포할 수 있습니다. 그저 [스마트 계약 언어](/developers/docs/smart-contracts/languages/)로 코딩하는 법을 배우고, 계약을 배포하기에 충분한 ETH만 있으면 됩니다. 스마트 계약 배포는 기술적으로 트랜잭션이므로, 간단한 ETH 전송에 가스를 지불해야 하는 것과 같은 방식으로 [가스](/developers/docs/gas/)를 지불해야 합니다. 그러나 계약 배포의 가스 비용은 훨씬 높습니다.

이더리움은 스마트 컨트랙트 작성을 위한 개발자-친화적인 언어들을 갖고 있습니다.

- 솔리디티
- Vyper

[언어에 대해 더 알아보기](/developers/docs/smart-contracts/languages/)

그러나, 이더리움 가상 머신이 컨트랙트를 해석하고 저장하기 위해서 이 언어들은 배포되기 전에 컴파일 되어야 합니다. [컴파일에 대해 더 알아보기](/developers/docs/smart-contracts/compiling/)

## 구성 가능성 {#composability}

스마트 컨트랙트는 이더리움 상에서 공개되어 오픈 API처럼 생각할 수 있습니다. 이는 스마트 계약에서 다른 스마트 계약을 호출하여 가능성을 크게 확장할 수 있음을 의미합니다. 심지어 컨트랙트는 다른 컨트랙트를 배포하기도 가능합니다.

[스마트 계약 구성 가능성](/developers/docs/smart-contracts/composability/)에 대해 더 알아보세요.

## 한계 {#limitations}

스마트 계약만으로는 오프체인 소스에서 데이터를 가져올 수 없기 때문에 "현실 세계" 이벤트에 대한 정보를 얻을 수 없습니다. 이들은 현실 세계의 사건에 반응할 수 없습니다. 이는 설계된 것입니다. 외부 정보에 의존하는 것은 합의를 위협할 수 있고, 이는 보안과 탈중앙화에 중요합니다.

그러나 블록체인 애플리케이션이 오프체인 데이터를 사용할 수 있는 것이 중요합니다. 해결책은 오프체인 데이터를 가져와 스마트 계약에서 사용할 수 있도록 하는 도구인 [오라클](/developers/docs/oracles/)입니다.

스마트 컨트랙트의 다른 한계는 컨트랙트 최대 사이즈입니다. 스마트 컨트랙트는 최대 24KB까지 가능하거나 가스를 다 써버릴 수도 있습니다. [다이아몬드 패턴(The Diamond Pattern)](https://eips.ethereum.org/EIPS/eip-2535)을 사용하여 이 문제를 해결할 수 있습니다.

## 멀티시그 계약 {#multisig}

멀티시그(다중 서명) 계약은 거래를 실행하기 위해 여러 유효한 서명을 필요로 하는 스마트 계약 계정입니다. 이는 상당한 양의 이더 또는 기타 토큰을 보유한 계약에서 단일 실패 지점을 방지하는 데 매우 유용합니다. 멀티시그는 또한 계약 실행 및 키 관리를 여러 당사자로 분산시키며, 단일 프라이빗 키의 손실로 인해 자금을 영구적으로 잃지 않도록 합니다. 이러한 이유로 멀티시그 계약은 간단한 DAO 거버넌스에도 사용할 수 있습니다. 멀티시그는 실행을 위해 M개의 허용 가능한 서명 중 N개의 서명을 필요로 합니다(N ≤ M, 그리고 M > 1). `N = 3, M = 5`와 `N = 4, M = 7`이 일반적으로 사용됩니다. 4/7 멀티시그는 7개의 가능한 서명 중 4개가 유효한 서명임을 요구합니다. 이는 3개의 서명을 잃어도 자금을 여전히 복구할 수 있다는 의미입니다. 이 경우 또한 계약을 실행하려면 다수의 키 보유자가 동의하고 서명해야 한다는 것을 의미합니다.

## 스마트 계약 참고 자료 {#smart-contract-resources}

**OpenZeppelin Contracts -** **_안전한 스마트 계약 개발을 위한 라이브러리._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [커뮤니티 포럼](https://forum.openzeppelin.com/c/general/16)

## 더 읽어보기 {#further-reading}

- [Coinbase: 스마트 계약이란 무엇인가요?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: 스마트 계약이란 무엇인가요?](https://chain.link/education/smart-contracts)
- [영상: 간단한 설명 - 스마트 계약](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: 웹3 학습 및 감사 플랫폼](https://updraft.cyfrin.io)
