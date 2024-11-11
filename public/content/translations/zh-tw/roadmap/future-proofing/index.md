---
title: 面向未來的以太坊
description: 不論未來如何發展，這些升級可鞏固以太坊作為有韌性的去中心化基礎層的地位。
lang: zh-tw
image: /images/roadmap/roadmap-future.png
alt: "以太坊開發藍圖"
template: roadmap
---

開發藍圖的有些部分在短期內並不是一定要用於擴容或保護以太坊，其目的是為以太坊未來的長期穩定性與可靠性奠定基礎。

## 抗量子性 {#quantum-resistance}

當量子計算成為現實的時候，有一部分用於保護當今以太坊的[密碼學技術](/glossary/#cryptography)將會受到攻擊。 儘管量子電腦可能還需幾十年的時間才能對現代密碼學構成真正的威脅，但建立以太坊的目的是確保未來幾個世紀的安全。 這意味著，我們應該盡速讓[以太坊具抗量子性](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/)。

以太坊開發者面臨的挑戰是，目前的[權益證明](/glossary/#pos)協定仰賴一種非常高效的簽名方案（稱為 BLS）來匯集對有效[區塊](/glossary/#block)的投票。 這種簽名方案可以被量子電腦破解，但其他抗量子替代方案效率不高。

眾所周知，以太坊中多處用於產生加密密鑰的[「KZG」承諾方案](/roadmap/danksharding/#what-is-kzg)不具抗量子能力。 目前，這個風險是使用「受信任設定」來規避的，即許多使用者會產生無法被量子電腦逆向工程的隨機性。 然而，理想的解決方案還是引入量子安全密碼學。 現在有兩種能夠有效替代 BLS 方案的主流方案：[STARK 簽名](https://hackmd.io/@vbuterin/stark_aggregation)和[網格簽名](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175)。 **這些方案仍處於研究與試驗開發階段**。

<ButtonLink variant="outline-color" href="/roadmap/danksharding#what-is-kzg"> 閱讀 KZG 與受信任設定相關資訊</ButtonLink>

## 更便捷、更高效的以太坊 {#simpler-more-efficient-ethereum}

複雜性使得產生錯誤及漏洞的幾率提高，導致攻擊者有機可乘。 然而，開發藍圖中也包括精簡以太坊、移除歷經好幾次升級後已不再需要或可以改進的程式碼。 對開發者來說，更精簡、單純的程式碼庫更容易維護和理解。

業界將對[以太坊虛擬機 (EVM)](/developers/docs/evm) 進行多項更新，以使其更簡單、更高效。 其中包括[移除 SELFDESTRUCT 作業碼](https://hackmd.io/@vbuterin/selfdestruct)，這是一個不常用且已不需要的指令，某些情況下可能帶來危險，特別是和以太坊未來升級的儲存模型一起使用時。 此外，[以太坊用戶端](/glossary/#consensus-client)仍支援一些現在可以完全移除的舊交易類型。 [燃料](/glossary/#gas)的計算方式也有改進空間，可以引入更高效的演算法來進行一些加密運算。

同樣，目前以太坊用戶端的其他部分也可以進行更新。 其中一個範例是，目前執行和共識用戶端使用的是不同類型的資料壓縮方案。 若能在整個網路上統一壓縮方案，在用戶端之間分享資料會變得更簡單直觀。

## 目前進度 {#current-progress}

面向未來的以太坊所需的大部分升級**仍在研究階段，且距離實作還有數年時間**。 像移除 SELFDESTRUCT 和統一執行層與共識層用戶端使用的壓縮方案這樣的升級，可能會比抗量子密碼學更早實現。

**了解更多**

- [燃料](/developers/docs/gas)
- [以太坊虛擬機](/developers/docs/evm)
- [資料結構](/developers/docs/data-structures-and-encoding)
