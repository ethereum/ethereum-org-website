---
title: 權威證明 (PoA)
description: 解釋權威證明共識協定及其在區塊鏈生態系統中的作用。
lang: zh-tw
---

**權威證明 (PoA)** 是一種基於聲譽的共識演算法，是[權益證明](/developers/docs/consensus-mechanisms/pos/)的修改版本。 它主要由私人鏈、測試網和本地開發網路使用。 權威證明是一種基於聲譽的共識演算法，需要信任一組授權簽署者來產生區塊，而不是權益證明中基於權益的機制。

## 先決條件 {#prerequisites}

為了更好地理解本頁內容，我們建議你先熟悉 [交易](/developers/docs/transactions/)、[區塊](/developers/docs/blocks/) 和 [共識機制](/developers/docs/consensus-mechanisms/) 等概念。

## 什麼是權威證明 (PoA)？ {#what-is-poa}

權威證明是 **[權益證明](/developers/docs/consensus-mechanisms/pos/) (PoS)** 的修改版本，它是一種基於聲譽的共識演算法，而不是權益證明中基於權益的機制。 這個術語由 Gavin Wood 於 2017 年首次提出，這種共識演算法主要被私人鏈、測試網和本地開發網路使用，因為它透過讓一小部分節點儲存區塊鏈並產生區塊，克服了工作量證明對高品質資源的需求，以及權益證明存在的可擴展性問題。

權威證明需要信任 [創世區塊](/glossary/#genesis-block) 中設定的一組授權簽署者。 在目前的大多數實作中，所有授權簽署者在確定鏈的共識時都保留平等的權力和特權。 聲譽抵押背後的想法是，透過諸如認識你的客戶 (KYC) 之類的方式，或者透過讓知名組織成為唯一的驗證者，使每個授權驗證者為每個人所熟知 - 這樣，如果驗證者做錯任何事情，他們的身分就會被識別。

權威證明有多種實作，但標準的以太坊實作是實作了 [EIP-225](https://eips.ethereum.org/EIPS/eip-225) 的 **Clique**。 Clique 是開發者友好且易於實作的標準，支援所有用戶端同步類型。 其他實作包括 [IBFT 2.0](https://besu.hyperledger.org/stable/private-networks/concepts/poa) 和 [Aura](https://openethereum.github.io/Chain-specification)。

## 運作原理 {#how-it-works}

在權威證明中，選擇一組授權簽署者來建立新區塊。 簽署者是根據他們的聲譽來選擇的，並且是唯一被允許建立新區塊的人。 簽署者以輪轉方式選擇，每個簽署者被允許在特定的時間範圍內建立一個區塊。 區塊建立時間是固定的，簽署者需要在該時間範圍內建立區塊。

在這種情況下，聲譽不是一個量化的東西，而是微軟和谷歌等知名公司的聲譽，因此選擇受信任簽署者的方式不是演算法，而是信任實體的正常人類行為。例如，微軟在成百上千家初創公司之間建立了一個權威證明專用網路，以自己作為唯一受信任的簽署者，並且將來有可能添加其他知名簽署者（如谷歌），那麼初創公司毫無疑問會信任微軟始終以誠實的方式行事並使用網路。 這解決了在不同的小型/私有網路中進行質押的需求，這些用途各異的網路為了保持去中心化和運行而建立，並且還消除了對消耗大量能源和資源之礦工的需求。 一些專用網路使用權威證明標準（例如 VeChain），還有一些對其進行了修改，例如採用 [PoSA](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa) 標準的幣安。PoSA 是權威證明和權益證明的自訂修改版本。

投票過程由簽署者自行完成。 每個簽署者在建立新區塊時都會投票決定在其區塊中新增或刪除簽署者。 投票由節點進行統計，並根據達到特定閾值「SIGNER_LIMIT」的投票結果來新增或刪除簽署者。

可能會出現小分叉的情況，一個區塊的難度取決於該區塊是「依序」簽署還是「不依序」簽署。 「依序」區塊的難度為 2，「不依序」區塊的難度為 1。 在小分叉的情況下，大多數簽署者「依序」密封區塊的鏈將累積最大難度並獲勝。

## 攻擊媒介 {#attack-vectors}

### 惡意簽署者 {#malicious-signers}

惡意使用者可能會被新增至簽署者清單中，或者簽署金鑰/機器可能遭到洩漏/攻擊。 在這種情況下，協定需要能夠防禦重組和垃圾郵件攻擊。 建議的解決方案是，給定 N 個授權簽署者的清單，任何簽署者只能從每 K 個區塊鑄造 1 個區塊。這將確保損失有限，並且剩餘驗證者可以投票逐出惡意使用者。

### 審查制度 {#censorship-attack}

另一個有趣的攻擊媒介是，一個簽署者（或一組簽署者）試圖對投票決定將其從授權清單中刪除的區塊進行審查。 為了解決這個問題，簽署者允許的鑄造頻率被限制為每 N/2 個 1 次。 這確保惡意簽署者需要控制至少 51% 的簽署帳戶，才能真正成為鏈上新的真實性來源。

### 垃圾郵件 {#spam-attack}

另一個小型攻擊媒介是，惡意簽署者在其鑄造的每個區塊中註入新的投票提案。 由於節點需要統計所有投票以建立授權簽署者的實際清單，因此它們必須記錄一段時間內的所有投票。 如果不限制投票窗口，投票窗口可能會緩慢但無限制地增長。 解決方案是設置一個 W 個區塊的移動窗口，在此之後的投票將被視為過時。 合理的窗口可能是 1-2 個時期。

### 並發區塊 {#concurrent-blocks}

在權威證明網路中，當有 N 個授權簽署者時，每個簽署者都可以從 K 個區塊鑄造 1 個區塊，這意味著允許 N-K+1 個驗證者在任意給定時間點鑄造區塊。 為了防止這些驗證者爭奪區塊，每個簽署者應該在發布新區塊的時間上增加一個小的隨機「偏移量」。 儘管這個過程確保小分叉很少見，但偶爾的分叉仍可能發生，就像主網一樣。 如果發現某個簽署者濫用權力並造成混亂，其他簽署者可以投票將其逐出。

例如，如果有 10 個授權簽署者，並且每個簽署者可以從 20 個區塊建立 1 個區塊，那麼在任意給定時間，有 11 個驗證者可以建立區塊。 為了防止他們競相建立區塊，每個簽署者都會在發布新區塊的時間上增加一個小的隨機「偏移量」。 這就減少了小分叉的發生，但仍然允許偶爾分叉，如以太坊主網上所見。 如果簽署者濫用權力並造成破壞，他們可能會被投票逐出網路。

## 優點和缺點 {#pros-and-cons}

| 優勢                                          | 劣勢                                              |
| ------------------------------------------- | ----------------------------------------------- |
| 比權益證明和工作量證明等其他流行機制更具可擴展性，因為它以有限數量的區塊簽署者為基礎。 | 權威證明網路通常具有相對較少數量的驗證節點， 這使得權威證明網路更加中心化。          |
| 權威證明區塊鏈的運作和維護成本極為低廉。                        | 成為授權簽署者對於普通人來說通常遙不可及，因為區塊鏈需要具有既定聲譽的實體。          |
| 交易確認速度非常快，可以達到不到 1 秒，因為驗證新區塊只需要有限數量的簽署者     | 惡意簽署者可能進行重組攻擊、雙重消費、審查網路中的交易，這些攻擊雖已得到緩解，但仍然有可能發生 |

## 延伸閱讀 {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _Clique 標準_
- [權威證明研究](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md)_密碼經濟學_
- [什麼是權威證明](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [權威證明解釋](https://academy.binance.com/en/articles/proof-of-authority-explained)_幣安_
- [區塊鏈中的權威證明](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Clique 解釋](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [已棄用的權威證明，Aura 規範](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0，另一個權威證明實作](https://besu.hyperledger.org/stable/private-networks/concepts/poa)

### 想透過視覺方式學習？ {#visual-learner}

觀看權威證明的直觀解釋：

<YouTube id="Mj10HSEM5_8" />

## 相關主題 {#related-topics}

- [工作量證明](/developers/docs/consensus-mechanisms/pow/)
- [權益證明](/developers/docs/consensus-mechanisms/pos/)
