---
title: "如何將代幣橋接至第二層 (L2)"
description: "說明如何使用跨鏈橋將代幣從以太坊轉移至第二層 (L2) 的指南。"
lang: zh-tw
---

如果以太坊上的流量很大，費用可能會變得昂貴。解決這個問題的一個方法是建立新的「層」：也就是運作方式與以太坊本身相似的不同網路。這些所謂的第二層 (L2) 透過以較低的費用處理更多的交易，並且只偶爾將這些交易的結果儲存在以太坊上，來幫助減少以太坊上的擁塞和成本。因此，這些第二層 (L2) 使我們能夠以更快的速度和更低的成本進行交易。由於這些好處，許多受歡迎的加密貨幣專案正在轉移到第二層 (L2)。將代幣從以太坊轉移到第二層 (L2) 最簡單的方法是使用跨鏈橋。

**先決條件：** 

- 擁有一個加密貨幣錢包——如果沒有，請按照本指南[建立以太坊帳戶](/guides/how-to-create-an-ethereum-account/)
- 將資金加入你的錢包

## 1. 決定你要使用哪個第二層 (L2) 網路 {#1-determine-which-layer-2-network-you-want-to-use}

你可以在我們的[第二層 (L2) 頁面](/layer-2/)上了解有關不同專案和重要連結的更多資訊。

## 2. 前往選定的跨鏈橋 {#2-go-to-the-selected-bridge}

一些受歡迎的第二層 (L2) 包括：

- [Arbitrum 跨鏈橋](https://portal.arbitrum.io/bridge?l2ChainId=42161)
- [Optimism 跨鏈橋](https://app.optimism.io/bridge/deposit)
- [Boba 網路跨鏈橋](https://hub.boba.network/)

## 3. 使用你的錢包連接到跨鏈橋 {#3-connect-to-the-bridge-with-your-wallet}

確保你的錢包已連接到以太坊主網網路。如果沒有，網站將自動提示你切換網路。

![Common interface for bridging tokens](./bridge1.png)

## 4. 指定金額並轉移資金 {#4-specify-the-amount-and-move-the-funds}

檢查你在第二層 (L2) 網路上將獲得的金額以及費用，以避免出現令人不快的意外。

![Common interface for bridging tokens](./bridge2.png)

## 5. 在你的錢包中確認交易 {#5-confirm-the-transaction-in-your-wallet}

你將需要以 ETH 的形式支付一筆費用（稱為[燃料](/glossary/#gas)）來處理交易。

![Common interface for bridging tokens](./bridge3.png)

## 6. 等待你的資金轉移 {#6-wait-for-your-funds-to-be-moved}

這個過程應該不會超過 10 分鐘。

## 7. 將選定的第二層 (L2) 網路新增至你的錢包（選用） {#7-add-the-selected-layer-2-network-to-your-wallet-optional}

你可以使用 [chainlist.org](https://chainlist.org) 尋找該網路的 RPC 詳細資訊。一旦新增了網路且交易完成，你應該就能在錢包中看到代幣。
<br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>想了解更多嗎？</div>
  <ButtonLink href="/guides/">
    查看我們的其他指南
  </ButtonLink>
</AlertContent>
</Alert>

## 常見問題 {#frequently-asked-questions}

### 如果我的資金在交易所怎麼辦？ {#what-if-i-have-funds-on-an-exchange}

你或許可以直接從交易所提款到某些第二層 (L2)。請查看我們[第二層 (L2) 頁面](/layer-2/)的「轉移至第二層 (L2)」章節以獲取更多資訊。

### 將代幣橋接至 L2 後，我可以回到以太坊主網嗎？ {#can-i-go-back-to-ethereum-mainnet-after-i-bridge-my-tokens-to-l2}

可以，你隨時可以使用同一個跨鏈橋將資金轉回主網。
