---
title: "ERC-777 토큰 표준"
description: "훅(hook)을 통해 개선된 대체 가능한 토큰 표준인 ERC-777에 대해 알아보세요. 단, 보안을 위해 ERC-20 사용을 권장합니다."
lang: ko
---

## 경고 {#warning}

**ERC-777은 [다양한 형태의 공격에 취약](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620)하기 때문에 제대로 구현하기가 어렵습니다. 대신 [ERC-20](/developers/docs/standards/tokens/erc-20/)을 사용하는 것이 좋습니다.** 이 페이지는 역사적 기록물로 남아 있습니다.

## 소개? {#introduction}

ERC-777은 기존의 [ERC-20](/developers/docs/standards/tokens/erc-20/) 표준을 개선한 대체 가능한 토큰 표준입니다.

## 필수 구성 요소 {#prerequisites}

이 페이지를 더 잘 이해하려면 먼저 [ERC-20](/developers/docs/standards/tokens/erc-20/)에 대해 읽어보는 것을 권장합니다.

## ERC-777은 ERC-20에 비해 어떤 개선점을 제안하나요? {#-erc-777-vs-erc-20}콜데이터-블롭

ERC-777은 ERC-20에 비해 다음과 같은 개선점을 제공합니다.

### 훅 {#hooks}

훅은 스마트 계약의 코드에 기술된 함수입니다. 훅은 계약을 통해 토큰을 보내거나 받을 때 호출됩니다. 이를 통해 스마트 계약은 수신 또는 발신 토큰에 반응할 수 있습니다.

훅은 [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820) 표준을 사용하여 등록되고 발견됩니다.

#### 훅의 장점은 무엇인가요? {#why-are-hooks-great}

1. 이를 위해 이중 호출(`approve`/`transferFrom`)이 필요한 [ERC-20](https://eips.ethereum.org/EIPS/eip-20)과 달리 훅은 단일 트랜잭션으로 계약에 토큰을 보내고 계약에 알림을 보낼 수 있습니다.
2. 훅을 등록하지 않은 계약은 ERC-777과 호환되지 않습니다. 수신 계약이 훅을 등록하지 않은 경우 송신 계약은 트랜잭션을 중단합니다. 이는 비-ERC-777 스마트 계약으로의 의도치 않은 전송을 방지합니다.
3. 훅은 트랜잭션을 거부할 수 있습니다.

### 소수 자릿수 {#decimals}

이 표준은 또한 ERC-20에서 발생한 `decimals` 관련 혼란을 해결합니다. 이러한 명확성은 개발자 경험을 개선합니다.

### ERC-20과의 하위 호환성 {#backwards-compatibility-with-erc-20}

ERC-777 계약은 마치 ERC-20 계약인 것처럼 상호작용할 수 있습니다.

## 추가 정보 {#further-reading}

[EIP-777: 토큰 표준](https://eips.ethereum.org/EIPS/eip-777)
