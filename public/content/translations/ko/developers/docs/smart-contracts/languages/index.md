---
title: "스마트 컨트랙트 언어"
description: "두 종류의 주요 smart contract 언어에 대한 요약과 비교 - Solidity 와 Vyper"
lang: ko
---

이더리움의 가장 좋은 점은 smart contract을 개발자 친화적인 언어로 프로그래밍 할 수 있다는 점이다. Python 또는 [중괄호 언어](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages)에 익숙하다면 친숙한 구문을 가진 언어를 찾을 수 있습니다.

가장 활발하고 유지되는 언어들은 다음과 같다:

- 솔리디티
- Vyper

Remix IDE는 Solidity 및 Vyper에서 계약을 생성하고 테스트하기 위한 종합 개발 환경을 제공합니다. [브라우저 내 Remix IDE](https://remix.ethereum.org)에서 코딩을 시작하세요.

더 숙련된 개발자들은 [이더리움 가상 머신](/developers/docs/evm/)을 위한 중간 언어인 Yul 또는 Yul의 확장판인 Yul+를 사용할 수도 있습니다.

만약 당신이 궁금하고 아직 힘들게 개발중인 새로운 언어 테스트를 도와주고 싶다면, smart contract 언어로 떠오르고 있지만 아직은 초창기 단계인 Fe 언어를 시도해볼 수 있다.

## 필수 구성 요소 {#prerequisites}

특히 Javascript나 Python에 대해 미리 알고 있다면, smart contract 언어의 차이를 이해하는데 도움을 줄 수 있다. 언어에 대한 차이를 너무 깊게 파고들기 전에 smart contract 개념을 먼저 이해하는 것을 추천한다. [스마트 계약 소개](/developers/docs/smart-contracts/).

## 솔리디티 {#solidity}

- Smart contract를 구현하기 위한 객체지향의 고급 언어 (high-level language).
- C++로부터 영향을 가장 많이 받은 Curly-bracket 언어.
- 정적 프로그래밍 언어 (자료형이 컴파일 시 결정되는 언어).
- 지원:
  - 상속 (다른 contract으로 확장할 수 있음).
  - 라이브러리 (객체지향 프로그래밍 언어에서 정적(static) 클래스에 있는 정적 함수처럼 서로 다른 contract에서 부를 수 있는 재사용이 가능한 코드를 만들 수 있음).
  - Complex user-defined types.

### 중요 링크 {#important-links}

- [개발문서](https://docs.soliditylang.org/en/latest/)
- [솔리디티 언어 포털](https://soliditylang.org/)
- [솔리디티 예제](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter 채팅방](https://gitter.im/ethereum/solidity), [Solidity Matrix 채팅방](https://matrix.to/#/#ethereum_solidity:gitter.im)과 브리지됨
- [치트 시트](https://reference.auditless.com/cheatsheet)
- [솔리디티 블로그](https://blog.soliditylang.org/)
- [솔리디티 트위터](https://twitter.com/solidity_lang)

### 예제 계약 {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // "public" 키워드는 변수를
    // 다른 계약에서 접근할 수 있도록 합니다
    address public minter;
    mapping (address => uint) public balances;

    // 이벤트는 클라이언트가 선언한 특정
    // 계약 변경에 반응할 수 있도록 합니다
    event Sent(address from, address to, uint amount);

    // 생성자 코드는 계약이
    // 생성될 때만 실행됩니다
    constructor() {
        minter = msg.sender;
    }

    // 새로 생성된 코인을 주소로 전송합니다
    // 계약 생성자만 호출할 수 있습니다
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // 기존 코인을
    // 모든 호출자로부터 주소로 전송합니다
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "잔액이 부족합니다.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

이 예제를 통해 Solidity contract 문법이 어떤지 감을 찾을 수 있다. 함수와 변수에 대한 더 자세한 설명은 [문서를 참조하세요](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Pythonic 프로그래밍 언어
- 강한 타입
- 작고 이해하기 쉬운 컴파일러 코드
- 효율적인 바이트코드 생성
- Contract을 더 안전하고 검사하기 쉽게 일부러 Solidity보다 기능이 적음. Vyper는 아래를 지원하지 않음:
  - 제어자 (Modifiers)
  - 상속
  - 인라인 어셈블리 (Inline assembly)
  - 함수 오버로드
  - 연산자 오버로드
  - 재귀 호출
  - 무한 루프
  - 이진 고정점 (Binary fixed points)

자세한 내용은 [Vyper의 기본 원칙을 읽어보세요](https://vyper.readthedocs.io/en/latest/index.html).

### 중요 링크 {#important-links-1}

- [개발문서](https://vyper.readthedocs.io)
- [예제로 배우는 Vyper](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [예제로 배우는 Vyper 더 보기](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper 커뮤니티 Discord 채팅](https://discord.gg/SdvKC79cJk)
- [치트 시트](https://reference.auditless.com/cheatsheet)
- [Vyper를 위한 스마트 계약 개발 프레임워크 및 도구](/developers/docs/programming-languages/python/)
- [VyperPunk - Vyper 스마트 계약을 보호하고 해킹하는 방법 배우기](https://github.com/SupremacyTeam/VyperPunk)
- [개발을 위한 Vyper 허브](https://github.com/zcor/vyper-dev)
- [Vyper 인기 스마트 계약 예제](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [엄선된 Vyper 참고 자료 모음](https://github.com/spadebuilders/awesome-vyper)

### 예제 {#example}

```python
# 공개 경매

# 경매 매개변수
# 수익자는 최고 입찰자로부터 금액을 받습니다
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# 경매의 현재 상태
highestBidder: public(address)
highestBid: public(uint256)

# 종료 시 true로 설정, 모든 변경을 금지합니다
ended: public(bool)

# 출금 패턴을 따를 수 있도록 환불된 입찰을 추적합니다
pendingReturns: public(HashMap[address, uint256])

# `_bidding_time`을 사용하여 간단한 경매를 생성합니다
# `_beneficiary` 주소를 대신하여
# 초 단위 입찰 시간을 지정합니다.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# 이 트랜잭션과 함께 전송된 금액으로 경매에
# 입찰합니다.
# 이 금액은 경매에서 이기지 못할 경우에만
# 환불됩니다.
@external
@payable
def bid():
    # 입찰 기간이 끝났는지 확인합니다.
    assert block.timestamp < self.auctionEnd
    # 입찰가가 충분히 높은지 확인합니다.
    assert msg.value > self.highestBid
    # 이전 최고 입찰자에 대한 환불을 추적합니다.
    self.pendingReturns[self.highestBidder] += self.highestBid
    # 새로운 최고 입찰가를 추적합니다.
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# 이전에 환불된 입찰을 출금합니다. 출금 패턴은
# 보안 문제를 피하기 위해 여기서 사용됩니다. 만약 환불이
# bid()의 일부로 직접 전송된다면, 악의적인 입찰 계약이
# 해당 환불을 막고, 따라서 더 높은 새로운 입찰이 들어오는 것을
# 막을 수 있습니다.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# 경매를 종료하고 최고 입찰가를
# 수익자에게 전송합니다.
@external
def endAuction():
    # 다른 계약과 상호 작용하는(즉, 함수를 호출하거나 이더를 보내는)
    # 함수를 세 단계로 구성하는 것이 좋은 지침입니다.
    # 1. 조건 확인
    # 2. 작업 수행(조건을 변경할 수 있음)
    # 3. 다른 계약과 상호 작용
    # 이러한 단계가 혼합되면 다른 계약이
    # 현재 계약으로 다시 호출하여 상태를 수정하거나
    # 효과(이더 지급)가 여러 번 수행되도록 할 수 있습니다.
    # 내부적으로 호출된 함수가 외부 계약과의
    # 상호 작용을 포함하는 경우, 이들도 외부 계약과의
    # 상호 작용으로 간주되어야 합니다.

    # 1. 조건
    # 경매 종료 시간에 도달했는지 확인합니다.
    assert block.timestamp >= self.auctionEnd
    # 이 함수가 이미 호출되었는지 확인합니다.
    assert not self.ended

    # 2. 효과
    self.ended = True

    # 3. 상호 작용
    send(self.beneficiary, self.highestBid)
```

이 예제를 통해 Vyper contract 문법이 어떤지 감을 찾을 수 있다. 함수와 변수에 대한 더 자세한 설명은 [문서를 참조하세요](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul 및 Yul+ {#yul}

이더리움을 처음 접하고 아직 스마트 계약 언어로 코딩해본 적이 없다면, Solidity 또는 Vyper로 시작하는 것이 좋습니다. 스마트 계약 보안 모범 사례와 EVM 작업의 구체적인 사항에 익숙해진 후에 Yul 또는 Yul+를 탐색하세요.

**Yul**

- 이더리움을 위한 중간 언어입니다.
- [EVM](/developers/docs/evm)과 이더리움 기반의 웹어셈블리인 [Ewasm](https://github.com/ewasm)을 지원하며, 두 플랫폼 모두에서 사용할 수 있는 공통 분모로 설계되었습니다.
- EVM과 Ewasm 플랫폼 모두에 유리한 고급 최적화 단계를 위한 좋은 목표입니다.

**Yul+**

- Yul의 저수준 및 고효율 확장입니다.
- 처음에는 [낙관적 롤업](/developers/docs/scaling/optimistic-rollups/) 계약을 위해 설계되었습니다.
- Yul+는 Yul의 새로운 기능을 추가하는 실험적 업그레이드 제안으로 볼 수 있습니다.

### 중요 링크 {#important-links-2}

- [Yul 개발문서](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ 개발문서](https://github.com/fuellabs/yulp)
- [Yul+ 소개 게시물](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### 예제 계약 {#example-contract-2}

다음의 간단한 예는 제곱 함수(power function)를 구현합니다. `solc --strict-assembly --bin input.yul`을 사용하여 컴파일할 수 있습니다. 이 예시는 input.yul 파일에 저장해야 합니다.

```
{
    function power(base, exponent) -> result
    {
        switch exponent
        case 0 { result := 1 }
        case 1 { result := base }
        default
        {
            result := power(mul(base, base), div(exponent, 2))
            if mod(exponent, 2) { result := mul(base, result) }
        }
    }
    let res := power(calldataload(0), calldataload(32))
    mstore(0, res)
    return(0, 32)
}
```

스마트 계약에 이미 매우 익숙하다면 Yul로 구현된 전체 ERC20을 [여기](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example)에서 찾을 수 있습니다.

## Fe {#fe}

- 이더리움 가상 머신(EVM)을 위한 정적 타입 언어입니다.
- Python과 Rust에서 영감을 받았습니다.
- 이더리움 생태계에 처음인 개발자도 쉽게 배울 수 있도록 설계되었습니다.
- Fe 개발은 아직 초기 단계이며, 2021년 1월에 알파 버전이 출시되었습니다.

### 중요 링크 {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fe 발표](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021 로드맵](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe Discord 채팅](https://discord.com/invite/ywpkAXFjZH)
- [Fe 트위터](https://twitter.com/official_fe)

### 예제 계약 {#example-contract-3}

다음은 Fe로 구현된 간단한 계약입니다.

```
type BookMsg = bytes[100]

contract GuestBook:
    pub guest_book: map<address, BookMsg>

    event Signed:
        book_msg: BookMsg

    pub def sign(book_msg: BookMsg):
        self.guest_book[msg.sender] = book_msg

        emit Signed(book_msg=book_msg)

    pub def get_msg(addr: address) -> BookMsg:
        return self.guest_book[addr].to_mem()

```

## 선택 방법 {#how-to-choose}

다른 프로그래밍 언어와 마찬가지로 작업에 적합한 도구를 선택하는 것이 중요하며, 개인적인 선호도도 고려해야 합니다.

솔리디티의 장점은 무엇인가요?

### 초보자에게는 다양한 튜토리얼과 학습 도구가 있습니다. {#solidity-advantages}

- <a href="/developers/learning-tools/">코딩으로 배우기</a> 섹션에서 더 알아볼 수 있습니다. 자세한 내용은 [코딩으로 배우기](/developers/learning-tools/) 섹션을 참조하세요.
- 좋은 개발자 툴링을 사용할 수 있습니다.
- 솔리디티는 큰 개발자 커뮤니티가 있어 질문에 대한 답변을 쉽게 찾을 수 있습니다.

### Vyper의 장점은 무엇인가요? {#vyper-advatages}

- 스마트 계약을 작성하고자 하는 Python 개발자에게 훌륭한 출발점입니다.
- 기능 수가 적어 아이디어를 빠르게 프로토타입하는 데 적합합니다.
- Vyper는 감사하기 쉽고 가독성이 뛰어납니다.

### Yul과 Yul+의 장점은 무엇인가요? {#yul-advantages}

- 간단하고 기능적인 저수준 언어입니다.
- 계약의 가스 사용량 최적화에 도움이 되는 원시 EVM에 더 가깝게 접근할 수 있습니다.

## 언어 비교 {#language-comparisons}

기본 구문, 계약 수명 주기, 인터페이스, 연산자, 데이터 구조, 함수, 제어 흐름 등을 비교하려면 Auditless의 [치트 시트](https://reference.auditless.com/cheatsheet/)를 확인하세요.

## 더 읽어보기 {#further-reading}

- [OpenZeppelin의 솔리디티 계약 라이브러리](https://docs.openzeppelin.com/contracts/5.x/)
- [예제로 배우는 솔리디티](https://solidity-by-example.org)
