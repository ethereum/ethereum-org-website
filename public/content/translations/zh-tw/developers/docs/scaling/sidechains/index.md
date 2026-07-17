---
title: "側鏈"
description: "介紹側鏈作為以太坊社群目前使用的擴容解決方案。"
lang: zh-tw
sidebarDepth: 3
---

側鏈是一條獨立運作於[以太坊](/)之外的獨立區塊鏈，並透過雙向跨鏈橋與以太坊主網連接。側鏈可以有獨立的區塊參數和[共識演算法](/developers/docs/consensus-mechanisms/)，這些通常是為了高效處理交易而設計的。然而，使用側鏈需要做出權衡，因為它們並未繼承以太坊的安全屬性。與[第二層 (L2) 擴容解決方案](/layer-2/)不同，側鏈不會將狀態變更和交易資料發布回以太坊主網。

側鏈也犧牲了某種程度的去中心化或安全性，以實現高吞吐量（[擴容性三難困境](https://vitalik.eth.limo/general/2021/05/23/scaling.html)）。然而，以太坊致力於在不妥協去中心化和安全性的情況下進行擴容。

## 側鏈如何運作？ {#how-do-sidechains-work}

側鏈是獨立的區塊鏈，具有不同的歷史、開發路線圖和設計考量。雖然側鏈在表面上可能與以太坊有一些相似之處，但它具有幾個獨特的特徵。

### 共識演算法 {#consensus-algorithms}

讓側鏈獨特（即不同於以太坊）的特質之一是所使用的共識演算法。側鏈不依賴以太坊達成共識，並且可以選擇適合其需求的替代共識協定。側鏈上使用的共識演算法範例包括：

- [權威證明](/developers/docs/consensus-mechanisms/poa/)
- [委託權益證明](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [拜占庭容錯](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained)。

就像以太坊一樣，側鏈擁有驗證節點，負責驗證和處理交易、產生區塊並儲存區塊鏈狀態。驗證者也負責維持整個網路的共識，並保護其免受惡意攻擊。

#### 區塊參數 {#block-parameters}

以太坊對[區塊時間](/developers/docs/blocks/#block-time)（即產生新區塊所需的時間）和[區塊大小](/developers/docs/blocks/#block-size)（即每個區塊包含的資料量，以燃料計價）設有上限。相反地，側鏈通常採用不同的參數，例如更快的區塊時間和更高的燃料上限，以實現高吞吐量、快速交易和低廉費用。

雖然這有一些好處，但它對網路去中心化和安全性有著關鍵的影響。區塊參數（如快速的區塊時間和較大的區塊大小）增加了運行全節點的難度——使得少數「超級節點」負責保護該鏈。在這種情況下，驗證者共謀或惡意接管該鏈的可能性就會增加。

為了讓區塊鏈在不損害去中心化的情況下進行擴容，運行節點必須對所有人開放——而不僅限於擁有專門硬體的各方。這就是為什麼目前正在努力確保每個人都能在以太坊網路上[運行全節點](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node)。

### EVM 相容性 {#evm-compatibility}

某些側鏈與 EVM 相容，並且能夠執行為[以太坊虛擬機 (EVM)](/developers/docs/evm/) 開發的合約。與 EVM 相容的側鏈支援[以 Solidity 撰寫](/developers/docs/smart-contracts/languages/)的智能合約，以及其他 EVM 智能合約語言，這意味著為以太坊主網撰寫的智能合約也能在與 EVM 相容的側鏈上運作。

這意味著如果您想在側鏈上使用您的[去中心化應用程式 (dapp)](/developers/docs/dapps/)，只需將您的[智能合約](/developers/docs/smart-contracts/)部署到該側鏈即可。它的外觀、感覺和行為就像主網一樣——您用 Solidity 撰寫合約，並透過側鏈的 RPC 與該鏈互動。

因為側鏈與 EVM 相容，它們被認為是以太坊原生 dapp 有用的[擴容解決方案](/developers/docs/scaling/)。將您的 dapp 部署在側鏈上，使用者可以享受較低的燃料費用和更快的交易速度，尤其是在主網壅塞時。

然而，如前所述，使用側鏈涉及重大的權衡。每條側鏈都對其自身的安全性負責，並且不繼承以太坊的安全屬性。這增加了惡意行為的可能性，可能會影響您的使用者或使其資金面臨風險。

### 資產移動 {#asset-movement}

為了讓一條獨立的區塊鏈成為以太坊主網的側鏈，它需要具備促進資產在以太坊主網之間轉帳的能力。這種與以太坊的互操作性是透過區塊鏈跨鏈橋實現的。[跨鏈橋](/bridges/)使用部署在以太坊主網和側鏈上的智能合約來控制兩者之間的資金橋接。

雖然跨鏈橋幫助使用者在以太坊和側鏈之間移動資金，但資產並未在兩條鏈之間進行實體移動。相反地，通常涉及鑄造和銷毀的機制被用來在鏈之間轉移價值。了解更多關於[跨鏈橋如何運作](/developers/docs/bridges/#how-do-bridges-work)的資訊。

## 側鏈的優缺點 {#pros-and-cons-of-sidechains}

| 優點                                                                                                                        | 缺點                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 支撐側鏈的技術已經相當成熟，並受益於廣泛的研究和設計改進。 | 側鏈為了擴容性而犧牲了某種程度的去中心化和無須信任性。                          |
| 側鏈支援通用運算並提供 EVM 相容性（它們可以運行以太坊原生的 dapp）。                    | 側鏈使用獨立的共識機制，無法受益於以太坊的安全保證。         |
| 側鏈使用不同的共識模型來高效處理交易並降低使用者的交易費用。         | 側鏈需要更高的信任假設（例如，達到法定人數的惡意側鏈驗證者可能會進行詐欺）。 |
| 與 EVM 相容的側鏈允許 dapp 擴展其生態系統。                                                            |                                                                                                                  |

### 使用側鏈 {#use-sidechains}

多個專案提供了側鏈的實作，您可以將其整合到您的 dapp 中：

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain（前身為 xDai）](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## 延伸閱讀 {#further-reading}

- [透過側鏈擴容以太坊 dapp](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _2018 年 2 月 8 日 - Georgios Konstantopoulos_

_知道有什麼社群資源對您有幫助嗎？編輯此頁面並加入它！_