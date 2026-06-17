---
title: ERC-777 토큰 표준
description: 훅(hook)을 갖춘 개선된 대체 가능 토큰 표준인 ERC-777에 대해 알아봅니다. 단, 보안을 위해 ERC-20 사용이 권장됩니다.
lang: ko
---

## 경고 {#warning}

**ERC-777은 [다양한 형태의 공격에 취약](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620)하기 때문에 제대로 구현하기 어렵습니다. 대신 [ERC-20](/developers/docs/standards/tokens/erc-20/)을 사용하는 것을 권장합니다.** 이 페이지는 역사적 기록 보관용으로 남겨두었습니다.

## 소개? {#introduction}

ERC-777은 기존 [ERC-20](/developers/docs/standards/tokens/erc-20/) 표준을 개선한 대체 가능 토큰 표준입니다.

## 전제 조건 {#prerequisites}

이 페이지를 더 잘 이해하려면 먼저 [ERC-20](/developers/docs/standards/tokens/erc-20/)에 대해 읽어보는 것을 권장합니다.

## ERC-777은 ERC-20에 비해 어떤 개선 사항을 제안하나요? {#-erc-777-vs-erc-20}

ERC-777은 ERC-20에 비해 다음과 같은 개선 사항을 제공합니다.

### 훅 {#hooks}

훅(Hook)은 스마트 컨트랙트 코드에 기술된 함수입니다. 훅은 컨트랙트를 통해 토큰을 보내거나 받을 때 호출됩니다. 이를 통해 스마트 컨트랙트는 들어오거나 나가는 토큰에 반응할 수 있습니다.

이러한 훅은 [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820) 표준을 사용하여 등록되고 발견됩니다.

#### 훅이 좋은 이유는 무엇인가요? {#why-are-hooks-great}

1. 훅을 사용하면 단일 트랜잭션으로 컨트랙트에 토큰을 전송하고 컨트랙트에 알릴 수 있습니다. 이는 이를 달성하기 위해 이중 호출(`approve`/`transferFrom`)이 필요한 [ERC-20](https://eips.ethereum.org/EIPS/eip-20)과는 다릅니다.
2. 훅을 등록하지 않은 컨트랙트는 ERC-777과 호환되지 않습니다. 수신 컨트랙트가 훅을 등록하지 않은 경우 송신 컨트랙트는 트랜잭션을 중단합니다. 이는 ERC-777을 지원하지 않는 스마트 컨트랙트로의 우발적인 전송을 방지합니다.
3. 훅은 트랜잭션을 거부할 수 있습니다.

### 소수점 {#decimals}

이 표준은 또한 ERC-20에서 발생했던 `decimals`와 관련된 혼란을 해결합니다. 이러한 명확성은 개발자 경험을 향상시킵니다.

### ERC-20과의 하위 호환성 {#backwards-compatibility-with-erc-20}

ERC-777 컨트랙트는 마치 ERC-20 컨트랙트인 것처럼 상호 작용할 수 있습니다.

## 더 읽어보기 {#further-reading}

[EIP-777: 토큰 표준](https://eips.ethereum.org/EIPS/eip-777)