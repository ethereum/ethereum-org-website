---
title: "面向未來的以太坊"
description: "不論未來如何發展，這些升級可鞏固以太坊作為有韌性的去中心化基礎層的地位。"
lang: zh-tw
image: /images/roadmap/roadmap-future.png
alt: "以太坊開發藍圖"
template: roadmap
---

開發藍圖的有些部分在短期內並不是一定要用於擴容或保護以太坊，其目的是為以太坊未來的長期穩定性與可靠性奠定基礎。

## 抗量子性 {#quantum-resistance}

一旦量子運算成真，目前保護以太坊的[密碼學](/glossary/#cryptography)將會有一部分受到威脅。 儘管量子電腦可能還需幾十年的時間才能對現代密碼學構成真正的威脅，但建立以太坊的目的是確保未來幾個世紀的安全。 這意味著要盡快讓[以太坊具備抗量子性](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/)。

以太坊開發人員面臨的挑戰是，目前的[權益證明](/glossary/#pos)協定依賴一種稱為 BLS 的高效簽名方案，來匯總有效[區塊](/glossary/#block)上的投票。 這種簽名方案可以被量子電腦破解，但其他抗量子替代方案效率不高。

以太坊各處用來產生密碼學秘密的 [「KZG」承諾方案](/roadmap/danksharding/#what-is-kzg)，已知易受量子攻擊。 目前，該問題透過使用「可信設置」來規避（其主要的設置儀式已于 2023 年成功完成），在此過程中，許多用戶生成了無法透過量子計算機進行逆向工程的隨機性。 然而，理想的長期解決方案還是引入量子安全密碼學。 有兩種主要的方法可望成為 BLS 方案的高效替代方案：[基於 STARK](https://hackmd.io/@vbuterin/stark_aggregation) 和[基於格](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175)的簽署方案。 **這些方案仍在積極研究和原型設計中**。

[閱讀關於 KZG 和可信設定](/roadmap/danksharding#what-is-kzg)

## 更簡單、更高效的以太坊 {#simpler-more-efficient-ethereum}

複雜性為漏洞或錯誤提供了機會，攻擊者可能會利用這些漏洞。 然而，開發藍圖中也包括精簡以太坊、移除或修改歷經好幾次升級後已不再需要或可以改進的程式碼。 對開發者來説，更精簡和更簡單的程式碼庫更容易維護和理解。

為了讓[以太坊虛擬機 (EVM)](/developers/docs/evm) 更簡單、更高效，我們持續研究和實施改善措施。 這同時涉及處理遺留組件跟引入優化措施。

**近期實施的變更：**

- **Gas 計算改革：** [Gas](/glossary/#gas) 的計算方式透過 **EIP-1559 (於 2021 年倫敦升級中實施)** 大幅改善，引進了基本費用和銷毀機制，讓交易定價更可預測。
- **`SELFDESTRUCT` 限制：** `SELFDESTRUCT` 操作碼雖然罕見，但有潛在風險。 其功能在**Dencun 升級 (2024 年 3 月) 中透過 EIP-6780 受到嚴格限制**，以降低風險，特別是關於狀態管理的風險。
- **現代化交易類型：** 我們已推出新的交易格式 (例如，透過 **EIP-2718** 和 Dencun 升級中用來處理 blob 的 **EIP-4844**)，以支援新功能並提升效率，超越舊有類型。

**當前和未來目標：**

- **進一步處理 `SELFDESTRUCT`：** 雖然已受限制，但未來升級仍考慮**可能完全移除** `SELFDESTRUCT` 操作碼，以進一步簡化 EVM 狀態。 ([關於 SELFDESTRUCT 問題的更多背景資訊](https://hackmd.io/@vbuterin/selfdestruct))。
- **逐步淘汰舊版交易：** 雖然[以太坊用戶端](/glossary/#consensus-client)為了向後相容性仍支援較舊的交易類型，但目標是鼓勵轉移至較新的類型，並**可能在未來棄用或完全移除對最舊格式的支援**。
- **持續進行 Gas 效率研究：** 持續探索**進一步改良 gas 計算**的方法，可能包含多維度 gas 等概念，以更準確地反映資源使用情況。
- **優化的密碼學運算：** 我們正持續努力**引進更高效的算術方法**，這是 EVM 中使用的密碼學運算的基礎。

同樣，也可以對以太坊用戶端的其他部分進行更新。 例如，當前的執行和共識用戶端使用的是不同類型的資料壓縮。 如果整個網路的壓縮方案能夠統一，用戶端之間共享資料將變得更加容易且直覺化。 這仍然是一個需要探索的領域。

## 目前進度 {#current-progress}

許多長期的未來防護升級，特別是**核心協定的完全抗量子性，仍處於研究階段，可能還需要數年**才能實施。

然而，**在簡化工作方面已取得重大進展。**例如，**`SELFDESTRUCT` 的限制 (EIP-6780)** 和**搭載 blob 的交易 (EIP-4844)** 等關鍵變更，已在 **Dencun 升級 (2024 年 3 月)** 中實施。 用戶端壓縮方案的協調和其他改進效率的工作也在繼續。

**延伸閱讀**

- [Gas](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [資料結構](/developers/docs/data-structures-and-encoding)