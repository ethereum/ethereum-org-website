---
title: "스마트 컨트랙트 언어"
description: "두 가지 주요 스마트 컨트랙트 언어인 Solidity와 Vyper에 대한 개요 및 비교입니다."
lang: ko
---

[이더리움](/)의 훌륭한 점 중 하나는 비교적 개발자 친화적인 언어를 사용하여 스마트 컨트랙트를 프로그래밍할 수 있다는 것입니다. Python이나 [중괄호를 사용하는 언어(curly-bracket language)](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages)에 익숙하다면 친숙한 구문을 가진 언어를 찾을 수 있습니다.

가장 활발하게 유지 관리되는 두 가지 언어는 다음과 같습니다.

- Solidity
- Vyper

Remix IDE는 Solidity와 Vyper 모두에서 컨트랙트를 생성하고 테스트할 수 있는 포괄적인 개발 환경을 제공합니다. 코딩을 시작하려면 [브라우저 기반 Remix IDE를 사용해 보세요](https://remix.ethereum.org).

경험이 많은 개발자라면 [이더리움 가상 머신(EVM)](/developers/docs/evm/)을 위한 중간 언어인 Yul이나 Yul의 확장인 Yul+를 사용하고 싶을 수도 있습니다.

호기심이 많고 아직 활발히 개발 중인 새로운 언어를 테스트하는 데 도움을 주고 싶다면, 현재 초기 단계에 있는 새로운 스마트 컨트랙트 언어인 Fe를 실험해 볼 수 있습니다.

## 전제 조건 {#prerequisites}

프로그래밍 언어, 특히 JavaScript나 Python에 대한 사전 지식이 있으면 스마트 컨트랙트 언어의 차이점을 이해하는 데 도움이 될 수 있습니다. 또한 언어 비교에 대해 너무 깊이 파고들기 전에 스마트 컨트랙트의 개념을 이해하는 것을 권장합니다. [스마트 컨트랙트 소개](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- 스마트 컨트랙트 구현을 위한 객체 지향 고급 언어입니다.
- C++의 영향을 가장 많이 받은 중괄호 언어입니다.
- 정적 타입 언어입니다(컴파일 시점에 변수의 타입이 결정됨).
- 지원 기능:
  - 상속(다른 컨트랙트를 확장할 수 있습니다).
  - 라이브러리(다른 객체 지향 프로그래밍 언어의 정적 클래스 내 정적 함수처럼, 여러 컨트랙트에서 호출할 수 있는 재사용 가능한 코드를 생성할 수 있습니다).
  - 복잡한 사용자 정의 타입.

### 주요 링크 {#important-links}

- [문서](https://docs.soliditylang.org/en/latest/)
- [Solidity 언어 포털](https://soliditylang.org/)
- [예제로 배우는 Solidity](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Matrix 채팅방](https://matrix.to/#/#ethereum_solidity:gitter.im)과 연결된 [Solidity Gitter 채팅방](https://gitter.im/ethereum/solidity)
- [치트 시트](https://reference.auditless.com/cheatsheet)
- [Solidity 블로그](https://blog.soliditylang.org/)
- [Solidity 트위터](https://twitter.com/solidity_lang)

### 예제 컨트랙트 {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // "public" 키워드는 변수를
    // 다른 컨트랙트에서 접근할 수 있게 합니다
    address public minter;
    mapping (address => uint) public balances;

    // 이벤트는 클라이언트가 선언한 특정
    // 컨트랙트 변경에 반응할 수 있게 합니다
    event Sent(address from, address to, uint amount);

    // 생성자 코드는 컨트랙트가
    // 생성될 때만 실행됩니다
    constructor() {
        minter = msg.sender;
    }

    // 새로 생성된 코인을 특정 주소로 보냅니다
    // 컨트랙트 생성자만 호출할 수 있습니다
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // 기존 코인을
    // 호출자로부터 특정 주소로 보냅니다
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

이 예제를 통해 Solidity 컨트랙트 구문이 어떤 느낌인지 파악할 수 있습니다. 함수와 변수에 대한 더 자세한 설명은 [문서를 참조하세요](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Pythonic 프로그래밍 언어
- 강력한 타입 지정(Strong typing)
- 작고 이해하기 쉬운 컴파일러 코드
- 효율적인 바이트코드 생성
- 컨트랙트를 더 안전하고 감사하기 쉽게 만들 목적으로 의도적으로 Solidity보다 적은 기능을 제공합니다. Vyper는 다음을 지원하지 않습니다.
  - 제어자(Modifiers)
  - 상속
  - 인라인 어셈블리
  - 함수 오버로딩
  - 연산자 오버로딩
  - 재귀 호출
  - 무한 루프
  - 이진 고정 소수점

자세한 내용은 [Vyper의 설계 원칙을 읽어보세요](https://vyper.readthedocs.io/en/latest/index.html).

### 주요 링크 {#important-links-1}

- [문서](https://vyper.readthedocs.io)
- [예제로 배우는 Vyper](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [더 많은 Vyper 예제](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper 커뮤니티 디스코드 채팅](https://discord.gg/SdvKC79cJk)
- [치트 시트](https://reference.auditless.com/cheatsheet)
- [Vyper를 위한 스마트 컨트랙트 개발 프레임워크 및 도구](/developers/docs/programming-languages/python/)
- [VyperPunk - Vyper 스마트 컨트랙트 보안 및 해킹 배우기](https://github.com/SupremacyTeam/VyperPunk)
- [개발을 위한 Vyper Hub](https://github.com/zcor/vyper-dev)
- [Vyper 인기 스마트 컨트랙트 예제 모음](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Awesome Vyper 큐레이션 리소스](https://github.com/spadebuilders/awesome-vyper)

### 예제 {#example}

```python
# 공개 경매

# 경매 매개변수
# 수혜자는 최고 입찰자로부터 돈을 받습니다
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# 경매의 현재 상태
highestBidder: public(address)
highestBid: public(uint256)

# 종료 시 true로 설정되며, 어떠한 변경도 허용하지 않습니다
ended: public(bool)

# 출금 패턴을 따를 수 있도록 환불된 입찰을 추적합니다
pendingReturns: public(HashMap[address, uint256])

# `_bidding_time`의
# 초 입찰 시간을 가진 간단한 경매를
# 수혜자 주소 `_beneficiary`를 대신하여 생성합니다.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# 이 트랜잭션과 함께 전송된 값으로
# 경매에 입찰합니다.
# 이 값은 경매에서 낙찰받지
# 못한 경우에만 환불됩니다.
@external
@payable
def bid():
    # 입찰 기간이 끝났는지 확인합니다.
    assert block.timestamp < self.auctionEnd
    # 입찰가가 충분히 높은지 확인합니다
    assert msg.value > self.highestBid
    # 이전 최고 입찰자에 대한 환불을 추적합니다
    self.pendingReturns[self.highestBidder] += self.highestBid
    # 새로운 최고 입찰을 추적합니다
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# 이전에 환불된 입찰금을 출금합니다. 보안 문제를 피하기 위해
# 여기서 출금 패턴이 사용됩니다. 환불이 bid()의 일부로
# 직접 전송된다면, 악의적인 입찰 컨트랙트가 해당 환불을 차단하여
# 새로운 더 높은 입찰이 들어오는 것을 막을 수 있습니다.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# 경매를 종료하고 최고 입찰액을
# 수혜자에게 보냅니다.
@external
def endAuction():
    # 다른 컨트랙트와 상호작용하는
    # (즉, 함수를 호출하거나 이더를 전송하는) 함수를
    # 다음 세 단계로 구조화하는 것이 좋은 지침입니다:
    # 1. 조건 확인
    # 2. 작업 수행 (잠재적으로 조건 변경)
    # 3. 다른 컨트랙트와 상호작용
    # 이러한 단계가 혼합되면, 다른 컨트랙트가 현재 컨트랙트를
    # 다시 호출하여 상태를 수정하거나 효과(이더 지급)가
    # 여러 번 수행되도록 할 수 있습니다.
    # 내부적으로 호출된 함수에 외부 컨트랙트와의 상호작용이
    # 포함되어 있다면, 이 역시 외부 컨트랙트와의
    # 상호작용으로 간주되어야 합니다.

    # 1. 조건
    # 경매 종료 시간에 도달했는지 확인합니다
    assert block.timestamp >= self.auctionEnd
    # 이 함수가 이미 호출되었는지 확인합니다
    assert not self.ended

    # 2. 효과
    self.ended = True

    # 3. 상호작용
    send(self.beneficiary, self.highestBid)
```

이 예제를 통해 Vyper 컨트랙트 구문이 어떤 느낌인지 파악할 수 있습니다. 함수와 변수에 대한 더 자세한 설명은 [문서를 참조하세요](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul 및 Yul+ {#yul}

이더리움을 처음 접하고 아직 스마트 컨트랙트 언어로 코딩을 해본 적이 없다면, Solidity나 Vyper로 시작하는 것을 권장합니다. 스마트 컨트랙트 보안 모범 사례와 EVM 작업의 세부 사항에 익숙해진 후에만 Yul이나 Yul+를 살펴보세요.

**Yul**

- 이더리움을 위한 중간 언어입니다.
- [EVM](/developers/docs/evm)과 이더리움 방식의 WebAssembly인 [Ewasm](https://github.com/ewasm)을 지원하며, 두 플랫폼 모두에서 사용할 수 있는 공통 분모가 되도록 설계되었습니다.
- EVM과 Ewasm 플랫폼 모두에 동등하게 이점을 줄 수 있는 고수준 최적화 단계에 적합한 타겟입니다.

**Yul+**

- Yul의 저수준 고효율 확장입니다.
- 처음에는 [옵티미스틱 롤업](/developers/docs/scaling/optimistic-rollups/) 컨트랙트를 위해 설계되었습니다.
- Yul+는 Yul에 새로운 기능을 추가하는 실험적인 업그레이드 제안으로 볼 수 있습니다.

### 주요 링크 {#important-links-2}

- [Yul 문서](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ 문서](https://github.com/fuellabs/yulp)
- [Yul+ 소개 게시물](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### 예제 컨트랙트 {#example-contract-2}

다음의 간단한 예제는 거듭제곱 함수를 구현합니다. `solc --strict-assembly --bin input.yul`를 사용하여 컴파일할 수 있습니다. 이 예제는 input.yul 파일에 저장되어야 합니다.

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

이미 스마트 컨트랙트에 대한 경험이 풍부하다면, Yul로 구현된 전체 ERC-20 코드를 [여기](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example)에서 찾을 수 있습니다.

## Fe {#fe}

- 이더리움 가상 머신(EVM)을 위한 정적 타입 언어입니다.
- Python과 Rust에서 영감을 받았습니다.
- 이더리움 생태계를 처음 접하는 개발자도 쉽게 배울 수 있도록 하는 것을 목표로 합니다.
- Fe 개발은 아직 초기 단계에 있으며, 2021년 1월에 알파 버전이 출시되었습니다.

### 주요 링크 {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fe 발표](https://blog.fe-lang.org/posts/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021 로드맵](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe 디스코드 채팅](https://discord.com/invite/ywpkAXFjZH)
- [Fe 트위터](https://twitter.com/official_fe)

### 예제 컨트랙트 {#example-contract-3}

다음은 Fe로 구현된 간단한 컨트랙트입니다.

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

다른 프로그래밍 언어와 마찬가지로, 개인적인 선호도뿐만 아니라 작업에 적합한 도구를 선택하는 것이 가장 중요합니다.

아직 어떤 언어도 사용해 보지 않았다면 다음 몇 가지 사항을 고려해 보세요.

### Solidity의 장점은 무엇인가요? {#solidity-advantages}

- 초보자를 위한 튜토리얼과 학습 도구가 많이 있습니다. 자세한 내용은 [코딩으로 배우기](/developers/learning-tools/) 섹션을 참조하세요.
- 훌륭한 개발자 도구를 사용할 수 있습니다.
- Solidity는 대규모 개발자 커뮤니티를 보유하고 있어, 질문에 대한 답변을 매우 빠르게 찾을 수 있습니다.

### Vyper의 장점은 무엇인가요? {#vyper-advatages}

- 스마트 컨트랙트를 작성하려는 Python 개발자가 시작하기에 좋은 방법입니다.
- Vyper는 기능 수가 적어 아이디어를 빠르게 프로토타이핑하는 데 적합합니다.
- Vyper는 감사하기 쉽고 사람이 최대한 읽기 쉽게 만드는 것을 목표로 합니다.

### Yul과 Yul+의 장점은 무엇인가요? {#yul-advantages}

- 단순하고 기능적인 저수준 언어입니다.
- 원시 EVM에 훨씬 더 가깝게 접근할 수 있어 컨트랙트의 가스 사용량을 최적화하는 데 도움이 될 수 있습니다.

## 언어 비교 {#language-comparisons}

기본 구문, 컨트랙트 수명 주기, 인터페이스, 연산자, 데이터 구조, 함수, 제어 흐름 등에 대한 비교는 [Auditless의 치트 시트](https://reference.auditless.com/cheatsheet/)를 확인하세요.

## 더 읽을거리 {#further-reading}

- [오픈제플린의 Solidity 컨트랙트 라이브러리](https://docs.openzeppelin.com/contracts/5.x/)
- [예제로 배우는 Solidity](https://solidity-by-example.org)
