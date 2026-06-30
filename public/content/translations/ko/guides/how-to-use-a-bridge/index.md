---
title: 레이어 2로 토큰을 브릿지하는 방법
description: 브릿지를 사용하여 이더리움에서 레이어 2로 토큰을 이동하는 방법을 설명하는 가이드입니다.
lang: ko
---

이더리움에 트래픽이 많아지면 비용이 비싸질 수 있습니다. 이에 대한 한 가지 해결책은 새로운 "레이어"를 만드는 것입니다. 즉, 이더리움 자체와 유사한 방식으로 작동하는 다른 네트워크를 만드는 것입니다. 소위 레이어 2(l2)라고 불리는 이 네트워크들은 더 낮은 수수료로 훨씬 더 많은 트랜잭션을 처리하고, 그 결과만 가끔씩 이더리움에 저장함으로써 이더리움의 혼잡과 비용을 줄이는 데 도움을 줍니다. 따라서 이러한 레이어 2는 우리가 더 빠른 속도와 더 낮은 비용으로 트랜잭션을 수행할 수 있게 해줍니다. 많은 인기 있는 암호화폐 프로젝트들이 이러한 이점 때문에 레이어 2로 이동하고 있습니다. 이더리움에서 레이어 2로 토큰을 이동하는 가장 간단한 방법은 브릿지를 사용하는 것입니다.

**사전 준비 사항:** 

- 암호화폐 지갑 준비하기 — 지갑이 없다면 이 가이드에 따라 [이더리움 계정을 생성하세요](/guides/how-to-create-an-ethereum-account/)
- 지갑에 자금 추가하기

## 1. 사용할 레이어 2 네트워크 결정하기 {#1-determine-which-layer-2-network-you-want-to-use}

다양한 프로젝트와 중요한 링크에 대한 자세한 내용은 [레이어 2 페이지](/layer-2/)에서 확인할 수 있습니다.

## 2. 선택한 브릿지로 이동하기 {#2-go-to-the-selected-bridge}

인기 있는 레이어 2는 다음과 같습니다:

- [아비트럼 브릿지](https://portal.arbitrum.io/bridge?l2ChainId=42161)
- [옵티미즘 브릿지](https://app.optimism.io/bridge/deposit)
- [보바(Boba) 네트워크 브릿지](https://hub.boba.network/)

## 3. 지갑으로 브릿지에 연결하기 {#3-connect-to-the-bridge-with-your-wallet}

지갑이 이더리움 메인넷 네트워크에 연결되어 있는지 확인하세요. 연결되어 있지 않다면, 웹사이트에서 자동으로 네트워크 전환을 요청할 것입니다.

![Common interface for bridging tokens](./bridge1.png)

## 4. 금액 지정 및 자금 이동하기 {#4-specify-the-amount-and-move-the-funds}

예상치 못한 상황을 피하기 위해 레이어 2 네트워크에서 돌려받을 금액과 수수료를 검토하세요.

![Common interface for bridging tokens](./bridge2.png)

## 5. 지갑에서 트랜잭션 확인하기 {#5-confirm-the-transaction-in-your-wallet}

트랜잭션 처리를 위해 ETH 형태로 수수료([가스](/glossary/#gas)라고 함)를 지불해야 합니다.

![Common interface for bridging tokens](./bridge3.png)

## 6. 자금이 이동될 때까지 기다리기 {#6-wait-for-your-funds-to-be-moved}

이 과정은 10분 이상 걸리지 않습니다.

## 7. 선택한 레이어 2 네트워크를 지갑에 추가하기 (선택 사항) {#7-add-the-selected-layer-2-network-to-your-wallet-optional}

[chainlist.org](https://chainlist.org)를 사용하여 네트워크의 RPC 세부 정보를 찾을 수 있습니다. 네트워크가 추가되고 트랜잭션이 완료되면 지갑에서 토큰을 확인할 수 있습니다.
<br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>더 알아보고 싶으신가요?</div>
  <ButtonLink href="/guides/">
    다른 가이드 보기
  </ButtonLink>
</AlertContent>
</Alert>

## 자주 묻는 질문 {#frequently-asked-questions}

### 거래소에 자금이 있는 경우는 어떻게 하나요? {#what-if-i-have-funds-on-an-exchange}

거래소에서 일부 레이어 2로 직접 출금할 수도 있습니다. 자세한 내용은 [레이어 2 페이지](/layer-2/)의 '레이어 2로 이동하기' 섹션을 확인하세요.

### 토큰을 레이어 2(l2)로 브릿지한 후 이더리움 메인넷으로 돌아갈 수 있나요? {#can-i-go-back-to-ethereum-mainnet-after-i-bridge-my-tokens-to-l2}

네, 동일한 브릿지를 사용하여 언제든지 자금을 메인넷으로 다시 이동할 수 있습니다.
