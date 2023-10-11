---
title: 面向未來的以太坊
description: 不論未來如何發展，這些升級可鞏固以太坊作為有韌性的去中心化基礎層的地位。
lang: zh-tw
image: /roadmap/roadmap-future.png
alt: "以太坊開發藍圖"
template: roadmap
---

開發藍圖的有些部分在短期內並不是一定要用於擴容或保護以太坊，其目的是為以太坊未來的長期穩定性與可靠性奠定基礎。

## 抗量子技術 {#quantum-resistance}

當量子計算成為現實的時候，有一部分用於保護當今以太坊的密碼學技術將會受到攻擊。 儘管量子電腦可能還需幾十年的時間才能對現代密碼學構成真正的威脅，但建立以太坊的目的是確保未來幾個世紀的安全。 這意味著，我們應該盡速[在以太坊部署抗量子技術](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/)。

目前以太坊開發者遇到的挑戰是，現在的權益證明協定高度仰賴非常高效的簽名方案（即 BLS）來匯集有效區塊上的投票。 這種簽名方案可以被量子電腦破解，但其他抗量子替代方案又不夠有效率。

眾所周知，以太坊中多個地方用於產生加密密鑰的[「KZG」承諾方案](/roadmap/danksharding/#what-is-kzg)不具抗量子能力。 目前，這個風險是使用「可信設定」來規避的，其中許多使用者會產生無法被量子電腦逆向工程的隨機性。 然而，理想的解決方案還是引入量子安全密碼學。 現在有兩種能夠有效替代 BLS 方案的主流方案：[STARK 簽名](https://hackmd.io/@vbuterin/stark_aggregation)和[網格簽名](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175)。 這些方案仍處於研究與試驗開發階段。

<ButtonLink variant="outline-color" to="/roadmap/danksharding#what-is-kzg"> 閱讀 KZG 與可信設定相關資訊</ButtonLink>

## 更便捷、更高效的以太坊 {#simpler-more-efficient-ethereum}

複雜性使得產生錯誤及漏洞的機率提高，導致攻擊者有機可乘。 然而，開發藍圖中也包括精簡以太坊、移除歷經好幾次升級後已不再需要或可以改進的程式碼。 對開發者來說，更精簡、單純的程式碼庫更容易維護和理解。

業界將對[以太坊虛擬機 (EVM)](/developers/docs/evm) 進行多項更新，以使其更簡單、更高效。 其中包括[移除 SELFDESTRUCT 操作碼](https://hackmd.io/@vbuterin/selfdestruct)，這是一個不常用且已不需要的指令，某些情況下可能帶來危險，特別是和以太坊未來升級的儲存模型一起使用時。 此外，以太坊用戶端仍然支援一些舊的交易類型，現在完全可以移除。 Gas 的計算方式也有改進空間，可以引入更高效的演算法來進行一些加密運算。

同樣，目前以太坊用戶端的其他部分也可以進行更新。 其中一個範例是，目前執行和共識用戶端使用的是不同類型的資料壓縮方案。 若能在整個網路上統一壓縮方案，在用戶端之間分享資料會變得更簡單直覺。

## 目前進度 {#current-progress}

大部分面向未來的以太坊升級都仍在研究階段，且距離實作還有數年。 像移除 SELF-DESTRUCT 以及統一執行和共識用戶端中所用的壓縮方案這樣的升級，可能比引入抗量子密碼學更快實現。

**了解更多**

- [Gas](/developers/docs/gas)
- [以太坊虛擬機](/developers/docs/evm)
- [Data structures](/developers/docs/data-structures-and-encoding)
