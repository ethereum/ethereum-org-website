---
title: "以太坊改進提案 (EIP)"
description: "你需要知道的以太坊改進提案基本知識"
lang: zh-tw
---

# Ethereum 改進提案 (EIP) 介紹 {#introduction-to-ethereum-improvement-proposals}

## 什麼是以太坊改進提案？ {#what-are-eips}

[Ethereum 改進提案 (EIP)](https://eips.ethereum.org/) 是一種標準，用於明定以太坊的潛在新功能或流程。 以太坊改進提案中包含擬定變更的技術規範，相當於以太坊社群的「事實來源」。 以太坊的網路升級和應用程式標準乃透過以太坊改進提案流程商討和制定。

以太坊社群的任何人皆可建立以太坊改進提案。 撰寫 EIP 的指南包含在 [EIP-1](https://eips.ethereum.org/EIPS/eip-1) 中。 以太坊改進提案主要應簡明介紹技術規範並概述變更誘因。 以太坊改進提案作者負責在社群內尋求共識並記錄不同意見。 由於提出優秀以太坊改進提案的技術門檻很高，根據過往經驗，通常大部分以太坊改進提案的作者都是應用程式或者協定開發者。

## 以太坊改進提案為什麼很重要？ {#why-do-eips-matter}

以太坊改進提案對於確定如何實作變更以及確保將變更記錄在以太坊上至關重要。 人們依之擬定變更、針對變更展開辯論並採納變更。 EIP 有[不同類型](https://eips.ethereum.org/EIPS/eip-1#eip-types)，包括影響共識且需要網路升級 (例如 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)) 的低階協定變更的核心 EIP，以及用於應用程式標準 (例如 [EIP-20](https://eips.ethereum.org/EIPS/eip-20) 和 [EIP-721](https://eips.ethereum.org/EIPS/eip-721)) 的 ERC。

每次網路升級包含一組 EIP，網路上每個 [以太坊用戶端](/learn/#clients-and-nodes) 都必須實作。 也就是說，為了與以太坊主網上的其他用戶端保持共識，用戶端開發者需要確保他們皆已實作所需的以太坊改進提案。

以太坊改進提案提供變更的技術規範，不僅如此，以太坊還以其為單位推行治理舉措：任何人皆可擬定以太坊改進提案，然後社群中的各個利害關係人將對其展開辯論，以確定是否應將其作為標准採納或包含在網路升級中。 由於非核心以太坊改進提案不一定被所有應用程式採納（例如，可以建立不實作 EIP-20 的同質化代幣），而核心以太坊改進提案必須被廣泛採納（因全數節點必須升級才能成為同一網路的一部分），與非核心以太坊改進提案相比，核心以太坊改進提案需要社群內達成更廣泛的共識。

## EIP 的歷史 {#history-of-eips}

[Ethereum 改進提案 (EIP) GitHub 存放庫](https://github.com/ethereum/EIPs) 於 2015 年 10 月建立。 EIP 流程基於 [比特幣改進提案 (BIP)](https://github.com/bitcoin/bips) 流程，而後者又是基於 [Python 增強提案 (PEP)](https://www.python.org/dev/peps/) 流程。

以太坊改進提案編輯負責審查以太坊改進提案的技術健全性、格式問題，以及修正拼音、文法及程式碼樣式方面的錯誤。 2015 至 2016 年底，Martin Becze、Vitalik Buterin、Gavin Wood 等人擔綱初代的以太坊改進提案編輯。

以太坊改進提案現任編輯：

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

以太坊改進提案榮譽編輯：

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

如果您想成為 EIP 編輯，請查看 [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069)。

以太坊改進提案編輯決定提案何時可成為以太坊改進提案，並且會幫助以太坊改進提案作者推進提案。 [Ethereum Cat Herders](https://www.ethereumcatherders.com/) 協助組織 EIP 編輯和社群之間的會議 (參見 [EIPIP](https://github.com/ethereum-cat-herders/EIPIP))。

完整的標準化流程和圖表在 [EIP-1](https://eips.ethereum.org/EIPS/eip-1) 中有所說明。

## 了解更多 {#learn-more}

如果您有興趣深入閱讀有關 EIP 的資訊，請查看 [EIP 網站](https://eips.ethereum.org/) 和 [EIP-1](https://eips.ethereum.org/EIPS/eip-1)。 以下為一些實用連結：

- [所有 Ethereum 改進提案的清單](https://eips.ethereum.org/all)
- [所有 EIP 類型的說明](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [所有 EIP 狀態的說明](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### 社群教育專案 {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — _PEEPanEIP 是一個教育影片系列，討論 Ethereum 改進提案 (EIP) 以及即將到來的升級之主要功能。_
- [EIPs.wtf](https://www.eips.wtf/) — _EIPs.wtf 提供 Ethereum 改進提案 (EIP) 的額外資訊，包括其狀態、實作細節、相關的拉取請求和社群意見回饋。_
- [EIP.Fun](https://eipfun.substack.com/) — _EIP.Fun 提供關於 Ethereum 改進提案 (EIP) 的最新消息、EIP 會議的更新內容等等。_
- [EIPs Insight](https://eipsinsight.com/) — _EIPs Insight 根據從不同資源收集的資訊，展示 Ethereum 改進提案 (EIP) 流程的狀態和統計資料。_

## 參與 {#participate}

所有人皆可建立以太坊改進提案。 提交提案前必須閱讀 [EIP-1](https://eips.ethereum.org/EIPS/eip-1)，其中概述了 EIP 流程以及撰寫 EIP 的方法；並至 [Ethereum Magicians](https://ethereum-magicians.org/) 徵求意見回饋，提交草案之前應先在這裡與社群討論提案。

## 參考資料 {#references}

<cite class="citation">

頁面內容部分來自 Hudson Jameson 的 [以太坊協定開發治理和網路升級協調](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/)

</cite>
