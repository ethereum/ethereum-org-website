---
title: "權威證明 (PoA)"
description: "權威證明共識協定及其在區塊鏈生態系中角色的解釋。"
lang: zh-tw
---

**權威證明 (PoA)** 是一種基於聲譽的共識演算法，它是[權益證明 (PoS)](/developers/docs/consensus-mechanisms/pos/) 的修改版本。它主要用於私有鏈、測試網和本地開發網路。PoA 是一種基於聲譽的共識演算法，需要信任一組授權的簽署者來產生區塊，而不是 PoS 中基於質押的機制。

## 先決條件 {#prerequisites}

為了更佳理解本頁面，我們建議您先閱讀[交易](/developers/docs/transactions/)、[區塊](/developers/docs/blocks/)和[共識機制](/developers/docs/consensus-mechanisms/)。

## 什麼是權威證明 (PoA)？ {#what-is-poa}

權威證明是**[權益證明 (PoS)](/developers/docs/consensus-mechanisms/pos/)**的修改版本，它是一種基於聲譽的共識演算法，而不是 PoS 中基於質押的機制。該術語由加文·伍德 (Gavin Wood) 於 2017 年首次提出，這種共識演算法主要用於私有鏈、測試網和本地開發網路，因為它克服了工作量證明 (PoW) 對高品質資源的需求，並透過讓一小部分節點儲存區塊鏈和產生區塊，克服了 PoS 的可擴展性問題。

權威證明需要信任一組在[創世區塊](/glossary/#genesis-block)中設定的授權簽署者。在目前大多數的實作中，所有授權簽署者在決定鏈的共識時，都保留平等的權力和特權。聲譽質押背後的理念是，每個授權的驗證者都透過 KYC 等方式為大家所熟知，或者由一個知名組織作為唯一的驗證者——這樣一來，如果驗證者做錯了任何事，他們的身份是已知的。

PoA 有多種實作方式，但標準的以太坊實作是 **clique**，它實作了 [EIP-225](https://eips.ethereum.org/EIPS/eip-225)。Clique 對開發者友善且是一個易於實作的標準，支援所有用戶端同步類型。其他實作包括 [IBFT 2.0](https://besu.hyperledger.org/private-networks/concepts/poa) 和 [Aura](https://openethereum.github.io/Chain-specification)。

## 運作原理 {#how-it-works}

在 PoA 中，會選出一組授權的簽署者來建立新區塊。簽署者是根據他們的聲譽選出的，並且只有他們被允許建立新區塊。簽署者以輪詢 (round-robin) 方式選出，每個簽署者被允許在特定的時間範圍內建立一個區塊。區塊建立時間是固定的，簽署者必須在該時間範圍內建立區塊。

在此背景下的聲譽並非量化的事物，而是像微軟和 Google 等知名企業的聲譽，因此選擇受信任簽署者的方式不是演算法，而是人類正常的_信任_行為。舉例來說，一個實體（例如微軟）在成百上千家新創公司之間建立了一個 PoA 私有網路，並將自己作為唯一受信任的簽署者，未來可能會加入其他知名簽署者（如 Google），新創公司無疑會信任微軟始終以誠實的方式行事並使用該網路。這解決了在為不同目的而建立的各種小型/私有網路中進行質押以保持其去中心化和運作的需求，同時也解決了對礦工的需求，因為挖礦會消耗大量電力和資源。一些私有網路直接使用 PoA 標準（例如唯鏈 VeChain），而有些則對其進行修改（例如幣安使用 [PoSA](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa)，這是 PoA 和 PoS 的自訂修改版本）。

投票過程由簽署者自己完成。每個簽署者在建立新區塊時，會在他們的區塊中投票決定新增或移除某個簽署者。節點會統計投票結果，並根據投票是否達到特定門檻 `SIGNER_LIMIT` 來新增或移除簽署者。

可能會出現發生小型分叉的情況，區塊的難度取決於該區塊是按順序 (in turn) 還是不按順序 (out of turn) 簽署的。「按順序」區塊的難度為 2，而「不按順序」區塊的難度為 1。在發生小型分叉的情況下，擁有最多簽署者「按順序」封裝區塊的鏈將累積最大的難度並勝出。

## 攻擊向量 {#attack-vectors}

### 惡意簽署者 {#malicious-signers}

惡意使用者可能會被加入簽署者名單中，或者簽署金鑰/機器可能會遭到入侵。在這種情況下，協定需要能夠防禦區塊鏈重組和垃圾訊息攻擊。提出的解決方案是，在給定 N 個授權簽署者名單的情況下，任何簽署者在每 K 個區塊中只能鑄造 1 個區塊。這確保了損害受到限制，其餘的驗證者可以透過投票將惡意使用者踢出。

### 審查制度 {#censorship-attack}

另一個有趣的攻擊向量是，如果一個簽署者（或一組簽署者）試圖審查那些投票將他們從授權名單中移除的區塊。為了避開這個問題，簽署者允許的鑄造頻率被限制為 N/2 分之 1。這確保了惡意簽署者需要控制至少 51% 的簽署帳戶，在這種情況下，他們將實際上成為該鏈新的事實來源。

### 垃圾訊息 {#spam-attack}

另一個小型攻擊向量是惡意簽署者在他們鑄造的每個區塊中注入新的投票提案。由於節點需要統計所有投票以建立實際的授權簽署者名單，因此它們必須記錄隨時間推移的所有投票。如果不對投票視窗設定限制，這可能會緩慢增長，且沒有上限。解決方案是設定一個 W 個區塊的_移動_視窗，超過該視窗的投票將被視為過期。_一個合理的視窗可能是 1-2 個 epoch。_

### 併發區塊 {#concurrent-blocks}

在 PoA 網路中，當有 N 個授權簽署者時，每個簽署者被允許在 K 個區塊中鑄造 1 個區塊，這意味著在任何給定時間點，有 N-K+1 個驗證者被允許鑄造。為了防止這些驗證者爭搶區塊，每個簽署者應該在發布新區塊的時間上加上一個小的隨機「偏移量」。雖然這個過程確保了小型分叉很少見，但偶爾的分叉仍然可能發生，就像主網一樣。如果發現某個簽署者濫用權力並造成混亂，其他簽署者可以透過投票將其踢出。

舉例來說，如果有 10 個授權簽署者，且每個簽署者被允許在 6 個區塊中建立 1 個區塊，那麼在任何給定時間，有 5 個驗證者可以建立區塊。為了防止他們爭搶建立區塊，每個簽署者在發布新區塊的時間上加上一個小的隨機「偏移量」。這減少了小型分叉的發生，但仍然允許偶爾的分叉，正如在以太坊主網上所見。如果簽署者濫用其權威並造成破壞，他們可以被投票逐出網路。

## 優缺點 {#pros-and-cons}

| 優點                                                                                                                                                      | 缺點                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 比 PoS 和 PoW 等其他流行機制更具可擴展性，因為它基於數量有限的區塊簽署者                                          | PoA 網路通常具有相對較少數量的驗證節點。這使得 PoA 網路更加中心化。                                 |
| PoA 區塊鏈的運作和維護成本極低                                                                                                  | 成為授權簽署者通常是普通人遙不可及的，因為區塊鏈需要具有既定聲譽的實體。 |
| 交易確認非常快，可能不到 1 秒，因為只需要有限數量的簽署者來驗證新區塊 | 惡意簽署者可能會在網路中進行區塊鏈重組、雙重支付、審查交易，這些攻擊雖然得到緩解，但仍然可能發生                       |

## 延伸閱讀 {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _Clique 標準_
- [權威證明研究](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Cryptoeconomics_
- [什麼是權威證明](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [權威證明解釋](https://academy.binance.com/en/articles/proof-of-authority-explained) _幣安_
- [區塊鏈中的 PoA](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Clique 解釋](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [已棄用的 PoA，Aura 規範](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0，另一種 PoA 實作](https://besu.hyperledger.org/private-networks/concepts/poa)

### 比較喜歡視覺化學習？ {#visual-learner}

觀看權威證明的視覺化解釋：

<VideoWatch slug="proof-of-authority-explained" />

## 相關主題 {#related-topics}

- [工作量證明 (PoW)](/developers/docs/consensus-mechanisms/pow/)
- [權益證明 (PoS)](/developers/docs/consensus-mechanisms/pos/)