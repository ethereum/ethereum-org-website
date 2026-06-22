---
title: 토큰 스왑 방법
description: 이더리움에서 토큰을 스왑하는 방법에 대한 가이드입니다.
lang: ko
---

좋아하는 모든 토큰이 상장된 거래소를 찾느라 지치셨나요? [탈중앙화 거래소](/glossary/#dex)를 사용하면 대부분의 토큰을 스왑할 수 있습니다.

토큰 스왑은 이더리움 네트워크에 존재하는 두 개의 다른 자산을 교환하는 것을 의미합니다. 예를 들어 ETH를 DAI([ERC-20](/glossary/#erc-20) 토큰)로 스왑하는 것입니다. 이 과정은 매우 빠르고 저렴합니다. 토큰을 스왑하려면 암호화폐 지갑이 필요합니다.

**사전 준비 사항:**

- [암호화폐 지갑](/glossary/#wallet) 보유. 지갑이 없다면 [이더리움 계정 생성 방법](/guides/how-to-create-an-ethereum-account/) 가이드를 따르세요.
- 지갑에 자금 추가

## 1. 원하는 탈중앙화 거래소(DEX)에 지갑 연결하기 {#1-connect-your-wallet-to-the-decentralized-exchange-dex-of-your-choice}

인기 있는 거래소는 다음과 같습니다.

- [유니스왑](https://app.uniswap.org/#/swap)
- [Sushiswap](https://www.sushi.com/swap)
- [1Inch](https://app.1inch.io/#/1/unified/swap/ETH/DAI)
- [Curve](https://www.curve.finance/dex/ethereum/swap/)

흥미로우신가요? [탈중앙화 금융 (DeFi)](/defi/)이 무엇인지, 그리고 이러한 새로운 종류의 거래소가 어떻게 작동하는지 자세히 알아보세요.

## 2. 스왑할 토큰 쌍 선택하기 {#2-select-the-pair-of-tokens-you-wish-to-swap}

예를 들어 ETH와 DAI를 선택합니다. 두 토큰 중 하나에 자금이 있는지 확인하세요.
![Common interface for swapping](./swap1.png)

## 3. 거래할 토큰 수량을 입력하고 스왑 클릭하기 {#3-enter-the-amount-of-tokens-you-want-to-trade-and-click-swap}

거래소에서 받을 토큰 수량을 자동으로 계산해 줍니다.

![Common interface for swapping](./swap2.png)

## 4. 트랜잭션 확인하기 {#4-confirm-the-transaction}

트랜잭션 세부 정보를 검토합니다. 예상치 못한 상황을 방지하기 위해 환율과 기타 수수료를 확인하세요.

![Common interface for reviewing the transaction](./swap3.png)

## 5. 트랜잭션이 처리될 때까지 대기하기 {#5-wait-for-the-transaction-to-be-processed}

모든 블록체인 탐색기에서 트랜잭션 진행 상황을 확인할 수 있습니다. 이 과정은 10분을 넘지 않습니다.

트랜잭션이 처리되면 스왑된 토큰이 지갑으로 자동 지급됩니다.
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

### 지갑에서 ETH를 BTC로 스왑할 수 있나요? {#can-i-swap-eth-for-btc-from-my-wallet}

아니요, ETH, ERC-20 토큰 또는 NFT와 같이 이더리움 네트워크의 네이티브 토큰만 스왑할 수 있습니다. 이더리움에 존재하는 "래핑된(wrapped)" 형태의 비트코인만 스왑할 수 있습니다.

### 슬리피지란 무엇인가요? {#what-is-slippage}

예상 환율과 실제 환율의 차이를 말합니다.
