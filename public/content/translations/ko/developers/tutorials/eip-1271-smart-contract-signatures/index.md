---
title: "EIP-1271: 스마트 컨트랙트 서명 생성 및 검증"
description: "EIP-1271을 사용한 스마트 컨트랙트 서명 생성 및 검증에 대한 개요입니다. 또한 스마트 컨트랙트 개발자가 기반으로 삼을 수 있는 구체적인 예시를 제공하기 위해 Safe(이전의 Gnosis Safe)에서 사용된 EIP-1271 구현을 살펴봅니다."
author: "네이선 H. 렁"
lang: ko
tags:
  - eip-1271
  - 스마트 컨트랙트
  - 검증
  - 서명
skill: intermediate
breadcrumb: "EIP-1271 서명"
published: 2023-01-12
---

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) 표준을 통해 스마트 컨트랙트가 서명을 검증할 수 있습니다.

이 튜토리얼에서는 디지털 서명, EIP-1271의 배경, 그리고 [Safe](https://safe.global/)(이전의 Gnosis Safe)에서 사용된 EIP-1271의 구체적인 구현에 대한 개요를 제공합니다. 이를 통해 여러분의 컨트랙트에 EIP-1271을 구현하기 위한 출발점으로 삼을 수 있습니다.

## 서명이란 무엇인가요? {#what-is-a-signature}

이 문맥에서 서명(더 정확히는 "디지털 서명")은 메시지와 해당 메시지가 특정 사람/발신자/주소에서 왔다는 일종의 증명을 합친 것입니다.

예를 들어, 디지털 서명은 다음과 같을 수 있습니다.

1. 메시지: "내 이더리움 지갑으로 이 웹사이트에 로그인하고 싶습니다."
2. 서명자: 내 주소는 `0x000…`입니다.
3. 증명: 나 `0x000…`가 실제로 이 전체 메시지를 작성했다는 증명입니다(이는 일반적으로 암호학적인 것입니다).

디지털 서명에는 "메시지"와 "서명"이 모두 포함된다는 점에 유의하는 것이 중요합니다.

왜 그럴까요? 예를 들어, 여러분이 저에게 서명할 컨트랙트를 주었는데, 제가 서명 페이지만 잘라내고 컨트랙트의 나머지 부분 없이 서명만 돌려준다면 그 컨트랙트는 유효하지 않을 것입니다.

마찬가지로, 디지털 서명은 연관된 메시지 없이는 아무 의미가 없습니다!

## EIP-1271은 왜 존재하나요? {#why-does-eip-1271-exist}

이더리움 기반 블록체인에서 사용할 디지털 서명을 생성하려면 일반적으로 다른 사람이 알지 못하는 비밀 개인 키가 필요합니다. 이것이 여러분의 서명을 여러분의 것으로 만드는 요소입니다(비밀 키를 모르면 누구도 동일한 서명을 생성할 수 없습니다).

여러분의 이더리움 계정(즉, 외부 소유 계정(EOA))에는 개인 키가 연결되어 있으며, 웹사이트나 탈중앙화 애플리케이션(dapp)이 서명을 요청할 때(예: "이더리움으로 로그인") 일반적으로 사용되는 것이 바로 이 개인 키입니다.

앱은 ethers.js와 같은 서드파티 라이브러리를 사용하여 [여러분의 개인 키를 몰라도](https://en.wikipedia.org/wiki/Public-key_cryptography) 여러분이 생성한 [서명을 검증](https://www.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum)할 수 있으며, 서명을 생성한 사람이 <em>여러분</em>이라는 것을 확신할 수 있습니다.

> 사실 EOA 디지털 서명은 공개 키 암호학을 사용하기 때문에 <strong>오프체인</strong>에서 생성하고 검증할 수 있습니다! 이것이 가스 없는 DAO 투표가 작동하는 방식입니다. 온체인에 투표를 제출하는 대신, 암호학 라이브러리를 사용하여 오프체인에서 디지털 서명을 생성하고 검증할 수 있습니다.

EOA 계정에는 개인 키가 있지만, 스마트 컨트랙트 계정에는 어떠한 종류의 개인 키나 비밀 키도 없습니다(따라서 "이더리움으로 로그인" 등은 스마트 컨트랙트 계정에서 기본적으로 작동할 수 없습니다).

EIP-1271이 해결하고자 하는 문제는 다음과 같습니다. 스마트 컨트랙트에 서명에 포함할 수 있는 "비밀"이 없다면, 스마트 컨트랙트 서명이 유효한지 어떻게 알 수 있을까요?

## EIP-1271은 어떻게 작동하나요? {#how-does-eip-1271-work}

스마트 컨트랙트에는 메시지에 서명하는 데 사용할 수 있는 개인 키가 없습니다. 그렇다면 서명이 진짜인지 어떻게 알 수 있을까요?

한 가지 아이디어는 스마트 컨트랙트에게 서명이 진짜인지 그냥 _물어보는_ 것입니다!

EIP-1271이 하는 일은 주어진 서명이 유효한지 스마트 컨트랙트에게 "물어보는" 이 아이디어를 표준화하는 것입니다.

EIP-1271을 구현하는 컨트랙트에는 메시지와 서명을 받는 `isValidSignature`라는 함수가 있어야 합니다. 그런 다음 컨트랙트는 일부 검증 로직을 실행하고(사양에서는 여기서 특정 사항을 강제하지 않습니다) 서명이 유효한지 여부를 나타내는 값을 반환할 수 있습니다.

`isValidSignature`가 유효한 결과를 반환한다면, 이는 컨트랙트가 "네, 이 서명과 메시지를 승인합니다!"라고 말하는 것과 같습니다.

### 인터페이스 {#interface}

다음은 EIP-1271 사양의 정확한 인터페이스입니다(`_hash` 매개변수에 대해서는 아래에서 설명하겠지만, 지금은 검증 중인 메시지라고 생각하세요).

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev 제공된 서명이 제공된 해시에 대해 유효한지 여부를 반환해야 합니다
   * @param _hash      서명할 데이터의 해시
   * @param _signature _hash와 연결된 서명 바이트 배열
   *
   * 함수가 통과할 때 bytes4 매직 값 0x1626ba7e를 반환해야 합니다.
   * 상태를 수정해서는 안 됩니다(solc < 0.5의 경우 STATICCALL 사용, solc > 0.5의 경우 view 제어자 사용).
   * 외부 호출을 허용해야 합니다.
   */
  function isValidSignature(
    bytes32 _hash,
    bytes memory _signature)
    public
    view
    returns (bytes4 magicValue);
}
```

## EIP-1271 구현 예시: Safe {#example-eip-1271-implementation-safe}

컨트랙트는 여러 가지 방법으로 `isValidSignature`를 구현할 수 있습니다. 사양에서는 정확한 구현에 대해 많은 것을 언급하지 않습니다.

EIP-1271을 구현하는 주목할 만한 컨트랙트 중 하나는 Safe(이전의 Gnosis Safe)입니다.

Safe의 코드에서 `isValidSignature`는 서명을 [두 가지 방법](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support)으로 생성하고 검증할 수 있도록 [구현되어 있습니다](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol).

1. 온체인 메시지
   1. 생성: Safe 소유자가 메시지에 "서명"하기 위해 새로운 Safe 트랜잭션을 생성하고, 메시지를 트랜잭션의 데이터로 전달합니다. 다중서명 임계값에 도달할 만큼 충분한 소유자가 트랜잭션에 서명하면 트랜잭션이 브로드캐스트되고 실행됩니다. 트랜잭션에는 메시지를 "승인된" 메시지 목록에 추가하는 Safe 함수(`signMessage(bytes calldata _data)`)가 있습니다.
   2. 검증: Safe 컨트랙트에서 `isValidSignature`를 호출하고, 검증할 메시지를 메시지 매개변수로 전달하며, [서명 매개변수에는 빈 값](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32)(즉, `0x`)을 전달합니다. Safe는 서명 매개변수가 비어 있는 것을 확인하고, 서명을 암호학적으로 검증하는 대신 메시지가 "승인된" 메시지 목록에 있는지 확인하는 작업을 진행해야 한다는 것을 알게 됩니다.
2. 오프체인 메시지:
   1. 생성: Safe 소유자가 오프체인에서 메시지를 생성한 다음, 다중서명 승인 임계값을 넘을 만큼 충분한 서명이 모일 때까지 다른 Safe 소유자들에게 각각 개별적으로 메시지에 서명하도록 합니다.
   2. 검증: `isValidSignature`를 호출합니다. 메시지 매개변수에는 검증할 메시지를 전달합니다. 서명 매개변수에는 각 Safe 소유자의 개별 서명을 모두 연속으로 연결하여 전달합니다. Safe는 임계값을 충족할 만큼 충분한 서명이 있는지, **그리고** 각 서명이 유효한지 확인합니다. 그렇다면 성공적인 서명 검증을 나타내는 값을 반환합니다.

## `_hash` 매개변수는 정확히 무엇인가요? 왜 전체 메시지를 전달하지 않나요? {#what-exactly-is-the-hash-parameter-why-not-pass-the-whole-message}

[EIP-1271 인터페이스](https://eips.ethereum.org/EIPS/eip-1271)의 `isValidSignature` 함수가 메시지 자체가 아니라 `_hash` 매개변수를 받는다는 것을 눈치채셨을 것입니다. 이는 임의 길이의 전체 메시지를 `isValidSignature`에 전달하는 대신, 메시지의 32바이트 해시(일반적으로 keccak256)를 전달한다는 의미입니다.

콜 데이터(즉, 스마트 컨트랙트 함수에 전달되는 함수 매개변수 데이터)의 각 바이트는 [16 가스(0 바이트인 경우 4 가스)의 비용이 들기 때문에](https://eips.ethereum.org/EIPS/eip-2028), 메시지가 길 경우 많은 가스를 절약할 수 있습니다.

### 이전 EIP-1271 사양 {#previous-eip-1271-specifications}

실제 환경에서는 첫 번째 매개변수의 타입이 `bytes`(고정 길이인 `bytes32` 대신 임의 길이)이고 매개변수 이름이 `message`인 `isValidSignature` 함수를 가진 EIP-1271 사양도 있습니다. 이는 EIP-1271 표준의 [이전 버전](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206)입니다.

## 내 컨트랙트에서 EIP-1271을 어떻게 구현해야 하나요? {#how-should-eip-1271-be-implemented-in-my-own-contracts}

이 부분에서 사양은 매우 개방적입니다. Safe 구현에는 몇 가지 좋은 아이디어가 있습니다.

- 컨트랙트 "소유자"의 EOA 서명을 유효한 것으로 간주할 수 있습니다.
- 승인된 메시지 목록을 저장하고 해당 메시지만 유효한 것으로 간주할 수 있습니다.

결국, 이는 컨트랙트 개발자인 여러분에게 달려 있습니다!

## 결론 {#conclusion}

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271)은 스마트 컨트랙트가 서명을 검증할 수 있게 해주는 다목적 표준입니다. 이는 스마트 컨트랙트가 EOA처럼 작동할 수 있는 길을 열어주며(예를 들어 "이더리움으로 로그인"이 스마트 컨트랙트와 작동할 수 있는 방법을 제공), 여러 가지 방법으로 구현될 수 있습니다(고려해 볼 만한 중요하고 흥미로운 구현을 가진 Safe의 사례처럼).