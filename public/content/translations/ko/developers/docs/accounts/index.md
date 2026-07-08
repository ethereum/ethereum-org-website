---
title: "이더리움 계정"
description: "이더리움 계정에 대한 설명 – 데이터 구조 및 키 쌍 암호학과의 관계."
lang: ko
---

[이더리움](/) 계정은 이더(ETH) 잔액을 보유하고 이더리움 네트워크에서 메시지를 보낼 수 있는 주체입니다. 계정은 사용자가 제어하거나 스마트 컨트랙트로 배포될 수 있습니다.

## 전제 조건 {#prerequisites}

이 페이지를 더 잘 이해하기 위해 먼저 [이더리움 소개](/developers/docs/intro-to-ethereum/)를 읽어보시기를 권장합니다.

## 계정 유형 {#types-of-account}

이더리움에는 두 가지 계정 유형이 있습니다.

- 외부 소유 계정(Externally-owned account, EOA) – 개인 키를 가진 사람이 제어합니다.
- 컨트랙트 계정 – 네트워크에 배포된 스마트 컨트랙트로, 코드에 의해 제어됩니다. [스마트 컨트랙트](/developers/docs/smart-contracts/)에 대해 알아보세요.

두 계정 유형 모두 다음과 같은 기능을 갖습니다.

- ETH 및 토큰 수신, 보유, 전송
- 배포된 스마트 컨트랙트와 상호작용

### 주요 차이점 {#key-differences}

**외부 소유 계정**

- 계정 생성에 비용이 들지 않습니다.
- 트랜잭션을 시작할 수 있습니다.
- 외부 소유 계정 간의 트랜잭션은 ETH/토큰 전송만 가능합니다.
- 계정 활동을 제어하는 암호학적 키 쌍(공개키 및 개인 키)으로 구성됩니다.

**컨트랙트 계정**

- 네트워크 스토리지를 사용하므로 컨트랙트 생성에 비용이 발생합니다.
- 트랜잭션을 수신한 것에 대한 응답으로만 메시지를 보낼 수 있습니다.
- 외부 계정에서 컨트랙트 계정으로의 트랜잭션은 토큰 전송이나 새 컨트랙트 생성과 같은 다양한 작업을 실행할 수 있는 코드를 트리거할 수 있습니다.
- 컨트랙트 계정에는 개인 키가 없습니다. 대신 스마트 컨트랙트 코드의 로직에 의해 제어됩니다.

## 계정 살펴보기 {#an-account-examined}

이더리움 계정에는 네 가지 필드가 있습니다.

- `nonce` – 외부 소유 계정에서 보낸 트랜잭션 수 또는 컨트랙트 계정에서 생성한 컨트랙트 수를 나타내는 카운터입니다. 각 계정에 대해 특정 논스를 가진 트랜잭션은 단 하나만 실행될 수 있으며, 서명된 트랜잭션이 반복적으로 브로드캐스트되고 재실행되는 리플레이 공격(replay attack)을 방지합니다.
- `balance` – 이 주소가 소유한 Wei의 양입니다. Wei는 ETH의 단위이며 1 ETH는 1e+18 Wei입니다.
- `codeHash` – 이 해시는 이더리움 가상 머신(EVM)에 있는 계정의 <em>코드</em>를 나타냅니다. 컨트랙트 계정에는 다양한 작업을 수행할 수 있도록 프로그래밍된 코드 조각이 있습니다. 이 EVM 코드는 계정이 메시지 호출을 받으면 실행됩니다. 다른 계정 필드와 달리 변경할 수 없습니다. 이러한 모든 코드 조각은 나중에 검색할 수 있도록 해당 해시 아래의 상태 데이터베이스에 포함되어 있습니다. 이 해시 값을 codeHash라고 합니다. 외부 소유 계정의 경우 codeHash 필드는 빈 문자열의 해시입니다.
- `storageRoot` – 스토리지 해시라고도 합니다. 계정의 스토리지 내용(256비트 정수 값 간의 매핑)을 인코딩하는 [머클 패트리샤 트라이](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/) 루트 노드의 256비트 해시이며, 256비트 정수 키의 케착-256 해시에서 RLP 인코딩된 256비트 정수 값으로의 매핑으로 트라이에 인코딩됩니다. 이 트라이는 이 계정의 스토리지 내용 해시를 인코딩하며 기본적으로 비어 있습니다.

![A diagram showing the make up of an account](./accounts.png)
_[Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)에서 발췌한 다이어그램_

## 외부 소유 계정 및 키 쌍 {#externally-owned-accounts-and-key-pairs}

계정은 공개키와 개인 키라는 암호학적 키 쌍으로 구성됩니다. 이 키들은 트랜잭션이 실제로 발신자에 의해 서명되었음을 증명하고 위조를 방지하는 데 도움이 됩니다. 개인 키는 트랜잭션에 서명하는 데 사용되므로, 계정과 연결된 자금에 대한 보관 권한을 부여합니다. 사용자는 실제로 암호화폐를 보유하는 것이 아니라 개인 키를 보유하는 것이며, 자금은 항상 이더리움 원장에 존재합니다.

트랜잭션의 발신자를 항상 확인할 수 있기 때문에 악의적인 행위자가 가짜 트랜잭션을 브로드캐스트하는 것을 방지합니다.

앨리스가 자신의 계정에서 밥의 계정으로 이더를 보내려면, 앨리스는 트랜잭션 요청을 생성하고 검증을 위해 네트워크로 보내야 합니다. 이더리움은 공개키 암호학을 사용하여 앨리스가 트랜잭션 요청을 처음 시작했음을 증명할 수 있도록 보장합니다. 암호학적 메커니즘이 없다면, 악의적인 공격자 이브가 "앨리스의 계정에서 이브의 계정으로 5 ETH 전송"과 같은 요청을 공개적으로 브로드캐스트할 수 있으며, 아무도 그것이 앨리스로부터 온 것이 아님을 확인할 수 없을 것입니다.

## 계정 생성 {#account-creation}

계정을 생성하고자 할 때, 대부분의 라이브러리는 무작위 개인 키를 생성해 줍니다.

개인 키는 64개의 16진수 문자로 구성되며 비밀번호로 암호화할 수 있습니다.

예시:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

공개키는 [타원 곡선 디지털 서명 알고리즘(Elliptic Curve Digital Signature Algorithm)](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm)을 사용하여 개인 키로부터 생성됩니다. 공개키의 케착-256 해시의 마지막 20바이트를 가져와서 시작 부분에 `0x`를 추가하면 계정의 공개 주소를 얻을 수 있습니다.

이는 외부 소유 계정(EOA)이 42자 주소(40개의 16진수 문자인 20바이트 세그먼트와 `0x` 접두사)를 가짐을 의미합니다.

예시:

`0x5e97870f263700f46aa00d967821199b9bc5a120`

다음 예시는 [Clef](https://geth.ethereum.org/docs/tools/clef/introduction)라는 서명 도구를 사용하여 새 계정을 생성하는 방법을 보여줍니다. Clef는 이더리움 클라이언트인 [Geth](https://geth.ethereum.org)와 함께 번들로 제공되는 계정 관리 및 서명 도구입니다. `clef newaccount` 명령어는 새 키 쌍을 생성하고 암호화된 키스토어에 저장합니다.

```
> clef newaccount --keystore <path>

Please enter a password for the new account to be created:
> <password>

------------
INFO [10-28|16:19:09.156] Your new key was generated       address=0x5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please backup your key file      path=/home/user/go-ethereum/data/keystore/UTC--2022-10-28T15-19-08.000825927Z--5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please remember your password!
Generated account 0x5e97870f263700f46aa00d967821199b9bc5a120
```

[Geth 문서](https://geth.ethereum.org/docs)

개인 키에서 새로운 공개키를 파생하는 것은 가능하지만, 공개키에서 개인 키를 파생할 수는 없습니다. 개인 키를 안전하게 보관하는 것은 매우 중요하며, 이름에서 알 수 있듯이 반드시 <strong>비공개(PRIVATE)</strong>로 유지해야 합니다.

서명을 출력하는 메시지와 트랜잭션에 서명하려면 개인 키가 필요합니다. 그러면 다른 사람들은 서명을 사용하여 공개키를 파생함으로써 메시지의 작성자를 증명할 수 있습니다. 애플리케이션에서는 JavaScript 라이브러리를 사용하여 네트워크에 트랜잭션을 보낼 수 있습니다.

## 컨트랙트 계정 {#contract-accounts}

컨트랙트 계정 또한 42자의 16진수 주소를 갖습니다.

예시:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

컨트랙트 주소는 일반적으로 컨트랙트가 이더리움 블록체인에 배포될 때 부여됩니다. 이 주소는 생성자의 주소와 해당 주소에서 보낸 트랜잭션 수("논스")에서 파생됩니다.

## 검증자 키 {#validators-keys}

이더리움에는 작업증명(PoW)에서 지분 증명(PoS) 기반 합의로 전환될 때 도입된 또 다른 유형의 키가 있습니다. 이는 'BLS' 키이며 검증자를 식별하는 데 사용됩니다. 이 키들은 효율적으로 집계될 수 있어 네트워크가 합의에 도달하는 데 필요한 대역폭을 줄여줍니다. 이러한 키 집계가 없다면 검증자를 위한 최소 스테이크는 훨씬 더 높았을 것입니다.

[검증자 키에 대해 더 알아보기](/developers/docs/consensus-mechanisms/pos/keys/).

## 지갑에 대한 참고 사항 {#a-note-on-wallets}

계정은 지갑이 아닙니다. 지갑은 외부 소유 계정이든 컨트랙트 계정이든 이더리움 계정과 상호작용할 수 있게 해주는 인터페이스 또는 애플리케이션입니다.

## 시각적 데모 {#a-visual-demo}

오스틴(Austin)이 해시 함수와 키 쌍에 대해 설명하는 영상을 시청해 보세요.

<VideoWatch slug="hash-function-eth-build" />

<VideoWatch slug="key-pair-eth-build" />

## 더 읽을거리 {#further-reading}

- [이더리움 계정 이해하기](https://info.etherscan.com/understanding-ethereum-accounts/) - Etherscan

_도움이 된 커뮤니티 리소스를 알고 계신가요? 이 페이지를 편집하여 추가해 주세요!_

## 관련 주제 {#related-topics}

- [스마트 컨트랙트](/developers/docs/smart-contracts/)
- [트랜잭션](/developers/docs/transactions/)