---
title: "Hegotá"
metaTitle: "Heze-Bogotá (Hegotá)"
description: "了解 Hegotá 協定升級"
lang: zh-tw
template: upgrade
---

Hegotá 是預計在 [格蘭斯特丹](/roadmap/glamsterdam/) 之後進行的 [以太坊](/) 網路升級。它的命名結合了「Bogotá」（執行層升級，以先前的 Devcon 舉辦地命名）和「Heze」（共識層升級，以一顆恆星命名）。

Hegotá 目前處於早期規劃階段。其主打項目已經選定，隨後也排定了第二項變更，但其餘範圍仍在決定中，且尚未設定任何日期。

## 主打項目：FOCIL {#focil}

<EipTag upgrade="hegota" id={7805} />

分叉選擇強制包含清單 (Fork-choice enforced inclusion lists，簡稱 FOCIL，或 EIP-7805) 關乎 [抗審查性](/roadmap/security/#censorship-resistance)：確保有效的交易能夠進入區塊，即使構建區塊的人寧願將其排除在外。

如今，每個區塊由單一 [驗證者](/glossary/#validator) 構建，並決定其中包含哪些交易。因此，任何能夠影響足夠多區塊建構者的人都可以延遲交易，而使用者除了等待和祈禱之外，沒有其他方法可以強制解決這個問題。

FOCIL 將該決定權分散給許多驗證者。一個委員會中的每位成員都會提出一份應包含的交易清單，而協定的規則會強制區塊建構者遵守這些清單。審查交易不再是單一方可以獨自完成的事情。

## 框架交易 {#frame-transactions}

<EipTag upgrade="hegota" id={8141} />

框架交易 (EIP-8141) 讓 [帳戶](/glossary/#account) 自行決定什麼才算是有效的交易，而不是由協定堅持使用一種固定的簽章方案。

如今，每筆交易的授權方式都相同：來自一把金鑰的一個簽章。[智能合約帳戶](/roadmap/account-abstraction/) 透過將交易路由至額外的基礎設施來解決這個問題，但這會消耗燃料並增加可能發生故障的活動組件。

框架交易將檢查工作移至帳戶本身。帳戶執行自己的驗證邏輯，因此目前需要額外基礎設施才能實現的功能（社交恢復、支出限制、需要多次批准、讓其他人支付燃料費用）將成為協定直接支援的功能。

由於帳戶可以選擇自己的規則，它也可以選擇量子電腦無法破解的簽章方案。這使其成為邁向 [抗量子性](/roadmap/security/#quantum-resistance) 以及打造更好錢包的一步。

## Hegotá 還有什麼內容 {#scope}

尚未決定。FOCIL 和框架交易是目前已排定的兩項變更；還有數十項提案被提出，但都尚未定案。在範圍確定之前，本頁面將保持簡短——有關目前的討論狀態，請參閱下方資源。

## 進一步閱讀 {#further-reading}

- [Forkcast：Hegotá](https://forkcast.org/upgrade/hegota) — 每項提案的即時狀態
- [Hegotá Meta EIP (EIP-8081)](https://eips.ethereum.org/EIPS/eip-8081)
- [EIP-7805 技術規範](https://eips.ethereum.org/EIPS/eip-7805)
- [EIP-8141 技術規範](https://eips.ethereum.org/EIPS/eip-8141)
- [以太坊路線圖](/roadmap/)
