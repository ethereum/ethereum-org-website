---
title: "更安全的以太坊"
description: "以太坊的路線圖在今日強化了區塊生產與抗審查性，同時為量子時代及未來數十年的可靠運作做好協定準備。"
lang: zh-tw
image: /images/roadmap/roadmap-security.png
alt: "以太坊路線圖"
template: roadmap
summaryPoints:
  - 諸如協議內建提案者與建構者分離及包含清單等近期強化升級正在積極開發中
  - 後量子準備工作正在任何可信的量子威脅出現前數年進行中
  - 協定簡化消除了複雜性並縮小了以太坊的攻擊面
---

以太坊已經是一個非常安全、去中心化的[智能合約](/glossary/#smart-contract)平台。路線圖旨在透過**在今日強化網路，同時為可能在數年後才會出現的威脅做好準備**，使其在未來數十年保持這種狀態。近期升級可在 [forkcast.org](https://forkcast.org) 追蹤，而較長期的路線圖草案則發布於 [strawmap.org](https://strawmap.org)。

<ExpandableCard title="以太坊今天安全嗎？" eventCategory="/roadmap/security" eventName="clicked is ethereum secure today?">

是的。以太坊自 2015 年以來持續運作，從未停機。本頁面上的改進使一個已經很安全的網路更難以被攻擊、審查或破壞。

</ExpandableCard>

## 無須信任的區塊建構 {#trustless-block-building}

現今大多數的以太坊區塊是透過分工來組裝的：專業的建構者盡可能建構出最有價值的區塊，而輪到提議的[驗證者](/glossary/#validator)則提出最佳報價。這防止了專業的區塊建構將[質押](/glossary/#staking)集中在最大的營運商手中，但自 2022 年以來，它一直依賴網路無法驗證的協定外軟體。

**協議內建提案者與建構者分離 (ePBS，或 EIP-7732)** 將這種分工移入協定中，消除了對中繼器（目前在建構者和驗證者之間傳遞區塊的第三方中間人）的信任需求。ePBS 是即將到來的 [格蘭斯特丹](/roadmap/glamsterdam/) 升級的重頭戲，目標定於 2026 年。目前尚未設定主網 (Mainnet) 日期；客戶端團隊正在開發網（臨時測試網路）上對其進行測試。

<ButtonLink variant="outline" href="/roadmap/pbs/">更多關於提案者與建構者分離的資訊</ButtonLink>

## 抗審查性 {#censorship-resistance}

具備抗審查性的網路意味著沒有人可以阻止有效的交易上鏈。**分叉選擇強制包含清單 (FOCIL，或 EIP-7805)** 讓許多驗證者對區塊必須包含的內容有發言權：他們發布待處理交易的清單，並要求區塊構建者必須包含這些交易。沒有任何單一參與者可以悄悄地將你的交易排除在外。

FOCIL 是 Hegotá 升級在共識層的重頭戲，該升級接在格蘭斯特丹之後，目標定於 2027 年。它被刻意安排在格蘭斯特丹之後，以便 ePBS 和 FOCIL 永遠不會作為一個未經測試的組合一起發布。對加密記憶體池 (mempool) 的研究仍在繼續，這將隱藏等待中交易的內容，直到它們安全地包含在區塊中。

## 更快的最終性 {#faster-finality}

對使用者而言，[最終性](/glossary/#finality)是交易成為永久性記錄的時刻，此時若要撤銷該交易，攻擊者將損失巨額的質押 ETH。現今最終性大約需要 15 分鐘，而**研究人員希望大幅縮短這個時間**。這項工作始於單時槽最終性，演變為三時槽最終性，現在則作為 Minimmit 繼續進行，這是 2025 年 7 月引入的精簡以太坊 (Lean Ethereum) 計畫中的單輪共識協定。幾秒鐘內的最終性是路線圖草案上的一個長期北極星目標，預計大約在 2029 年實現。這仍然是活躍的研究領域，目前尚未有最終性升級被分配到任何分叉中。

<ButtonLink variant="outline" href="/roadmap/single-slot-finality/">更多關於更快最終性研究的資訊</ButtonLink>

## 具備韌性的驗證者 {#resilient-validators}

驗證者通常是一台持有一把簽署金鑰的機器。**分散式驗證者技術 (DVT)** 將該單一機器替換為一個共享金鑰並共同簽署的機器委員會，因此一台電腦故障或一把金鑰被盜不會導致驗證者停擺。DVT 已在生產環境中上線，並被質押營運商大規模使用。2026 年 1 月，維塔利克·布特林提出了一個名為 DVT-lite 的簡化協定層級變體；這是一項早期提案，尚未排定分叉。

網路也透過[客戶端多樣性](/developers/docs/nodes-and-clients/client-diversity/)來保護自己：以太坊運行在幾個獨立建構的軟體實作上，因此一個客戶端中的錯誤不會影響網路其餘部分的運作。

兩個早期的研究想法：視圖合併 (view-merge) 和秘密領袖選舉，已不再是活躍的路線圖項目。

<ButtonLink variant="outline" href="/staking/dvt/">更多關於分散式驗證者技術的資訊</ButtonLink>

## 抗量子性 {#quantum-resistance}

以太坊使用[密碼學](/glossary/#cryptography)來保持網路安全並保護使用者資金。最終，其中一些密碼學方法將**容易受到量子電腦的攻擊**，量子電腦解決特定數學問題的速度比傳統機器快上指數倍。

<strong>現今沒有任何量子電腦可以破解以太坊的密碼學。</strong>所需的硬體尚未大規模存在。但最近的研究表明，這個差距縮小的速度比先前預期的要快。2026 年 3 月，Google Quantum AI 發表了一篇論文，估計破解 256 位元橢圓曲線密碼學（以太坊用於帳戶簽章的類型）大約需要 1,200 個邏輯量子位元，比早期的估計少了約 20 倍。

密碼學轉換需要數年的時間來安全地規劃和執行，因此準備工作現在就已經開始，遠在硬體出現之前。已確定有四個領域需要後量子升級：驗證者共識簽章 (BLS)、用於資料可用性的承諾方案 (KZG)、帳戶簽章 (ECDSA)，以及[匯總](/glossary/#rollups)所使用的零知識證明 (ZK-proof) 系統。

以太坊基金會於 2026 年 1 月成立了專門的**後量子安全團隊**，其工作在 [pq.ethereum.org](https://pq.ethereum.org) 上公開追蹤。活躍的工作包括基於雜湊的驗證者簽章 (leanXMSS) 搭配一個最小化的 zkVM (leanVM)，以有效地聚合較大的量子安全簽章，以及每週與超過 10 個客戶端團隊進行的互通性開發網測試。

轉換策略的一個關鍵部分是 **EIP-8141**，它引入了原生的[帳戶抽象化](/roadmap/account-abstraction/)。這允許個別帳戶選擇自己的簽章驗證，這意味著使用者可以切換到量子安全簽章，而無需等待單一的、全協定範圍的遷移。EIP-8141 正在考慮納入 Hegotá 升級。核心後量子基礎設施里程碑的目標是大約在 2029 年完成。這些是規劃目標，可能會有所變動。

<ExpandableCard title="量子電腦今天能竊取我的 ETH 嗎？" eventCategory="/roadmap/security" eventName="clicked can quantum computers steal my ETH today?">

不。現今沒有任何量子電腦可以破解以太坊的密碼學。本頁面描述的工作是為幾年後才會出現的威脅所做的早期準備。當後量子錢包可用時，錢包軟體將引導您完成遷移。目前，您不需要做任何事情。

</ExpandableCard>

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">更多關於抗量子性的資訊</ButtonLink>

## 更簡單且更有效率的協定 {#simpler-and-more-efficient-protocol}

複雜性會為錯誤和漏洞創造機會。路線圖的一部分著重於**簡化以太坊並消除技術債**，使協定更容易維護、稽核和推論。更簡單的協定也讓攻擊者有較少的攻擊面可以探測。

迄今已交付：

- **[佩克特拉 (2025 年 5 月)](/roadmap/pectra/)**：引入了 EIP-7702，讓外部擁有帳戶可以暫時委託給智能合約程式碼，這是邁向完全帳戶抽象化的墊腳石。
- **[富薩卡 (2025 年 12 月)](/roadmap/fusaka/)**：部署了 PeerDAS (EIP-7594)，將資料可用性工作負載分散到整個網路。同時增加了資料塊參數，擴大了匯總的資料吞吐量。
- **[Dencun (2024 年 3 月)](/roadmap/dencun/)**：引入了資料塊交易 (EIP-4844) 以提供更便宜的匯總資料，並限制了 `SELFDESTRUCT` (EIP-6780) 以消除長期存在的複雜性來源。
- **[沙佩拉 (2023 年 4 月)](/staking/withdrawals/)**：允許驗證者提取質押的 ETH (EIP-4895)，消除了[權益證明 (PoS)](/glossary/#pos) 質押的早期限制。
- **倫敦 (2021 年 8 月)**：透過 EIP-1559 徹底改革了燃料定價，引入了基礎費用和銷毀機制，以提供更可預測的交易成本。

進行中：

- **格蘭斯特丹 (目標為 2026 年)**：重頭戲是 ePBS (EIP-7732) 和區塊層級存取清單 (EIP-7928)，同時也在考慮燃料重新定價。
- **Hegotá (目標為 2027 年)**：FOCIL (EIP-7805) 是共識層的重頭戲。正在考慮納入：EIP-8141（原生帳戶抽象化）。
- **持續進行中**：簡化 [EVM](/developers/docs/evm/)、協調客戶端實作以及逐步淘汰已棄用功能的努力在各個客戶端團隊中持續進行。關於無狀態性（讓參與者無需儲存所有資料即可驗證鏈）的工作正在圍繞量子安全的二元雜湊樹進行重新設計，最終方法尚未確認。

## 目前進度 {#current-progress}

截至 2026 年中：

- **區塊建構與抗審查性**：ePBS 和區塊層級存取清單正在格蘭斯特丹開發網上運行。FOCIL 計畫用於 Hegotá，目標定於 2027 年。
- **最終性**：Minimmit 和更廣泛的精簡以太坊共識工作仍在積極研究中，尚未分配分叉。
- **抗量子性**：每週的後量子互通性開發網正在運行，核心基礎設施里程碑的目標大約在 2029 年。
- **簡化**：佩克特拉和富薩卡已發布；格蘭斯特丹和 Hegotá 將進行下一輪的清理工作。

這項工作的任何部分都尚未完成，所有時間表都是估計值，可能會有所變動。

## 延伸閱讀 {#further-reading}

- [Forkcast：以太坊網路升級追蹤器](https://forkcast.org)
- [Strawmap：以太坊第一層 (L1) 路線圖草案](https://strawmap.org) - _以太坊基金會架構團隊 (EF Architecture)_
- [後量子以太坊](https://pq.ethereum.org) - _以太坊基金會_
- [精簡以太坊路線圖追蹤器](https://leanroadmap.org) - _ReamLabs_
- [權益證明 (PoS) 與最終性](/developers/docs/consensus-mechanisms/pos/#finality)
- [EVM](/developers/docs/evm/)