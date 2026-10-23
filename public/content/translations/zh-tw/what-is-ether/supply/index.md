---
title: ETH 供應與發行
metaTitle: 了解 ETH 供應與發行
description: 適合初學者的 ETH 供應與發行指南，涵蓋 EIP、PoS 和 EIP-1559 等關鍵概念。
lang: zh-tw
---

## 先決條件 {#prerequisites}

本文專為沒有任何基礎知識的初學者編寫。然而，為了完全理解這個主題，對[以太坊改進提案 (EIP)](/eips/#introduction-to-ethereum-improvement-proposals)、[工作量證明 (PoW)](/developers/docs/consensus-mechanisms/pow/)、[權益證明 (PoS)](/developers/docs/consensus-mechanisms/pos/)以及[倫敦升級](/ethereum-forks/#london)等概念有基本了解會很有幫助。

## 目前有多少 ETH 代幣？ {#current-eth-supply}

ETH 的總供應量是動態的，並且由於兩個主要因素而不斷變化：

1. **權益證明 (PoS) 發行**：創建新的 ETH 作為保護網路安全的驗證者的獎勵
2. **EIP-1559 銷毀**：一部分交易費用將永久退出流通

您可以在 [Ultrasound Money](https://ultrasound.money) 等平台上即時追蹤當前的供應量和這些變化。

以太坊的供應量和發行量是了解網路健康狀況和未來發展的重要指標。但 ETH 發行到底是什麼意思？讓我們來詳細分析。

## 為什麼 ETH 供應與發行很重要 {#why-eth-supply-matters}

在傳統金融中，中央銀行控制貨幣供應，通常透過印製更多貨幣來刺激經濟。另一方面，以太坊在一個由其程式碼管理的透明且可預測的系統上運作。了解目前存在多少 ETH 以及新 ETH 的發行速度有助於：

- **建立信任**：以太坊社群可以直接從區塊鏈驗證供應和發行數據。
- **了解價值**：發行量與 ETH 銷毀率之間的關係會影響 ETH 的通貨膨脹或通貨緊縮，進而影響其長期價值。
- **追蹤網路健康狀況**：發行量和銷毀率的變化反映了網路的活躍度和安全性。

## 什麼是 ETH 發行？ {#eth-issuance}

ETH 發行是指創建新 ETH 作為保護以太坊網路安全的驗證者獎勵的過程。它與總供應量（即流通中的 ETH 總量）是分開的。

### 簡單來說： {#in-simple-terms}
- **發行**為網路增加新的 ETH。
- **銷毀**（由 EIP-1559 引入）透過銷毀一部分交易費用，將 ETH 從網路中移除。

這兩股力量決定了以太坊的供應量隨著時間的推移是增長（通貨膨脹）還是縮減（通貨緊縮）。

## 當今的 ETH 供應與發行 {#eth-supply-today}

與早期的工作量證明 (PoW) 模型相比，以太坊的權益證明 (PoS) 系統大幅減少了 ETH 的發行量。鎖定 ETH 以保護網路安全的驗證者可以獲得 ETH 作為獎勵。您可以在 [Ultrasound Money](https://ultrasound.money) 上查看當前的發行率。

然而，這個數字是動態的。多虧了 EIP-1559，當網路活動頻繁時，ETH 的銷毀率可能會超過發行率，從而產生通貨緊縮效應。例如，在需求旺盛的時期（如 NFT 發布或去中心化金融 (DeFi) 活動），銷毀的 ETH 可能會多於發行的 ETH。

### 追蹤 ETH 供應與發行的工具： {#tools-to-track-eth-supply-and-issuance}
- [Ultrasound Money](https://ultrasound.money) - 即時追蹤 ETH 供應量、發行量和銷毀率
- [Etherscan](https://etherscan.io) - 包含供應量指標的區塊鏈瀏覽器

## 影響未來 ETH 供應與發行的因素 {#future-eth-supply}

以太坊未來的供應量並非固定不變，它取決於幾個變數：

1. **質押參與度**： 
   - 越多驗證者加入網路，意味著分配的 ETH 獎勵越多。
   - 參與的驗證者減少可能會降低發行量。
   - 了解更多關於[質押](/staking/)的資訊。

2. **網路活動**：
   - 高交易量會導致更多 ETH 被銷毀，可能會抵消甚至超過發行量。
   - 閱讀有關[燃料費用](/developers/docs/gas/)及其如何影響銷毀的資訊。

3. **協定升級**：
   - 未來對以太坊程式碼的更改可能會調整質押獎勵或銷毀機制，進一步塑造供應動態。
   - 隨時關注[以太坊路線圖](/roadmap/)的最新動態。

## 總結：ETH 供應、發行與未來展望 {#recap}

以下是您需要了解的有關 ETH 供應與發行的簡要總結：

- **ETH 供應量**：動態且不斷變化，可透過 [Ultrasound Money](https://ultrasound.money) 等工具即時追蹤
- **PoS 下的發行量**：與 PoW 相比大幅減少，獎勵發放給驗證者。在 [Ultrasound Money](https://ultrasound.money) 上查看當前發行率
- **EIP-1559 的作用**：在活動頻繁期間，ETH 銷毀可以使網路呈現通貨緊縮
- **未來趨勢**：質押參與度、網路需求和協定更新都將塑造 ETH 的供應量

了解 ETH 發行有助於揭開以太坊價值的神秘面紗，以及其作為通貨緊縮、去中心化資產的潛力。有關合併如何影響 ETH 供應的更詳細資訊，請查看我們的[詳細分析](/roadmap/merge/issuance/)。對 ETH 的未來感到好奇嗎？使用 [Ultrasound Money](https://ultrasound.money) 等工具深入了解，或探索我們的[質押指南](/staking/)。